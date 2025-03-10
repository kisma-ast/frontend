import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../../common/ui/dialog";
import { Button } from "../../common/ui/button";
import { useTranslation } from "react-i18next";

interface TransactionSummaryDialogProps {
  showSummary: boolean;
  setShowSummary: (open: boolean) => void;
  fromCurrency: string;
  fromPhone: string;
  fromAmount: string;
  toCurrency: string;
  toPhone: string;
  toAmount: string;
  transactionFee: number;
  isOnRetrait: boolean;
  totalWithFees: number;
  handleConfirmSwap: () => void;
}

const TransactionSummaryDialog: React.FC<TransactionSummaryDialogProps> = ({
  showSummary,
  setShowSummary,
  fromCurrency,
  fromPhone,
  fromAmount,
  toCurrency,
  toPhone,
  toAmount,
  transactionFee,
  isOnRetrait,
  totalWithFees,
  handleConfirmSwap,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={showSummary} onOpenChange={setShowSummary}>
      <DialogContent 
        className="
          bg-gradient-to-br from-blue-700 to-pink-600 
          border-none 
          text-white 
          w-[90%] 
          max-w-md 
          rounded-xl 
          mx-auto 
          my-auto
        "
      >
        <DialogHeader>
          <DialogTitle 
            className="
              text-xl 
              font-bold 
              text-white 
              mb-4 
              text-center 
            "
          >
            {t("titreFacture")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Retrait Section */}
          <div 
            className="
              bg-white/10 
              rounded-lg 
              p-3 
              sm:p-4 
              transition-all 
              duration-300 
              hover:bg-white/15
            "
          >
            <h3 className="text-sm font-medium mb-2">{t("titreRetait")}</h3>
            <div className="space-y-1 sm:space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>{t("ServiceFacture")}</span>
                <span className="font-medium">{fromCurrency}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span>{t("NumeroFacture")}</span>
                <span className="font-medium">{fromPhone}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span>{t("MontantFacture")}</span>
                <span className="font-medium">{fromAmount} FCFA</span>
              </div>
            </div>
          </div>

          {/* Depot Section */}
          <div 
            className="
              bg-white/10 
              rounded-lg 
              p-3 
              sm:p-4 
              transition-all 
              duration-300 
              hover:bg-white/15
            "
          >
            <h3 className="text-sm font-medium mb-2">{t("titreDepot")}</h3>
            <div className="space-y-1 sm:space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>{t("ServiceFacture")}</span>
                <span className="font-medium">{toCurrency}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span>{t("NumeroFacture")}</span>
                <span className="font-medium">{toPhone}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span>{t("MontantFacture")}</span>
                <span className="font-medium">{toAmount} FCFA</span>
              </div>
            </div>
          </div>

          {/* Frais Section */}
          <div 
            className="
              bg-white/10 
              rounded-lg 
              p-3 
              sm:p-4 
              transition-all 
              duration-300 
              hover:bg-white/15
            "
          >
            <h3 className="text-sm font-medium mb-2">{t("titreFrais")}</h3>
            <div className="space-y-1 sm:space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>{t("FraisFacture")}</span>
                <span className="font-medium">{transactionFee} FCFA</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span>{t("SupporteParFacture")}</span>
                <span className="font-medium">
                  {isOnRetrait ? `${t("expéditeur")}` : `${t("destinataire")}`}
                </span>
              </div>
              <div 
                className="
                  flex 
                  justify-between 
                  font-medium 
                  pt-2 
                  border-t 
                  border-white/10 
                  text-sm 
                  sm:text-base
                "
              >
                <span>{t("TotalFacture")}</span>
                <span>{totalWithFees} FCFA</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter 
          className="
            sm:mt- 
            flex 
            flex-col 
            sm:flex-col
            space-y-2 
            sm:space-y-2 
            sm:space-x-1
          "
        >
         
          <Button
            onClick={handleConfirmSwap}
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-blue-600 hover:from-blue-600 hover:to-pink-500 text-white font-semibold text-base rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-200 hover:shadow-pink-500/25 relative overflow-hidden group"

           
          >
            {t("buttonConfirmTrans")}
          </Button>
          <Button
            onClick={() => setShowSummary(false)}
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-blue-600 hover:from-blue-600 hover:to-pink-500 text-white font-semibold text-base rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-200 hover:shadow-pink-500/25 relative overflow-hidden group"

          >
            {t("buttonAnnulerTrans")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TransactionSummaryDialog;