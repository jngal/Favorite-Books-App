import { createTheme } from "@mui/material/styles";

export type ThemeMode = "light" | "dark";

export const getTheme = (mode: ThemeMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#8b522a" : "#f0ab6d",
      },
      secondary: {
        main: mode === "light" ? "#3d6b5d" : "#8db7aa",
      },
      background: {
        default: mode === "light" ? "#f8f1e7" : "#12110f",
        paper: mode === "light" ? "#fffdf9" : "#24201c",
      },
      text: {
        primary: mode === "light" ? "#21150d" : "#f4ede4",
        secondary: mode === "light" ? "#5d4737" : "#d1c2b2",
      },
      divider:
        mode === "light"
          ? "rgba(93, 71, 55, 0.12)"
          : "rgba(244, 237, 228, 0.12)",
    },
    shape: {
      borderRadius: 18,
    },
    typography: {
      fontFamily:
        '"Avenir Next", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      h2: {
        fontWeight: 800,
      },
      h4: {
        fontWeight: 700,
      },
    },
  });
