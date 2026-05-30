import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Book } from "../../store/slice/books.slice";
interface Props {
  book: Book;
  onClose: () => void;
}
const BookDetail = ({ book, onClose }: Props) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={Boolean(book)} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Book Details</DialogTitle>
      <DialogContent dividers>
        {book ? (
          <Stack spacing={2}>
            {book.image ? (
              <Box
                component="img"
                src={book.image}
                alt={book.title}
                className="book-detail-image"
              />
            ) : null}
            <Box>
              <Typography variant="h5">{book.title}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {book.author || "Author missing"}
              </Typography>
            </Box>
            <Divider />
            <Typography variant="body1">
              {book.description || "This book has no description."}
            </Typography>
          </Stack>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default BookDetail;
