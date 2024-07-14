import { toast } from "react-toastify";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { EmployeeForm } from "./EmployeeForm";
import { EmployeeLineItem } from "../../interfaces";
import { EmployeeAction } from "../../hooks";
import { createDefaultEmployee } from "../../utils";

interface EmployeeModalProps {
  loading: boolean;
  createEmployee: EmployeeAction;
  updateEmployee: EmployeeAction;
  handleClose: () => void;
  existingEmployee?: EmployeeLineItem;
}

export const EmployeeModal = ({
  loading,
  createEmployee,
  updateEmployee,
  handleClose,
  existingEmployee,
}: EmployeeModalProps): JSX.Element => {
  const theme = useTheme();
  const tabletPlus = useMediaQuery(theme.breakpoints.up("sm"));

  const modalAction = !!existingEmployee ? "Update" : "Add";

  return (
    <Dialog fullScreen={!tabletPlus} fullWidth open onClose={handleClose}>
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
          onSubmit={async (employee: EmployeeLineItem): Promise<void> => {
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
};
EmployeeModal.displayName = "EmployeeModal";
