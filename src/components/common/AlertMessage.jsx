// components/AlertMessage.jsx
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
const AlertMessage = ({ showAlert, message, variant = "destructive" }) => (
    showAlert ? (
        <Alert variant={variant} className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    ) : null
);

export default AlertMessage;
