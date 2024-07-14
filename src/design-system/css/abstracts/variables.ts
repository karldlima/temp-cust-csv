import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#445ec7",
      light: "#5a72d3",
      dark: "#344ba8",
    },
    secondary: {
      main: "#e0e0e0",
      light: "#F7F7F7",
      dark: "#CACACA",
    },
    text: {
      primary: "#141b38de",
      secondary: "#2E2E2E",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1408,
    },
  },
});
