import React from 'react'
import { useTranslation } from "react-i18next";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "../../../../components/common/ui/dialog";
import { Button } from '../../../../components/common/ui/button';
import {Orders } from '../../../../types/types';

interface DetailsTransactionsProps{
    showDetailsTransaction:(boolean)
    setShowDetailsTransaction:any
    message?:string
    transactions:Orders | null
    ResendDeposit:(value:string)=>void
}
const DetailsTransactions:React.FC<DetailsTransactionsProps>=({
    showDetailsTransaction,
    setShowDetailsTransaction,
    message,
    transactions,
    ResendDeposit,
})=> {
    const { t } = useTranslation();
  return (
    <div><Dialog
    open={showDetailsTransaction}
    onOpenChange={setShowDetailsTransaction}
  >
    <DialogContent className="bg-blue-800 border-none text-white w-[90%] max-w-md rounded-xl mx-auto my-auto">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-white mb-4 text-center">
          Details  de la transaction
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
          <div className="flex justify-center ">
            <span className="text-xs sm:text-lg">
              Message: {message}{" "}
            </span>
          </div>
        </div>
        <div className="bg-white/10 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:bg-white/15">
          <h3 className="text-sm font-medium mb-2">{t("titreRetait")}</h3>
          <div className="space-y-1 sm:space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span>{t("ServiceFacture")}</span>
              <span className="font-medium">
                {transactions?.transactions[0].currency}
              </span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>{t("NumeroFacture")}</span>
              <span className="font-medium">
                {transactions?.transactions[0].phoneNumber}
              </span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>{t("MontantFacture")}</span>
              <span className="font-medium">
                {transactions?.transactions[0].amount} FCFA
              </span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>{t("Etat")}</span>
              <span className="font-medium">
                {transactions?.transactions[0].status}{" "}
              </span>
            </div>
          </div>
        </div>

        {/* Depot Section */}
        <div className="bg-white/10 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:bg-white/15">
          <h3 className="text-sm font-medium mb-2">{t("titreDepot")}</h3>
          <div className="space-y-1 sm:space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span>{t("ServiceFacture")}</span>
              <span className="font-medium">
                {transactions?.transactions[1].currency}
              </span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>{t("NumeroFacture")}</span>
              <span className="font-medium">
                {transactions?.transactions[1].phoneNumber}
              </span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>{t("MontantFacture")}</span>
              <span className="font-medium">
                {transactions?.transactions[1].amount} FCFA
              </span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>{t("Etat")}</span>
              <span className="font-medium">
                {transactions?.transactions[1].status}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter className="sm:mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1">
        {transactions?.transactions[0].status === "success" &&
        transactions?.transactions[1].status === "failed" ? (
          <Button
            onClick={() => ResendDeposit(transactions.orderCode)}
            className="w-full py-2 bg-gradient-to-r from-pink-600 to-blue-600 hover:from-blue-600 hover:to-pink-500 text-white font-semibold text-base rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-200 hover:shadow-pink-500/25 relative overflow-hidden group"
          >
            {t("Renvoyer Depot")}
          </Button>
        ) : (
          <Button
            // onClick={() => Clore(transactions?.orderCode)}
            className="w-full py-2 bg-gradient-to-r from-pink-600 to-blue-600 hover:from-blue-600 hover:to-pink-500 text-white font-semibold text-base rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-200 hover:shadow-pink-500/25 relative overflow-hidden group"
          >
            {t("Clôturer")}
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
  </Dialog></div>
  )
}

export default DetailsTransactions