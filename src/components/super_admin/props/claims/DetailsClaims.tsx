import { Claims } from '../../../../types/types'
import React from 'react'


interface DetailsClaimsProps{
    selectedClaim:Claims
    setSelectedClaim:(value: React.SetStateAction<Claims | null>) => void
}
const DetailsClaims:React.FC<DetailsClaimsProps>=({
    selectedClaim,
    setSelectedClaim
})=> {
  return (
    <div className="fixed inset-0 bg-black/5 flex items-center justify-center z-50 p-4">
    <div className=" p-3 sm:p-6 rounded-lg w-full max-w-md bg-blue-800  ">
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-center">
        Détails de la Réclamation
      </h3>
      <div className="space-y-2 text-sm sm:text-base  ">
        <p>ID: {selectedClaim.id}</p>
        <p>Client: {selectedClaim.clients.telegramUserId}</p>
        <p>Montant: {selectedClaim.amount} Fcfa</p>
        <p>N° Dépôt: {selectedClaim.numberDebit}</p>
        <p>N° Retrait: {selectedClaim.numberRetrait}</p>
        <p>ID Transaction: {selectedClaim.orderCode}</p>
        <p>Description: {selectedClaim.description}</p>
        <p>Statut: {selectedClaim.status}</p>
      </div>
      <button
        onClick={() => setSelectedClaim(null)}
        className="mt-3 sm:mt-4 w-full px-4 py-2 bg-gradient-to-r from-pink-600 to-blue-600 hover:from-blue-600 hover:to-pink-500 text-white font-semibold text-base rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-200 hover:shadow-pink-500/25 relative overflow-hidden group"
      >
        Fermer
      </button>
    </div>
  </div>
  )
}

export default DetailsClaims