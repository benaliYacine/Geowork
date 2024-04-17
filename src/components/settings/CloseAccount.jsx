import { React, useState } from "react";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CloseAccount({ onDelete }) {
  const [isActionTaken, setIsActionTaken] = useState(false);

  const handleAction = () => {
    setIsActionTaken(true);
  };
 
  const handleClose = () => {
    if (isActionTaken) {
      onDelete();
      setIsActionTaken(false); // Reset the state for the next interaction
    }
  };

  return (
    <AlertDialog onOpenChange={handleClose}>
      <AlertDialogTrigger asChild>
        <Button variant="link" size="sm" className="text-destructive">
          <Trash2 className="h-4 w-4 mr-2" />
          Close My Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>close my account</AlertDialogTitle>
          <AlertDialogDescription>
          leaving so soon, are you sure you want to close your account?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="white">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>close account</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
