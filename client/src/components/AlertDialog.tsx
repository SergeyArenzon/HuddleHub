import React, { useState } from "react";
import {
  AlertDialog as AlertDialogComponent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function AlertDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleConfirm = () => {
    console.log("Confirmed!");
    setIsOpen(false); // Close the dialog after confirmation
  };

  return (
    <div>
      <Button variant="outline" onClick={handleOpen}>
        Show Dialog
      </Button>

      <AlertDialogComponent
        open={isOpen}
        onOpenChange={(open) => setIsOpen(open)} // Handles both close by outside click and other triggers
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant={"error"}  onClick={handleClose}>Cancel</Button>
            <Button variant={"default"} onClick={handleConfirm}>Continue</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogComponent>
    </div>
  );
}
