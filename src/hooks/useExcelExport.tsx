import * as React from "react";

import { EmployeeLineItem } from "../interfaces";
import { sleep, writeEmployeesToExcel } from "../utils";

export const useExcelExport = () => {
  const [isExporting, setIsExporting] = React.useState<boolean>(false);
  const [exportError, setExportError] = React.useState<string | null>(null);

  const exportExployees = async (
    employees: EmployeeLineItem[]
  ): Promise<string | Error> => {
    try {
      setIsExporting(true);
      await writeEmployeesToExcel(employees);
      await sleep(2000);
      setIsExporting(false);
      return "Employee data has been exported";
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        setExportError(`Could not export employees: ${e}`);
      }
      setIsExporting(false);
      return e as Error;
    }
  };
  return {
    exportExployees,
    isExporting,
    exportError,
  };
};
