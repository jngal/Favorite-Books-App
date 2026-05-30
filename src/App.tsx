import { Box, Container, Stack, Typography } from "@mui/material";
import "./App.css";
import BookForm from "./components/book/BookForm";
import BookList from "./components/book/BookList";

function App() {
  return (
    <Box className="app-shell">
      <Container maxWidth="xl">
        <Stack spacing={3} className="page-heading">
          <Box>
            <Typography variant="h2" className="hero-title">
              Favorite Books App
            </Typography>
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
