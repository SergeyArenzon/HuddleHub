import {
  AlertDialog as AlertDialogComponent,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type AlertDialogProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function AlertDialog({ open, onCancel, onConfirm } : AlertDialogProps) {
  return (
      <AlertDialogComponent open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant={"error"}  onClick={onCancel}>Cancel</Button>
            <Button variant={"default"} onClick={onConfirm}>Continue</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogComponent>
  );
}
