import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  createDefaultEmployee,
  EmployeeLineItem,
} from "../../interfaces/employees";
import { EmployeeForm } from "./EmployeeForm";

interface EmployeeModalProps {
  loading: boolean;
  existingEmployee?: EmployeeLineItem;
  createEmployee: (
    employee: EmployeeLineItem,
    assignEmployee?: boolean
  ) => void;
  updateEmployee: (employee: EmployeeLineItem) => void;
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
            if (existingEmployee) {
              await updateEmployee(employee);
            } else {
              await createEmployee(employee);
            }
            handleClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
