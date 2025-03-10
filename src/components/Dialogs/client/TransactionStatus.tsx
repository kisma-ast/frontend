import React from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

interface TransactionStatusProps {
  showPolling: boolean;
  orderId: string;
  orderCode: string;
  statusTransaction: "success" | "pending" | "failed";
  message?: string;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({
  showPolling,
  orderCode,
  statusTransaction,
  message,
}) => {
  if (!showPolling) return null;

  const getStatusConfig = () => {
    
    switch (statusTransaction) {
      case "success":
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          title: "Votre transaction a été effectuée avec succès",
          className: "bg-green-500/10 border-green-500/20 text-green-500",
        };
      case "failed":
        return {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          title: "Votre transaction a échoué.Veuillez réessayer!",
          className: "bg-red-500/10 border-red-500/20 text-red-500",
        };
      default:
        return {
          icon: <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />,
          title: "Votre transaction est en cours de traitement",
          className: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={config.className}>
      <div className="flex items-center gap-2">
        {config.icon}
        <div>{config.title}</div>
      </div>
      <div className="mt-1">
        {message || `ID Transaction: ${orderCode}`}
      </div>
    </div>
  );
};

export default TransactionStatus;
