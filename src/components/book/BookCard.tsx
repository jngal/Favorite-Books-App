import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Book } from "../../store/slice/books.slice";
interface Props {
  book: Book;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}
const BookCard = ({ book, onSelect, onDelete }: Props) => {
  const { t } = useTranslation();
  const handleSelect = (id: string) => {
    onSelect(id);
  };

  const handleDelete = () => {
    onDelete(book.id);
  };

  return (
    <Box>
      <Card variant="outlined" className="book-card">
        <CardActionArea onClick={() => handleSelect(book.id)}>
          <CardContent>
            <Stack spacing={1.5}>
              {book.image ? (
                <Box
                  component="img"
                  src={book.image}
                  alt={book.title}
                  className="book-card__image"
                />
              ) : null}
              <Box className="book-card__header">
                <Typography variant="h6">{book.title}</Typography>
                {book.author ? (
                  <Box className="book-card__author">{book.author}</Box>
                ) : null}
              </Box>
              <Typography variant="body2" color="text.secondary">
                {book.description || t("book:noDescription")}
              </Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Button
              color="error"
              variant="contained"
              size="small"
              onClick={handleDelete}
            >
              {t("common:delete")}
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default BookCard;
