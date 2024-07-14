import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Box, Button, Typography } from "@mui/material";

import { EmployeeModal, EmployeeTable } from "./components";
import { EmployeeLineItem } from "./interfaces";
import { useEmployee } from "./hooks";
import { writeEmployeesToExcel } from "./utils";

const App = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    React.useState<EmployeeLineItem>();
  const { employees, createEmployee, updateEmployee, isLoading, error } =
    useEmployee();

  useEffect(() => {
    toast.error(error);
  }, [error]);

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Social Pro Tech Task</Typography>
        <Box>
          <Button
            color="primary"
            sx={{ marginRight: 1 }}
            onClick={async () => {
              if (employees.length) {
                await writeEmployeesToExcel(employees);
                await writeEmployeesToExcel(employees);
              } else {
                alert("No employees to export");
              }
            }}
          >
            Export
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setSelectedEmployee(undefined);
              setIsModalOpen(true);
            }}
          >
            Add
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
  );
};

export default App;
