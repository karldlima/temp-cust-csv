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

  const createEmployee = async (employee: EmployeeLineItem): Promise<void> => {
    try {
      setIsLoading(true);
      await sleep(2000);
      setEmployees([...employees, { ...employee }]);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        setError("Could not create employee");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateEmployee = async (employee: EmployeeLineItem): Promise<void> => {
    try {
      setIsLoading(true);
      await sleep(2000);
      const employeeIndex = employees.findIndex(({ id }) => id === employee.id);
      const updatedEmployees = [...employees];
      if (employeeIndex > -1) {
        updatedEmployees[employeeIndex] = employee;
      }
      setEmployees(updatedEmployees);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        setError("Could not update employee");
      }
    } finally {
      setIsLoading(false);
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
