import * as React from "react";
import { useState } from "react";

//--1

// import * as Dialog from "@radix-ui/react-dialog";
// import { XIcon } from '@heroicons/react/outline'; // Ensure you have @heroicons/react package

//--1 radix temchi mais styles makach + lazem koulech dirou wa7dek (les comonant mfakekiin)
// function PasswordEditDialog1() {
//   const [oldPassword, setOldPassword] = React.useState("");
//   const [newPassword, setNewPassword] = React.useState("");
//   const [confirmPassword, setConfirmPassword] = React.useState("");

//   const handleSave = async () => {
//     if (newPassword !== confirmPassword) {
//       alert("New passwords don't match!");
//       return;
//     }

//     // Implementation for the API call
//     // This is a placeholder, ensure you replace it with your actual implementation
//     try {
//       const response = await fetch("/api/change-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ oldPassword, newPassword }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       alert(data.message); // Display a success message from the server
//     } catch (error) {
//       console.error("Failed to change password:", error);
//       alert("Failed to change password. Please try again.");
//     }
//   };

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>
//         <button className="px-4 py-2 text-white rounded-full bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring">
//           Edit Password
//         </button>
//       </Dialog.Trigger>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
//         <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-8 relative">
//             <Dialog.Close asChild>
//               <button className="absolute top-0 right-0 m-4 text-black">
//                 <p>x</p>
//               </button>
//             </Dialog.Close>
//             <Dialog.Title className="text-lg font-bold">
//               Edit Password
//             </Dialog.Title>
//             <Dialog.Description className="text-sm mb-4">
//               Please enter your old password and your new password.
//             </Dialog.Description>
//             <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
//               <input
//                 type="password"
//                 placeholder="Old Password"
//                 className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="New Password"
//                 className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Confirm New Password"
//                 className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//               <div className="flex justify-end space-x-2">
//                 <Dialog.Close asChild>
//                   <button className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700 focus:outline-none focus:ring">
//                     Cancel
//                   </button>
//                 </Dialog.Close>
//                 <button
//                   type="button"
//                   onClick={handleSave}
//                   className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// }

// //--2 b shad cn : perfect style mliih ...
// import * as DialogPrimitive from "@radix-ui/react-dialog";
// import { X } from "lucide-react";

// // Utility function for className combinations
// const cn = (...classes) => classes.filter(Boolean).join(" ");

// const Dialog = DialogPrimitive.Root;
// const DialogTrigger = DialogPrimitive.Trigger;
// const DialogPortal = DialogPrimitive.Portal;
// const DialogClose = DialogPrimitive.Close;

// const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
//   <DialogPrimitive.Overlay
//     ref={ref}
//     className={cn("fixed inset-0 z-50 bg-black/80", className)}
//     {...props}
//   />
// ));
// DialogOverlay.displayName = "DialogOverlay";

// const DialogContent = React.forwardRef(
//   ({ className, children, ...props }, ref) => (
//     <DialogPortal>
//       <DialogOverlay />
//       <DialogPrimitive.Content
//         ref={ref}
//         className={cn(
//           "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg sm:rounded-lg",
//           className
//         )}
//         {...props}
//       >
//         {children}
//         <DialogClose className="absolute right-4 top-4">
//           <X className="h-4 w-4" />
//           <span className="sr-only">Close</span>
//         </DialogClose>
//       </DialogPrimitive.Content>
//     </DialogPortal>
//   )
// );
// DialogContent.displayName = "DialogContent";

// const DialogHeader = ({ className, ...props }) => (
//   <div
//     className={cn(
//       "flex flex-col space-y-1.5 text-center sm:text-left",
//       className
//     )}
//     {...props}
//   />
// );
// DialogHeader.displayName = "DialogHeader";

// const DialogFooter = ({ className, ...props }) => (
//   <div
//     className={cn(
//       "mt-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
//       className
//     )}
//     {...props}
//   />
// );
// DialogFooter.displayName = "DialogFooter";

// const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
//   <DialogPrimitive.Title
//     ref={ref}
//     className={cn(
//       "text-lg font-semibold leading-none tracking-tight",
//       className
//     )}
//     {...props}
//   />
// ));
// DialogTitle.displayName = "DialogTitle";

// const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
//   <DialogPrimitive.Description
//     ref={ref}
//     className={cn("text-sm", className)}
//     {...props}
//   />
// ));
// DialogDescription.displayName = "DialogDescription";

// // Example Dialog Usage
// function PasswordEditDialog2() {
//   const [oldPassword, setOldPassword] = React.useState("");
//   const [newPassword, setNewPassword] = React.useState("");
//   const [confirmPassword, setConfirmPassword] = React.useState("");

//   const handleSave = async () => {
//     if (newPassword !== confirmPassword) {
//       alert("New passwords don't match!");
//       return;
//     }
//     // Handle password change logic here
//     alert("Password successfully changed!");
//   };

//   return (
//     <Dialog>
//       <DialogTrigger className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">
//         Edit Password
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Edit Password</DialogTitle>
//         </DialogHeader>
//         <input
//           type="password"
//           placeholder="Old Password"
//           className="mt-4 border p-2"
//           value={oldPassword}
//           onChange={(e) => setOldPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           className="mt-4 border p-2"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Confirm New Password"
//           className="mt-4 border p-2"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//         <DialogFooter>
//           <DialogClose asChild>
//             <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
//               Cancel
//             </button>
//           </DialogClose>
//           <button
//             onClick={handleSave}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//           >
//             Save
//           </button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

//--3 b material ui

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(2),
}));
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
}));

function PasswordEditDialog3() {
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    // Handle password change logic here
    alert("Password successfully changed!");
    setOpen(false);
  };

  return (
    <div>
      <Button style={{color:"#ffffff"}} variant="contained" color="primary" onClick={handleClickOpen}>
        Edit Password
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <StyledDialogTitle id="form-dialog-title">
          Edit Password
          <StyledIconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </StyledIconButton>
        </StyledDialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            id="old-password"
            label="Old Password"
            type="password"
            fullWidth
            variant="outlined"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            id="new-password"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            id="confirm-password"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

//4--  b js w tailwind wa7adhom

function PasswordEditDialog4() {
  const [isOpen, setIsOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    // Implement your password change logic here
    alert("Password successfully changed!");
    setIsOpen(false);
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-150 ease-in-out"
        onClick={() => setIsOpen(true)}
      >
        Edit Password
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-3xl shadow max-w-md w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Password</h2>
              <button
                className="text-gray-800 font-bold"
                onClick={() => setIsOpen(false)}
              >
                &#x2715;
              </button>
            </div>
            <div className="mt-4">
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-700 mr-2 transition duration-150 ease-in-out"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-150 ease-in-out"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PasswordEditDialog3;
