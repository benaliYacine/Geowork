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
import { Trash2 } from "lucide-react";
import IconButton from "@/components/common/IconButton";
import React, { useState } from "react";

export default function DeleteExperienceButton({ onDelete }) {
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
        <IconButton>
          <Trash2 className="h-4 w-4" />
        </IconButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Experience</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove this experience from your profile?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="white">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
