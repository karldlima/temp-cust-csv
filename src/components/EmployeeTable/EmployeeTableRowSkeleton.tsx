import { Button, Skeleton, TableCell, TableRow } from "@mui/material";

export const EmployeeTableRowSkeleton = (): JSX.Element => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton animation="wave" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="rounded">
          <Button color="primary" size="large"></Button>
        </Skeleton>
      </TableCell>
    </TableRow>
  );
};
EmployeeTableRowSkeleton.displayName = "EmployeeTableRowSkeleton";
