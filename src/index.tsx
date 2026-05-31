import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./i18n";
import { store } from "./store/store";
import "./styles/style.scss";
import { getTheme, ThemeMode } from "./styles/theme";

const Root = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const theme = useMemo(() => getTheme(themeMode), [themeMode]);

  useEffect(() => {
    document.body.setAttribute("data-theme", themeMode);

    return () => {
      document.body.removeAttribute("data-theme");
    };
  }, [themeMode]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App themeMode={themeMode} setThemeMode={setThemeMode} />
      </ThemeProvider>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
