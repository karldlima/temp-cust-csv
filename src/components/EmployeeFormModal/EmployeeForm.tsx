/** @jsxImportSource @emotion/react */
import { forwardRef } from "react";
import { FormikProps, useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Theme } from "@mui/material";
import { css } from "@emotion/react";

import { EmployeeLineItem } from "../../interfaces";

interface CustomTextFieldProps {
  id: string;
  name: string;
  label: string;
  formik: FormikProps<any>;
  loading: boolean;
}

const CustomTextField = forwardRef<HTMLInputElement, CustomTextFieldProps>(
  ({ id, name, label, formik, loading, ...rest }, ref) => {
    const { handleChange, handleBlur, values, touched, errors } = formik;
    return (
      <TextField
        id={id}
        name={name}
        label={`${label} *`}
        disabled={loading}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
        error={touched[name] && Boolean(errors[name])}
        helperText={(errors[name] as string) ?? ""}
        inputRef={ref}
        {...rest}
      />
    );
  }
);

const formCss = (theme: Theme) =>
  css({
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    "> div": { flex: "1 1 100%" },
    [theme.breakpoints.up("sm")]: {
      "> div": { flex: "1 1 calc(50% - 6px)" },
    },
  });

interface EmployeeFormProps {
  loading: boolean;
  employee: EmployeeLineItem;
  onSubmit: (employee: EmployeeLineItem) => Promise<void>;
}

export const EmployeeForm = ({
  loading,
  employee,
  onSubmit,
}: EmployeeFormProps): JSX.Element => {
  const validationSchema = yup.object({
    name: yup
      .string()
      .label("Name")
      .max(25, "Name cannot be more than 25 characters")
      .required(),
    email: yup
      .string()
      .label("Email")
      .email("Please enter a valid Email")
      .max(25, "Email cannot be more than 25 characters")
      .required(),
    phone: yup
      .string()
      .label("Phone Number")
      .matches(/^\d+$/, "Please enter a valid Phone Number")
      .min(8, "Phone Number must be at least 8 digits")
      .max(15, "Phone Number cannot be more than 15 digits")
      .required(),
    occupation: yup
      .string()
      .label("Occupation")
      .max(15, "Occupation cannot be more than 15 characters")
      .required(),
  });

  const fields = [
    { id: "name", name: "name", label: "Name" },
    { id: "email", name: "email", label: "Email" },
    { id: "phone", name: "phone", label: "Phone Number" },
    { id: "occupation", name: "occupation", label: "Occupation" },
  ];

  const { name, email, phone, occupation } = employee ?? {};

  const formik = useFormik({
    initialValues: {
      name: name,
      email: email,
      phone: phone,
      occupation: occupation,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async ({ name, email, phone, occupation }) => {
      await onSubmit({
        ...employee,
        name,
        email,
        phone,
        occupation,
      });
    },
  });

  return (
    <form
      css={(theme) => formCss(theme as Theme)}
      onSubmit={formik.handleSubmit}
    >
      {fields.map((field) => (
        <CustomTextField
          key={field.id}
          id={field.id}
          name={field.name}
          label={field.label}
          formik={formik}
          loading={loading}
        />
      ))}
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={formik.isSubmitting || !formik.isValid || loading}
        sx={{ marginTop: 3, marginLeft: "auto" }}
      >
        Save
      </Button>
    </form>
  );
};
EmployeeForm.displayName = "EmployeeForm";
