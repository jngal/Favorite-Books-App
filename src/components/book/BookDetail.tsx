import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Book } from "../../store/slice/books.slice";
interface Props {
  book: Book | null;
  onClose: () => void;
}
const BookDetail = ({ book, onClose }: Props) => {
  const { t } = useTranslation();
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={Boolean(book)} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle className="book-detail-title">
        <Box component="span">{t("book:bookDetails")}</Box>
        <IconButton
          aria-label={t("common:close")}
          onClick={handleClose}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
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
                {book.author || t("book:authorMissing")}
              </Typography>
            </Box>
            <Divider />
            <Typography variant="body1">
              {book.description || t("book:detailNoDescription")}
            </Typography>
          </Stack>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default BookDetail;
