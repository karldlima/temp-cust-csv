/** @jsxImportSource @emotion/react */
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Theme } from "@mui/material";
import { css } from "@emotion/react";

import { EmployeeLineItem } from "../../interfaces";

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

  const { name, email, phone, occupation } = employee ?? {};

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
  } = useFormik({
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
    <form css={(theme) => formCss(theme as Theme)} onSubmit={handleSubmit}>
      <TextField
        id="name"
        name="name"
        label="Name *"
        disabled={loading}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        error={touched.name && Boolean(errors.name)}
        helperText={errors.name ?? ""}
      />
      <TextField
        id="email"
        name="email"
        label="Email *"
        disabled={loading}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        error={touched.email && Boolean(errors.email)}
        helperText={errors.email ?? ""}
      />
      <TextField
        id="phone"
        name="phone"
        label="Phone Number *"
        disabled={loading}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.phone}
        error={touched.phone && Boolean(errors.phone)}
        helperText={errors.phone ?? ""}
      />
      <TextField
        id="occupation"
        name="occupation"
        label="Occupation *"
        disabled={loading}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.occupation}
        error={touched.occupation && Boolean(errors.occupation)}
        helperText={errors.occupation ?? ""}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isSubmitting || !isValid || loading}
        sx={{ marginTop: 3, marginLeft: "auto" }}
      >
        Save
      </Button>
    </form>
  );
};
EmployeeForm.displayName = "EmployeeForm";
