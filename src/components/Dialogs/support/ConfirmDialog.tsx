import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../common/ui/dialog";
import { Button } from "../../common/ui/button";
import { useTranslation } from "react-i18next";
import { CheckCircle } from "lucide-react";

interface ConfirmDialogProps {
  showDialog: boolean;
  setShowDialog: (open: boolean) => void;
  fromCurrency: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  showDialog,
  setShowDialog,
  fromCurrency,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="bg-gradient-to-br from-blue-700/95 to-pink-600/95 border-none text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center" >
            {t("")}
          </DialogTitle>
        </DialogHeader>
       
        <div className="p-6 bg-white/10 rounded-lg">
        <div className="flex justify-center items-center mt-4">
          <CheckCircle className="text-green-500 w-12 h-12" /> {/* Icône de succès avec une taille et couleur appropriée */}
        </div>
          <p className="text-center text-white/70">
           Le depot a reussi
          </p>
        </div>

        <Button
          onClick={() => setShowDialog(false)}
          className="w-full mt-4 bg-white/20 hover:bg-white/30"
        >
          {t("Fermer")}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
