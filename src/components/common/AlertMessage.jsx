// components/AlertMessage.jsx
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CircleCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";
const AlertMessage = ({ showAlert, message, variant = "default", onClose , className }) => {
  const Icon = variant === "destructive" ? AlertCircle : CircleCheck;

  return showAlert ? (
    <Alert variant={variant} className={cn("mb-4 relative ",className)}>
      <Icon className="h-5 w-5" />
      {variant === "destructive" && <AlertTitle>Error</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
      <button onClick={onClose} className="absolute top-3 right-3">
        <X className="h-5 w-5" />
      </button>
    </Alert>
  ) : null;
};

export default AlertMessage;
