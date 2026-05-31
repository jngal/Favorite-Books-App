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
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/useRedux";
import { Book, getBook, getListBook } from "../../store/slice/books.slice";
import BookCard from "./BookCard";
import BookDetail from "./BookDetail";

const BookList = () => {
  const { t } = useTranslation();
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
                  {t("book:bookCollection")}
                </Typography>
                <Typography variant="h4" className="section-title">
                  {t("book:bookList")}
                </Typography>
              </Box>
              <Chip
                label={t("book:booksCount", { count: items.length })}
                color="primary"
                variant="outlined"
              />
            </Box>

            <TextField
              label={t("book:filterByTitle")}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              fullWidth
            />

            {filteredBooks.length === 0 ? (
              <Alert severity="info">
                {items.length === 0
                  ? t("book:noBooks")
                  : t("book:noFilterMatch")}
              </Alert>
            ) : (
              <Box className="book-list-grid">
                {filteredBooks.map((book: Book) => (
                  <Box key={book.id}>
                    <BookCard book={book} onSelect={setSelectedBookId} />
                  </Box>
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
