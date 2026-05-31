import Brightness7Icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import BookForm from "./components/book/BookForm";
import BookList from "./components/book/BookList";
import { ThemeMode } from "./styles/theme";

interface Props {
  themeMode: ThemeMode;
  setThemeMode: Dispatch<SetStateAction<ThemeMode>>;
}

function App({ themeMode, setThemeMode }: Props) {
  const { t, i18n } = useTranslation();

  return (
    <Box className="app-shell" data-theme={themeMode}>
      <Container maxWidth="xl">
        <Stack spacing={3} className="page-heading">
          <Box className="hero-header">
            <Typography variant="h2" className="hero-title">
              {t("appTitle")}
            </Typography>
            <Box className="toolbar-group">
              <Box className="toolbar-actions">
                <Box className="theme-switch">
                  <IconButton
                    aria-label={t("toggleTheme")}
                    className="theme-toggle"
                    onClick={() =>
                      setThemeMode((currentTheme) =>
                        currentTheme === "light" ? "dark" : "light",
                      )
                    }
                  >
                    {themeMode === "light" ? (
                      <DarkModeIcon />
                    ) : (
                      <Brightness7Icon />
                    )}
                  </IconButton>
                </Box>
                <Box className="language-switch">
                  <Button
                    variant={i18n.language === "en" ? "contained" : "outlined"}
                    size="small"
                    onClick={() => void i18n.changeLanguage("en")}
                  >
                    EN
                  </Button>
                  <Button
                    variant={i18n.language === "sk" ? "contained" : "outlined"}
                    size="small"
                    onClick={() => void i18n.changeLanguage("sk")}
                  >
                    SK
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Stack>

        <Box className="content-grid">
          <Box>
            <BookForm />
          </Box>
          <Box>
            <BookList />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
