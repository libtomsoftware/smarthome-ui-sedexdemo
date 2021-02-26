import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import React from "react";

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#26a69a",
      light: "#64d8cb",
      dark: "#00766c",
    },
    secondary: {
      main: "#ffca28",
      light: "#fffd61",
      dark: "#c79a00",
    },
    error: {
      main: "#f84e21",
      light: "#fba690",
      dark: "#7c2711",
    },
    gray: {
      main: "#748693",
      light: "#eee",
      dark: "#3a434a",
    },
    // background: {
    //   default: "#212121"
    // },
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      // Use the system font instead of the default Roboto font.
      "IsonormRegular",
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 16,
  },
  standard: {
    spacing: {
      none: 0,
      half: 6,
      regular: 12,
      double: 24,
    },
    width: {
      full: "100%",
    },
  },
});

export function Theme(props) {
  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
}
