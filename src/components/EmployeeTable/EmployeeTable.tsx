import {
  Grid,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Typography,
} from "@mui/material";
import { EmployeeTableRow } from "./EmployeeTableRow";
import { EmployeeTableRowSkeleton } from "./EmployeeTableRowSkeleton";
import { NoRows } from "./NoRows";
import { EmployeeLineItem } from "../../interfaces/employees";

interface EmployeeTableProps {
  loading: boolean;
  employees: EmployeeLineItem[];
  handleEditEmployee: (employee: EmployeeLineItem) => void;
}

export const EmployeeTable = ({
  loading,
  employees,
  handleEditEmployee,
}: EmployeeTableProps) => {
  return (
    <Grid item xs={12} md={12}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Name</Typography>
            </TableCell>
            <TableCell>
              <Typography>Email</Typography>
            </TableCell>
            <TableCell>
              <Typography>Phone</Typography>
            </TableCell>
            <TableCell>
              <Typography>Occupation</Typography>
            </TableCell>
            <TableCell>
              <Typography>Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? Array.from({ length: 10 }, (_, index) => (
                <EmployeeTableRowSkeleton />
              ))
            : employees?.map((row) => {
                return (
                  <EmployeeTableRow
                    employee={row}
                    handleEditEmployee={handleEditEmployee}
                  />
                );
              })}

          {!loading && !employees.length ? (
            <NoRows title={"Employees"} />
          ) : null}
        </TableBody>
      </Table>
    </Grid>
  );
};
EmployeeTable.displayName = "EmployeeTable";
