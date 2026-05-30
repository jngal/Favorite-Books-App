import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "../../hooks/useRedux";
import { useReduxForm } from "../../hooks/useReduxForm";
import { createBook } from "../../store/slice/books.slice";

export const DEFAULT_BOOK_VALUES = {
  title: "",
  author: "",
  description: "",
  image: "",
};

export const bookFormSchema = yup
  .object({
    title: yup.string().trim().required("Title is required."),
    author: yup.string().trim(),
    description: yup
      .string()
      .max(300, "Short description can be at most 300 characters."),
    image: yup
      .string()
      .trim()
      .url("Enter a valid image URL.")
      .nullable()
      .transform((value) => (value ? value : "")),
  })
  .required();

export type BookFormValues = yup.InferType<typeof bookFormSchema>;

const BookForm = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, submitCount },
  } = useReduxForm({
    mode: "onBlur",
    schema: bookFormSchema,
    defaultValues: DEFAULT_BOOK_VALUES,
  });

  const descriptionValue = watch("description") || "";

  const onSubmit = async (data: BookFormValues) => {
    dispatch(
      createBook({
        id: nanoid(),
        title: data.title.trim(),
        author: data.author.trim(),
        description: data.description.trim(),
        image: data.image.trim(),
      }),
    );

    reset(DEFAULT_BOOK_VALUES);
  };

  return (
    <Card className="panel-card panel-card--form">
      <CardContent>
        <Stack spacing={3}>
          <Box>
            <Typography variant="overline" className="section-label">
              Add a Book
            </Typography>
            <Typography variant="h4" className="section-title">
              Add Favorite Book
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2.5}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    required
                    fullWidth
                    error={Boolean(errors.title)}
                    helperText={
                      typeof errors.title?.message === "string"
                        ? errors.title.message
                        : "Required field"
                    }
                  />
                )}
              />

              <Controller
                name="author"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Author" fullWidth />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    multiline
                    minRows={4}
                    fullWidth
                    error={Boolean(errors.description)}
                    helperText={
                      typeof errors.description?.message === "string"
                        ? errors.description.message
                        : `${descriptionValue.length}/300 characters`
                    }
                  />
                )}
              />

              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Image"
                    placeholder="https://..."
                    fullWidth
                    error={Boolean(errors.image)}
                    helperText={
                      typeof errors.image?.message === "string"
                        ? errors.image.message
                        : "Optional: enter an image URL"
                    }
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                className="submit-button"
              >
                Upload
              </Button>

              {submitCount > 0 && Object.keys(errors).length > 0 ? (
                <Alert severity="warning">
                  The form contains invalid or missing values.
                </Alert>
              ) : null}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BookForm;
