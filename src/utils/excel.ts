import * as ExcelJs from "exceljs";

import { EmployeeLineItem } from "../interfaces";

export const writeEmployeesToExcel = async (
  employees: EmployeeLineItem[]
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const workbook = new ExcelJs.Workbook();
        const workSheet = workbook.addWorksheet("Employees");
        const fields = ["id", "name", "email", "phone", "occupation"];
        workSheet.columns = fields;
        workSheet.addRow(fields);
        for (const { id, name, email, phone, occupation } of employees) {
          workSheet.addRow([id, name, email, phone, occupation]);
        }

        const data = await workbook.xlsx.writeBuffer();
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `EmployeeExport.xlsx`;
        anchor.click();
        window.URL.revokeObjectURL(url);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    })();
  });
};
