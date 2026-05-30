import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import { Book, getBook, getListBook } from "../../store/slice/books.slice";
import BookCard from "./BookCard";
import BookDetail from "./BookDetail";

const BookList = () => {
  const items = useAppSelector(getListBook);
  const [filter, setFilter] = useState("");
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const filteredBooks = useMemo(() => {
    const normalizedFilter = filter.trim().toLowerCase();

    if (!normalizedFilter) {
      return items;
    }

    return items.filter((book: Book) =>
      book.title.toLowerCase().includes(normalizedFilter),
    );
  }, [filter, items]);

  const selectedBook = useAppSelector((state) =>
    getBook(state, selectedBookId),
  );

  return (
    <>
      <Card className="panel-card panel-card--list">
        <CardContent>
          <Stack spacing={3}>
            <Box className="list-header">
              <Box>
                <Typography variant="overline" className="section-label">
                  Book Collection
                </Typography>
                <Typography variant="h4" className="section-title">
                  Book List
                </Typography>
              </Box>
              <Chip
                label={`${items.length} books`}
                color="primary"
                variant="outlined"
              />
            </Box>

            <TextField
              label="Filter by title"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              fullWidth
            />

            {filteredBooks.length === 0 ? (
              <Alert severity="info">
                {items.length === 0
                  ? "No books have been added yet."
                  : "No books match the current filter."}
              </Alert>
            ) : (
              <Box className="book-list-grid">
                {filteredBooks.map((book: Book) => (
                  <BookCard book={book} onSelect={setSelectedBookId} />
                ))}
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
      <BookDetail book={selectedBook} onClose={() => setSelectedBookId(null)} />
    </>
  );
};

export default BookList;
