import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFilterBook } from "../../hooks/useFilterBook";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useSelectedBook } from "../../hooks/useSelectedBook";
import { Book, deleteBook, getListBook } from "../../store/slice/books.slice";
import BookCard from "./BookCard";
import BookDetail from "./BookDetail";

const BookList = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const books = useAppSelector(getListBook);
  const { filter, sortOrder, filteredBooks, handleOnChange, handleSetOrder } =
    useFilterBook(books);
  const { selectedBook, setSelectedBookId, clearSelectedBook } =
    useSelectedBook();

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
                label={t("book:booksCount", { count: books.length })}
                color="primary"
                variant="outlined"
              />
            </Box>
            <Box className="book-filters">
              <TextField
                label={t("book:filterByTitle")}
                value={filter}
                onChange={handleOnChange}
                fullWidth
              />
              <TextField
                select
                label={t("book:sortBy")}
                value={sortOrder}
                onChange={handleSetOrder}
                className="book-sort"
              >
                <MenuItem value="newest">{t("sortNewest")}</MenuItem>
                <MenuItem value="oldest">{t("sortOldest")}</MenuItem>
              </TextField>
            </Box>
            {filteredBooks.length === 0 ? (
              <Alert severity="info">
                {books.length === 0
                  ? t("book:noBooks")
                  : t("book:noFilterMatch")}
              </Alert>
            ) : (
              <Box className="book-list-grid">
                {filteredBooks.map((book: Book) => (
                  <Box key={book.id}>
                    <BookCard
                      book={book}
                      onSelect={setSelectedBookId}
                      onDelete={(id) => dispatch(deleteBook(id))}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
      <BookDetail book={selectedBook} onClose={clearSelectedBook} />
    </>
  );
};

export default BookList;
