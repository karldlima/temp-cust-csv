import { css } from "@emotion/react";
import { Theme } from "@mui/material";

import "normalize.css";

export const global = (theme: Theme) => css`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color: ${theme.palette.text.primary};
    background-color: ${theme.palette.secondary.light};

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    display: flex;
    min-height: 100vh;
  }

  #root {
    width: 100%;
  }

  ${theme.breakpoints.up("md")} {
    :root {
      background-color: ${theme.palette.secondary.main};
    }
  }
`;
