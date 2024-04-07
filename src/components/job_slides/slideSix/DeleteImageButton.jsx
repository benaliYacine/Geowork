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

export default function DeleteImageButton({ onDelete }) {
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
        <IconButton variant="outlined">
          <Trash2 className="h-4 w-4" />
        </IconButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Image</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove this Image from your job post?
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

{
  /* <DeleteImageButton onDelete={onDelete} /> */
}
