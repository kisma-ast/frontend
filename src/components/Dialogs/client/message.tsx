import React, { useState } from "react";
import {
  CheckCircle as SuccessIcon,
  Clock as PendingIcon,
  AlertCircle as FailedIcon,
  X as CloseIcon,
} from "lucide-react";

interface TransactionStatusProps {
  showPolling: boolean;
  orderId?: string;
  error?: string;
  statusTransaction: string;
  transactionId?: string;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({
  showPolling,
  orderId,
  error,
  statusTransaction,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!showPolling || !orderId || !isVisible) return null;

  const getStatusContent = () => {
    if (error) {
      return {
        icon: <FailedIcon className="mr-2" />,
        message: error,
        className: "text-red-500 bg-red-50",
      };
    }

    switch (statusTransaction) {
      case "success":
        return {
          icon: <SuccessIcon className="mr-2" />,
          message: "Dépôt effectué avec succès .",
          className: "text-green-600 bg-green-50",
        };
      case "pending":
        return {
          icon: <PendingIcon className="mr-2" />,
          message: "Transaction en cours.",
          className: "text-yellow-600 bg-yellow-50",
        };
      case "failed":
        return {
          icon: <FailedIcon className="mr-2" />,
          message: "Transaction échouée. Réessayez.",
          className: "text-red-500 bg-red-50",
        };
      default:
        return null;
    }
  };

  const statusContent = getStatusContent();

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 pb-4">
        {statusContent && (
          <div
            className={`flex items-center justify-between p-4 rounded-lg ${statusContent.className}`}
          >
            <div className="flex items-center">
              {statusContent.icon}
              <span>{statusContent.message}</span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-4 hover:bg-opacity-20 rounded-full p-1"
            >
              <CloseIcon size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionStatus;
