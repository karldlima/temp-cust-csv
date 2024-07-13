import * as React from "react";

import { EmployeeLineItem } from "../interfaces";
import { sleep, writeEmployeesToExcel } from "../utils";

export const useExcelExport = () => {
  const [isExporting, setIsExporting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const exportExployees = async (
    employees: EmployeeLineItem[]
  ): Promise<void> => {
    try {
      setIsExporting(true);
      await writeEmployeesToExcel(employees);
      await sleep(2000);
      return;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        setError("Could not export employees");
      }
    } finally {
      setIsExporting(false);
    }
  };
  return {
    exportExployees,
    isExporting,
    error,
  };
};
