import { useEffect, useState } from "react";
import { useImmer } from "use-immer";

import { EmployeeLineItem } from "../interfaces";
import { sleep } from "../utils";

export type EmployeeAction = (
  employee: EmployeeLineItem
) => Promise<string | Error>;

export const useEmployee = () => {
  const [employees, setEmployees] = useImmer<EmployeeLineItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        setError(`${errorMessage}: ${e}`);
      }
      setIsLoading(false);
      return e as Error;
    }
  };

  const createEmployee: EmployeeAction = async (
    employee: EmployeeLineItem
  ): Promise<string | Error> => {
    return handleEmployeeAction(
      employee,
      (emp) =>
        setEmployees((draft) => {
          draft.push({ ...emp });
        }),
      `Employee ${employee.name} has been added`,
      "Could not create employee"
    );
  };

  const updateEmployee: EmployeeAction = async (
    employee: EmployeeLineItem
  ): Promise<string | Error> => {
    return handleEmployeeAction(
      employee,
      (emp) =>
        setEmployees((draft) => {
          const employeeIndex = draft.findIndex(({ id }) => id === emp.id);
          if (employeeIndex > -1) {
            draft[employeeIndex] = emp;
          }
        }),
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
