import React from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,

  DialogDescription,
} from "../../common/ui/dialog";
import { Button } from "../../common/ui/button";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

interface QRDialogProps {
  showQRDialog: boolean;
  setShowQRDialog: (open: boolean) => void;
  lien: string;
  codeQr: string;
  title?: string;
  description?: string;
  closeButtonText?: string;
  fromCurrency:string
}
const ConfirmQrDialog: React.FC<QRDialogProps> = ({
  showQRDialog,
  setShowQRDialog,
  lien,
  codeQr,
  fromCurrency
  
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
  <DialogContent className="bg-gradient-to-br from-blue-700/95 to-pink-600/95 border-none text-white">

      <DialogHeader>
        <DialogTitle>{t('ScanQrCode')} {fromCurrency} </DialogTitle>
        <DialogDescription className="text-white/70">
        {t('descriptionDialogQrCode', { fromCurrency })}
        {/* Scannez ce QR code avec votre application {fromCurrency} ou cliquez dessus pour l'ouvrir directement. */}
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col items-center justify-center p-6 bg-white/10 rounded-lg" onClick={() => window.open(lien, "_blank")}>
          <img
            src={codeQr}
            alt="QR Code Wave"
            className="w-48 h-48 object-contain"
          />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Button
          onClick={() => window.open(lien, "_blank")}
          className="bg-white/20 hover:bg-white/30"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
         { t("Ouvrir") } {fromCurrency}
        </Button>

        <Button
          variant="ghost"
          onClick={() => setShowQRDialog(false)}
          className="hover:bg-white/10"
        >
          {t("Fermer")}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
  );
}
  
 


export default ConfirmQrDialog;




