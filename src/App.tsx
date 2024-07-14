/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Box, Button, Typography, Theme } from "@mui/material";
import { css } from "@emotion/react";

import { EmployeeModal, EmployeeTable } from "./components";
import { EmployeeLineItem } from "./interfaces";
import { useEmployee, useExcelExport } from "./hooks";

const appContainerCss = {
  self: css({
    padding: "30px",
    maxWidth: "1000px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    margin: "0 auto",
  }),
  controlContainer: (theme: Theme) =>
    css({
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "16px",
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
    }),
};

const App = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    React.useState<EmployeeLineItem>();
  const { employees, createEmployee, updateEmployee, isLoading, error } =
    useEmployee();
  const { exportExployees, isExporting, exportError } = useExcelExport();

  useEffect(() => {
    !!error && toast.error(error);
  }, [error]);
  useEffect(() => {
    !!exportError && toast.error(exportError);
  }, [exportError]);

  return (
    <main>
      <Box css={appContainerCss.self}>
        <Box css={(theme) => appContainerCss.controlContainer(theme as Theme)}>
          <Typography variant="h4">Manage Employees</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="primary"
              variant="contained"
              disabled={isLoading}
              onClick={() => {
                setSelectedEmployee(undefined);
                setIsModalOpen(true);
              }}
            >
              Add
            </Button>
            <Button
              color="primary"
              variant="contained"
              disabled={!employees.length || isExporting}
              onClick={async () => {
                await exportExployees(employees).then(
                  (status) =>
                    typeof status === "string" && toast.success(status)
                );
              }}
            >
              Export
            </Button>
          </Box>
        </Box>
        <EmployeeTable
          loading={isLoading}
          employees={employees}
          handleEditEmployee={(employee: EmployeeLineItem): void => {
            setIsModalOpen(true);
            setSelectedEmployee(employee);
          }}
        />
        {isModalOpen && (
          <EmployeeModal
            loading={isLoading}
            existingEmployee={selectedEmployee}
            createEmployee={createEmployee}
            updateEmployee={updateEmployee}
            handleClose={(): void => {
              setIsModalOpen(false);
              setSelectedEmployee(undefined);
            }}
          />
        )}
      </Box>
    </main>
  );
};
export default App;
