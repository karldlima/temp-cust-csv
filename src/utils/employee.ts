import { v4 as uuid } from "uuid";

import { EmployeeLineItem } from "../interfaces";

export const createDefaultEmployee = (): EmployeeLineItem => ({
  id: uuid(),
  name: "",
  email: "",
  phone: "",
  occupation: "",
  created: new Date(),
});
