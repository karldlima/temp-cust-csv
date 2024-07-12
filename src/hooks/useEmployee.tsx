import * as React from "react";
import { EmployeeLineItem } from "../interfaces/employees";
import { sleep } from "../utils/sleep";

export const useEmployee = () => {
  const [employees, setEmployees] = React.useState<EmployeeLineItem[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

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

  const createEmployee = async (
    employee: EmployeeLineItem
  ): Promise<string | Error> => {
    try {
      setIsLoading(true);
      await sleep(2000);
      setEmployees([...employees, { ...employee }]);
      setIsLoading(false);
      return `Employee ${employee.name} has been added`;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        setError("Could not create employee");
      }
      setIsLoading(false);
      return new Error();
    }
  };

  const updateEmployee = async (
    employee: EmployeeLineItem
  ): Promise<string | Error> => {
    try {
      setIsLoading(true);
      await sleep(2000);
      const employeeIndex = employees.findIndex(({ id }) => id === employee.id);
      const updatedEmployees = [...employees];
      if (employeeIndex > -1) {
        updatedEmployees[employeeIndex] = employee;
      }
      setEmployees(updatedEmployees);
      setIsLoading(false);
      return `Employee ${employee.name} has been updated`;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        setError("Could not update employee");
      }
      setIsLoading(false);
      return new Error();
    }
  };

  React.useEffect(() => {
    listEmployees();
  }, []);

  return {
    employees,
    createEmployee,
    updateEmployee,
    isLoading,
    error,
  };
};
