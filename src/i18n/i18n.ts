import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Détection de la langue du navigateur
const language = navigator.language;

const defaultLanguage: "fr" | "en" = language.startsWith("fr") ? "fr" : "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title1: "Send",
        title2: "Receive",
        placeholderAmount2: "Amount to receive ",
        placeholderAmount1: "Amount to send ",
        placeholderPhone2: "Enter sender phone number",
        placeholderPhone1: "Enter receiver phone number",
        supportFees: "is Fees bearer",
        totalWithFees: "Total with fees",
        amountEmpty: "Amount is required",
        phoneEmpty: "Phone number is required",
        selectEmpty: "Currency is required",
        placeholder1: "Select ",
        minAmount: "Minimum amount",
        maxAmount: "Maximum amount",
        errorNumerInvalid: "Invalid phone number (format: 7X XXX XX XX)",
        transactionEncours: "Transaction in progress ...",
        titreDialogConfirm: "Payment Confirmation",
        messageDialoConfirm:
          "Please verify and confirm your {{fromCurrency}} payment on your device to finalize the transaction.",
        buttonDialogConfirm: "Done !",
        descriptionDialogQrCode:
          "Scan this QR code with your {{fromCurrency}} application or click on it to open it directly.",
        Ouvrir: "Open",
        Fermer: "Close",
        titreFacture: "Transaction Summary",
        titreRetait: "Payment Details",
        titreDepot: "Sending Details",
        ServiceFacture: "Service",
        MontantFacture: "Amount",
        NumeroFacture: "Phone Number",
        titreFrais: "Transaction Fees",
        FraisFacture: "Fees",
        SupporteParFacture: "Supported by",
        TotalFacture: "Total",
        buttonConfirmTrans: "Confirm Transaction",
        buttonAnnulerTrans: "Cancel",
        expéditeur: "Sender",
        destinataire: "Receiver",
        titreHistory: "Recent Transactions",
        de: "From",
        vers: "To",
        titleError: "Transaction Failed",
        errorTransaction:
          "An error occurred while processing your transaction. Please check your details and try again or contact the support",
        buttonRetry: "Retry the Transaction",
        completed: "Completed",
        pending: "Pending",
        failed: "Failed",
        start: "Start",
        welcome: "Welcome on Swap",
        description:
          "SWAP offers you a secure conversion experience. Swap with ease, wherever you are.",
        authentication: "Authentication",
        descriptionAuth: "Please authenticate to continue.",
        retraitPending: "Withdrawal in progress",
        depotPending: "Deposit in progress",
        success: "Success",
      },
    },
    fr: {
      translation: {
        title2: "Dépot",
        title1: "Retrait",
        placeholderAmount2: "Montant à déposer" ,
        placeholderAmount1: "Montant à retirer",
        placeholderPhone2: "Entrez le numéro du retrait",
        placeholderPhone1: "Entrez le numéro du dépôt",
        supportFees: "Supporte les frais",
        totalWithFees: "Total avec les frais",
        amountEmpty: "Le montant est requis",
        phoneEmpty: "Le numéro de téléphone est requis",
        selectEmpty: "La devise est requise",
        placeholder1: "Sélectionner",
        errorAmountInvalid: "Montant invalid",
        minAmount: "Montant minimum",
        maxAmount: "Montant maximum",
        errorNumerInvalid: "Numéro invalid (format: 7X XXX XX XX)",
        transactionEncours: "Transaction en cours ...",
        titreDialogConfirm: "Confirmation du Retrait",
        messageDialoConfirm:
          "Veuillez vérifier et confirmer votre retrait de {{fromCurrency}} sur votre appareil pour finaliser la transaction.",
        buttonDialogConfirm: "C'est fait !",
        ScanQrCode: "Scanner le QR Code",
        descriptionDialogQrCode:
          "Scannez ce QR code avec votre application {{fromCurrency}} ou cliquez dessus pour l'ouvrir directement.",
        Ouvrir: "Ouvrir",
        Fermer: "Fermer",
        titreFacture: "Résumé de la transaction",
        titreRetait: "Détails du retrait",
        titreDepot: "Détails du dépôt",
        ServiceFacture: "Service",
        MontantFacture: "Montant",
        NumeroFacture: "Telephone",
        titreFrais: "Frais de la transaction",
        FraisFacture: "Frais",
        SupporteParFacture: "Supporté par",
        TotalFacture: "Total",
        buttonConfirmTrans: "Confirmer la transaction",
        buttonAnnulerTrans: "Annuler",
        expéditeur: "L'expéditeur",
        destinataire: "Le destinataire",
        titreHistory: "Transactions Récentes",
        de: "De:",
        vers: "Vers:",
        titleError: "Échec de la transaction",
        errorTransaction:
          "Une erreur est survenue lors du traitement de votre transaction. Veuillez vérifier les informations et réessayer.",
        buttonRetry: "Réessayer la transaction",
        completed: "Terminé",
        pending: "En cours",
        failed: "Échoué",
        start: "Démarrer",
        welcome: "Bienvenue sur SWAP",
        description:
          "SWAP vous propose une expérience de conversion et d'echange en toute sécurité. Swappez en toute simplicité, où que vous soyez.",
        authentication: "Authentification",
        descriptionAuth: "Veuillez vous authentifier pour continuer.",
        retraitPending: "Retrait en cours",
        retraitFailed: "Retrait échoué",
        depotPending: "Dépôt en cours",
        depotFailed: "Dépôt échoué",
        success: "Succès",
      },
    },
  },
  lng: defaultLanguage, // Utiliser la langue détectée
  fallbackLng: "en", // Langue par défaut si la langue détectée n'est pas disponible
  interpolation: {
    escapeValue: false, // Pas d'échappement pour éviter les conflits avec React
  },
});

export default i18n;
