import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./App.css";
import BookForm from "./components/book/BookForm";
import BookList from "./components/book/BookList";

function App() {
  const { t, i18n } = useTranslation(["common", "book"]);

  return (
    <Box className="app-shell">
      <Container maxWidth="xl">
        <Stack spacing={3} className="page-heading">
          <Box className="hero-header">
            <Typography variant="h2" className="hero-title">
              {t("common:appTitle")}
            </Typography>
            <Box className="language-switch">
              <Typography variant="body2">{t("common:language")}</Typography>
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
