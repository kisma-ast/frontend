import React, { useCallback, useEffect, useState, useRef } from "react";

import axios from "axios";
import { Claims, Transactions, DataDeposits, Orders } from "../../types/types";
import AlertError from "../../components/Dialogs/support/AlertError";
import ConfirmDialog from "../../components/Dialogs/support/ConfirmDialog";
import Pagination from "../../components/support/props/Pagination";
import InputSearch from "../../components/support/props/InputSearch";

import { useTranslation } from "react-i18next";
import TablesClaims from "../../components/super_admin/props/claims/TablesClaims";
import DetailsClaims from "../../components/super_admin/props/claims/DetailsClaims";
import DetailsTransactions from "../../components/super_admin/props/claims/DetailsTransactions";
const ClaimAdmin: React.FC = () => {
  const backendUrlNet =
    process.env.REACT_APP_TEST === "1"
      ? process.env.REACT_APP_BACKEND_URL_NGROK
      : process.env.REACT_APP_BACKEND_URL_NET;

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [claims, setClaims] = useState<Claims[]>([]);
  const [filteredClaims, setFilteredClaims] = useState<Claims[]>([]);
  const [searchOrderCode, setSearchOrderCode] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [dataDeposits, setDataDeposit] = useState<DataDeposits | undefined>(
    undefined
  );
  const [transactions, setTransactions] = useState<Orders | null>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentClaims = filteredClaims.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const [dropdownStates, setDropdownStates] = useState<{
    [key: number]: boolean;
  }>({});
  const [showDetailsTransaction, setShowDetailsTransaction] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<Claims | null>(null);

  const [showDetailsClaim, setShowDetailsClaim] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showStatusFilterDropdown, setShowStatusFilterDropdown] =
    useState(false);
  const statusFilterRef = useRef<HTMLTableHeaderCellElement>(null);
  const statusOptions = ["new", "gerer", "close"];

  // Référence pour gérer le clic en dehors du dropdown
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const fetchClaims = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrlNet}/api/swaps/listClaim`);
      if (response.status === 200) {
        setClaims(response.data);
        setFilteredClaims(response.data);
      }
    } catch (error) {
      console.error("Error fetching claims:", error);
    }
  }, [backendUrlNet]);

  useEffect(() => {
    let filtered = claims;
    if (searchOrderCode) {
      filtered = filtered.filter((claim) =>
        claim.orderCode.toLowerCase().includes(searchOrderCode.toLowerCase())
      );
    }
    if (statusFilter) {
      filtered = filtered.filter((claim) => claim.status === statusFilter);
    }
    setFilteredClaims(filtered);
    setCurrentPage(1);
  }, [searchOrderCode, statusFilter, claims]);

  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

  const handleShowDetailsTransaction = async (orderCode: string) => {
    setShowDetailsTransaction(true);
    try {
      const response = await axios.get(
        `${backendUrlNet}/api/swaps/verifyClaim?orderCode=${orderCode}`
      );
      if (response.status === 200 && response.data?.dataOrders) {
        setTransactions(response.data.dataOrders);
        setMessage(response.data.verificationDepot);

        setDataDeposit(response.data.dataDeposit);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  const handleShowDetailsClaim = async (claimId: number) => {
    const claim = claims.find((claim) => claim.id === claimId);
    if (claim) {
      setSelectedClaim(claim);
      setShowDetailsClaim(true);
    }
  };

  const ResendDeposit = async (orderCode: string) => {
    setShowDetailsTransaction(false);
    try {
      const data = { dataDeposits, orderCode };
      const response = await axios.post(
        `${backendUrlNet}/api/swaps/internalCallbackCall`,
        data
      );

      if (response.status !== 200) {
        setShowErrorDialog(true);
        throw new Error(`Erreur lors du swap! status: ${response.status}`);
      } else {
        setShowDialog(true);
        fetchClaims();
      }
    } catch (error) {
      console.error("Erreur lors du swap:", error);
    }
  };
  const clore = async (orderCode: any) => {
    try {
      const response = await axios.post(
        `${backendUrlNet}/api/swaps/closeClaim?orderCode=${orderCode}`
      );

      if (response.status !== 200) {
        setShowErrorDialog(true);
        throw new Error(`Erreur lors du swap! status: ${response.status}`);
      } else {
        fetchClaims();
      }
    } catch (error) {
      console.error("Erreur lors du swap:", error);
    }
  };
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Gestionnaire de clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(dropdownStates).forEach(([claimId, isOpen]) => {
        if (
          isOpen &&
          dropdownRefs.current[Number(claimId)] &&
          !dropdownRefs.current[Number(claimId)]?.contains(event.target as Node)
        ) {
          setDropdownStates((prev) => ({
            ...prev,
            [claimId]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownStates]);

  // Fonction mise à jour pour le toggle du dropdown
  const toggleDropdown = (claimId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownStates((prev) => {
      // Ferme tous les autres dropdowns
      const newState = Object.keys(prev).reduce(
        (acc, key) => ({
          ...acc,
          [key]: false,
        }),
        {}
      );
      // Toggle l'état du dropdown actuel
      return {
        ...newState,
        [claimId]: !prev[claimId],
      };
    });
  };
  const { t } = useTranslation();
  // Function to toggle status filter dropdown
  const toggleStatusFilterDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowStatusFilterDropdown(!showStatusFilterDropdown);
  };

  // Function to select status filter
  const selectStatusFilter = (status: string) => {
    setStatusFilter(status);
    setShowStatusFilterDropdown(false);
  };

  return (
    <div className="bg-white/5 p-2 sm:p-4 rounded-lg shadow-md text-white">
      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
        Réclamations Récentes
      </h2>

      <InputSearch
        searchOrderCode={searchOrderCode}
        onSearchChange={setSearchOrderCode}
        placeholder="Entrer le nom du swap"
      />
      <div className=" mt-4">
        <TablesClaims
          setDropdownStates={setDropdownStates}
          toggleDropdown={toggleDropdown}
          dropdownStates={dropdownStates}
          toggleStatusFilterDropdown={toggleStatusFilterDropdown}
          statusOptions={statusOptions}
          statusFilterRef={statusFilterRef}
          showStatusFilterDropdown={showStatusFilterDropdown}
          selectStatusFilter={selectStatusFilter}
          setShowStatusFilterDropdown={setShowStatusFilterDropdown}
          setStatusFilter={setStatusFilter}
          currentClaims={currentClaims}
          ResendDeposit={ResendDeposit}
          clore={clore}
          handleShowDetailsClaim={handleShowDetailsClaim}
          handleShowDetailsTransaction={handleShowDetailsTransaction}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />

      {selectedClaim && showDetailsClaim && (
        <DetailsClaims
          setSelectedClaim={setSelectedClaim}
          selectedClaim={selectedClaim}
        />
      )}

      {showDetailsTransaction && (
        <DetailsTransactions
          showDetailsTransaction={showDetailsTransaction}
          setShowDetailsTransaction={setShowDetailsTransaction}
          message={message}
          transactions={transactions}
          ResendDeposit={ResendDeposit}
        />
      )}
      <AlertError
        showQRDialog={showErrorDialog}
        setShowErrorDialog={setShowErrorDialog}
      />
      <ConfirmDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        fromCurrency={"fromCurrency"}
      />
    </div>
  );
};

export default ClaimAdmin;
