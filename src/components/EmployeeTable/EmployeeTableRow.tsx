import { IconButton, TableCell, TableRow, Tooltip, Zoom } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { EmployeeLineItem } from "../../interfaces";

interface EmployeeTableRowProps {
  employee: EmployeeLineItem;
  handleEditEmployee: (employee: EmployeeLineItem) => void;
  odd?: boolean;
}

export const EmployeeTableRow = ({
  employee,
  handleEditEmployee,
  odd,
}: EmployeeTableRowProps): JSX.Element => {
  const { name, email, phone, occupation } = employee ?? {};

  return (
    <TableRow
      sx={{
        backgroundColor: odd ? "secondary.light" : "common.white",
      }}
    >
      {[name, email, phone, occupation].map((field) => (
        <TableCell>{field}</TableCell>
      ))}
      <TableCell>
        <Tooltip placement="top" title="Edit" TransitionComponent={Zoom}>
          <IconButton
            color="primary"
            size="large"
            onClick={() => handleEditEmployee(employee)}
          >
            <EditIcon
              sx={{
                fontSize: "1.1rem",
              }}
            />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
EmployeeTableRow.displayName = "EmployeeTableRow";
