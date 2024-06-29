import { React, useState } from "react";

import { Button } from "@/components/ui/button";
import {  Trash2 } from "lucide-react";

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

export default function DeleteJobPost({ onDelete, loading }) {
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
                <Button variant="outline" size="sm" loading={loading}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    delete job post
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Remove Job Post</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to remove this Job Post?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="white">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleAction}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}