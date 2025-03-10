import { Claims, Users } from '../../../../types/types';
import React, { useRef } from 'react'
import {
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisV,
  FaFilter,
} from "react-icons/fa";
const tableHeaders = [
  { id: "id", label: "ID", className: "" },
    { id: "client", label: "Client ID", className: "" },
    { id: "amount", label: "Montant", className: "hidden md:table-cell" },
    { id: "debit", label: "N° Dépôt", className: "hidden md:table-cell" },
    { id: "retrait", label: "N° Retrait", className: "hidden md:table-cell" },
    { id: "transaction", label: "ID Trans. ", className: "hidden md:table-cell" },
    { id: "description", label: "Desc.", className: "hidden md:table-cell" },
];
interface TablesClaimsProps{
  currentClaims:Claims[]
    setDropdownStates:any
    dropdownStates:any
    toggleDropdown: (value: number, e:React.MouseEvent) => void;
    toggleStatusFilterDropdown: (e:React.MouseEvent) => void;
    ResendDeposit: (value: string,) => void;
    clore: (value: string,) => void;
    handleShowDetailsClaim: (value: number,) => void;
    handleShowDetailsTransaction: (value: string,) => void;
    statusOptions:string[]
    statusFilterRef:any
    selectStatusFilter:any
    showStatusFilterDropdown:any
    setShowStatusFilterDropdown:any
    setStatusFilter:any
}
const TablesClaims : React.FC<TablesClaimsProps>=(
   {
    setDropdownStates,
    toggleDropdown,
    dropdownStates,
    toggleStatusFilterDropdown,
    statusOptions,
    statusFilterRef,
    showStatusFilterDropdown,
    selectStatusFilter,
    setShowStatusFilterDropdown,
    setStatusFilter,
    currentClaims,
    ResendDeposit,
    clore,
    handleShowDetailsClaim,
    handleShowDetailsTransaction,
   }
) =>{
    const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  return (
    <div> 
      <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-blue-800">
              {tableHeaders.map((header) => (
                <th
                  key={header.id}
                  className={`px-1 py-1 sm:px-2 md:px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap ${header.className}`}
                >
                  {header.label}
                </th>
              ))}
              <th
                onClick={toggleStatusFilterDropdown}
                ref={statusFilterRef}
                className={`px-1 py-1 sm:px-2 md:px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap relative`}
              >
                Status
                <FaFilter className="ml-1 cursor-pointer inline-block" />
                {showStatusFilterDropdown && (
                  <div className="absolute top-full right-0 mt-1 w-40 bg-blue-800 border border-blue-700 rounded-md shadow-lg z-50">
                    <div className="py-1 flex flex-col gap-1">
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          onClick={() => selectStatusFilter(status)}
                          className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                        >
                          {status}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          setStatusFilter("");
                          setShowStatusFilterDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                      >
                        tout
                      </button>
                    </div>
                  </div>
                )}
              </th>
              <th
                className={`px-1 py-1 sm:px-2 md:px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap `}
              >
                {" "}
                Action{" "}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-700">
            {currentClaims.map((claim) => (
              <tr
                key={claim.id}
                // className="hover:bg-white/10 transition-colors"
              >
                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100 ">
                  {claim.id}
                </td>
                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100">
                  <span className="block sm:hidden">
                    {claim.clients.telegramUserId}...
                  </span>

                  <span className="hidden sm:block">
                    {claim.clients.telegramUserId}
                  </span>
                </td>

                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100  hidden md:table-cell">
                  {claim.amount} Fcfa
                </td>
                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100  hidden md:table-cell">
                  {claim.numberDebit}
                </td>
                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100  hidden md:table-cell">
                  {claim.numberRetrait}
                </td>

                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100 hidden md:table-cell">
                  <span className="block sm:hidden">
                    {claim.orderCode.substring(0, 4)}...
                  </span>

                  <span className="hidden sm:block">{claim.orderCode}</span>
                </td>
                <td className="px-0 py-0 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100 hidden md:table-cell ">
                  <span className="block sm:hidden">
                    {claim.description.substring(0, 3)}...
                  </span>

                  <span className="hidden sm:block">{claim.description}</span>
                </td>
                <td className="px-1 py-1 sm:px-2 md:px-4 text-xs sm:text-sm text-gray-100  ">
                  <span
                    className={`px-1 py-1 sm:px-1 md:px-4  sm:text-sm rounded-lg text-xs ml-2 ${
                      claim.status === "new"
                        ? "bg-red-800 text-white"
                        : claim.status === "gerer"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {claim.status}
                  </span>
                </td>
                <td className="px-2 sm:px-4 md:px-6 py-2 text-sm text-gray-100 relative ">
                  <div
                    ref={(el) => (dropdownRefs.current[claim.id] = el)}
                    className="relative inline-block"
                  >
                    <button
                      className="p-1 sm:p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                      onClick={(e) => toggleDropdown(claim.id, e)}
                      aria-label="Menu options"
                    >
                      <FaEllipsisV className="w-4 h-4" />
                    </button>

                    {dropdownStates[claim.id] && (
                      <div className="absolute right-0  w-48 rounded-md shadow-lg bg-blue-800 ring-1 ring-black ring-opacity-5 z-50">
                        <div className=" flex flex-col gap-1">
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                            onClick={() => {
                              handleShowDetailsClaim(claim.id);
                              setDropdownStates((prev:any) => ({
                                ...prev,
                                [claim.id]: false,
                              }));
                            }}
                          >
                            Details reclamation
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                            onClick={() => {
                              handleShowDetailsTransaction(claim.orderCode);
                              setDropdownStates((prev:any) => ({
                                ...prev,
                                [claim.id]: false,
                              }));
                            }}
                          >
                            Voir la transaction
                          </button>
                          {claim.status === "gerer" ? (
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                              onClick={() => {
                                clore(claim.orderCode);
                                setDropdownStates((prev:any) => ({
                                  ...prev,
                                  [claim.id]: false,
                                }));
                              }}
                            >
                              Clore la réclamation
                            </button>
                          ) : (
                            ""
                          )}

                          {claim.orders?.transactions?.[0]?.status ===
                            "success" &&
                          claim.orders?.transactions?.[1]?.status ===
                            "failed" ? (
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                              onClick={() => {
                                ResendDeposit(claim.orderCode);
                                setDropdownStates((prev:any) => ({
                                  ...prev,
                                  [claim.id]: false,
                                }));
                              }}
                            >
                              Renvoyer le dépôt
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default TablesClaims