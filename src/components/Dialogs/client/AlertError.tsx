import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../common/ui/dialog";
import { Button } from "../../common/ui/button";
import { XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface QRDialogProps {
  showQRDialog: boolean;
  setShowErrorDialog: (open: boolean) => void;

}
const AlertError: React.FC<QRDialogProps> = ({
  showQRDialog,
  setShowErrorDialog,
 
}) => {
  const { t } = useTranslation();
  return(
  <Dialog open={showQRDialog} onOpenChange={setShowErrorDialog}>
    <DialogContent className="bg-gradient-to-br from-blue-700/95 to-pink-600/95 border-none text-white">
      <DialogHeader>
        <DialogTitle className="flex justify-center items-center "> {t('titleError')}</DialogTitle>
      </DialogHeader>
      <div className=" bg-white/10 rounded-lg">
      <div className="flex justify-center items-center mt-4">
          <XCircle className="text-red-500 w-12 h-12" /> {/* Icône d'erreur avec une taille et couleur appropriée */}
        </div>
            <div className="flex text-center text-xl">{t('errorTransaction')}</div>
      <div className="flex flex-col gap-2 mt-4">
        <Button
          variant="ghost"
          onClick={() => setShowErrorDialog(false)}
          className="hover:bg-white/10"
        >
        {t('buttonRetry')}
        </Button>
      </div>
      </div>
     
    </DialogContent>
  </Dialog>
  )
};

export default AlertError;
