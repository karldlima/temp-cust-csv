import * as React from "react";

import { EmployeeLineItem } from "../interfaces";
import { sleep } from "../utils";

export type EmployeeAction = (
  employee: EmployeeLineItem
) => Promise<string | Error>;

export const useEmployee = () => {
  const [employees, setEmployees] = React.useState<EmployeeLineItem[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    listEmployees();
  }, []);

  const listEmployees = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await sleep(2000);
      setEmployees([]);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        setError("Could not list employees");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmployeeAction = async (
    employee: EmployeeLineItem,
    action: (employee: EmployeeLineItem) => void,
    successMessage: string,
    errorMessage: string
  ): Promise<string | Error> => {
    try {
      setIsLoading(true);
      await sleep(2000);
      action(employee);
      setIsLoading(false);
      return successMessage;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        setError(errorMessage);
      }
      setIsLoading(false);
      return new Error();
    }
  };

  const createEmployee: EmployeeAction = async (
    employee: EmployeeLineItem
  ): Promise<string | Error> => {
    return handleEmployeeAction(
      employee,
      (emp) => setEmployees([...employees, { ...emp }]),
      `Employee ${employee.name} has been added`,
      "Could not create employee"
    );
  };

  const updateEmployee: EmployeeAction = async (
    employee: EmployeeLineItem
  ): Promise<string | Error> => {
    return handleEmployeeAction(
      employee,
      (emp) => {
        const employeeIndex = employees.findIndex(({ id }) => id === emp.id);
        const updatedEmployees = [...employees];
        if (employeeIndex > -1) {
          updatedEmployees[employeeIndex] = emp;
        }
        setEmployees(updatedEmployees);
      },
      `Employee ${employee.name} has been updated`,
      "Could not update employee"
    );
  };

  return {
    employees,
    createEmployee,
    updateEmployee,
    isLoading,
    error,
  };
};
