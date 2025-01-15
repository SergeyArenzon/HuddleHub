
// type ModalProps = {
//     children: React.ReactNode
// }

// const Modal = ({ children } : ModalProps) => {
//   return (
//     <div className="h-screen w-screen bg-gray-300 bg-opacity-50 fixed left-0 top-0">
//         {children}
//     </div>
//   )
// }

// export default Modal

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import Dialog from "./AlertDialog"
import { AlertDialogOverlay } from "@radix-ui/react-alert-dialog"
import Loader from "./ui/loader"
  

  type ModalProps = {
    mode: "alert" | "confirm" | "prompt" | "loader"
    open: boolean
  }


  export function Modal({ mode, open } : ModalProps) {


    let content = null;

    switch (mode) {
        case "confirm":
            content = <Dialog />
            break;
        case "loader":
            content = <Loader />
            break;
    
        default:
            break;
    }

    return (
      <AlertDialog open={open}>
        <AlertDialogContent>
            { content }
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  