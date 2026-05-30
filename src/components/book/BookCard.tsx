import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Book } from "../../store/slice/books.slice";
interface Props {
  book: Book;
  onSelect: (id: string) => void;
}
const BookCard = ({ book, onSelect }: Props) => {
  const handleSelect = (id: string) => {
    onSelect(id);
  };
  return (
    <Box key={book.id}>
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
                {book.description || "No description"}
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default BookCard;
