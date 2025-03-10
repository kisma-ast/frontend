import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/common/ui/card";
import { Button } from "../../../components/common/ui/button";

interface DialoguFormProps {
  message: string;
  onDelete: () => void;
  onCancel: () => void;
}

const DialoguDeleteForm: React.FC<DialoguFormProps> = ({
  message,
  onDelete,
  onCancel
}) => {
  return (
    <div className="fixed inset-0 bg-white/10 flex items-center justify-center">
      <Card className="w-96 bg-blue-800">
        <CardHeader>
          <CardTitle className="text-white">  Confirmer la suppression</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-white mb-4">{message}</p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={onCancel}>
              Annuler
            </Button>
            <Button
              className="bg-blue-800 hover:bg-blue-700"
              onClick={onDelete}
            >
              Confirmer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DialoguDeleteForm;
