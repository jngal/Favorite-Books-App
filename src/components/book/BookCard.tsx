import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Book } from "../../store/slice/books.slice";
interface Props {
  book: Book;
  onSelect: (id: string) => void;
}
const BookCard = ({ book, onSelect }: Props) => {
  const { t } = useTranslation();
  const handleSelect = (id: string) => {
    onSelect(id);
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
                {book.author ? <Chip size="small" label={book.author} /> : null}
              </Box>
              <Typography variant="body2" color="text.secondary">
                {book.description || t("book:noDescription")}
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default BookCard;
