import { TableCell, TableRow, Typography } from "@mui/material";

interface NoRowsProps {
  title: string;
}
export const NoRows = ({ title }: NoRowsProps) => {
  return (
    <TableRow>
      <TableCell colSpan={5}>
        <Typography align="center">No {title}</Typography>
      </TableCell>
    </TableRow>
  );
};
NoRows.displayName = "NoRows";
