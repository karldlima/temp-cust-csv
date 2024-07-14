import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Typography,
  tableCellClasses,
} from "@mui/material";

import { EmployeeTableRow, EmployeeTableRowSkeleton, NoRows } from ".";
import { EmployeeLineItem } from "../../interfaces";

interface EmployeeTableProps {
  loading: boolean;
  employees: EmployeeLineItem[];
  handleEditEmployee: (employee: EmployeeLineItem) => void;
}

export const EmployeeTable = ({
  loading,
  employees,
  handleEditEmployee,
}: EmployeeTableProps): JSX.Element => {
  return (
    <Table
      sx={{
        [`& .${tableCellClasses.root}`]: {
          borderBottom: "none",
        },
      }}
    >
      <TableHead sx={{ backgroundColor: "secondary.dark" }}>
        <TableRow>
          {["Name", "Email", "Phone", "Occupation", "Actions"].map((header) => (
            <TableCell key={header}>
              <Typography sx={{ fontWeight: "bold" }}>{header}</Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {loading
          ? Array.from({ length: 10 }, (_, _index) => (
              <EmployeeTableRowSkeleton />
            ))
          : employees?.map((row, i) => {
              return (
                <EmployeeTableRow
                  key={i}
                  employee={row}
                  handleEditEmployee={handleEditEmployee}
                  odd={i % 2 !== 0}
                />
              );
            })}
        {!loading && !employees.length ? <NoRows title={"Employees"} /> : null}
      </TableBody>
    </Table>
  );
};
EmployeeTable.displayName = "EmployeeTable";
