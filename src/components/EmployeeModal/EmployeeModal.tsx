import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { EmployeeLineItem } from "../../interfaces";
import { EmployeeForm } from "./EmployeeForm";
import { EmployeeAction } from "../../hooks/useEmployee";
import { createDefaultEmployee } from "../../utils";

interface EmployeeModalProps {
  loading: boolean;
  existingEmployee?: EmployeeLineItem;
  createEmployee: EmployeeAction;
  updateEmployee: EmployeeAction;
  handleClose: () => void;
}

export default function EmployeeModal({
  loading,
  existingEmployee,
  createEmployee,
  updateEmployee,
  handleClose,
}: EmployeeModalProps) {
  const modalAction = !!existingEmployee ? "Update" : "Add";
  return (
    <Dialog fullWidth open onClose={handleClose}>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box flexGrow={1}>{`${modalAction} Employee`}</Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <EmployeeForm
          loading={loading}
          employee={existingEmployee || createDefaultEmployee()}
          handleSubmit={async (employee: EmployeeLineItem): Promise<void> => {
            const actionMethod = existingEmployee
              ? updateEmployee
              : createEmployee;
            actionMethod(employee).then(
              (status) => typeof status === "string" && toast.success(status)
            );
            handleClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
EmployeeModal.displayName = "EmployeeModal";
