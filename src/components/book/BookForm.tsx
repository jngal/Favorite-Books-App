import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { isBase64Image } from "../../helpers/file.helpers";
import { isURL } from "../../helpers/url.heleprs";
import { useFile } from "../../hooks/useFile";
import { useAppDispatch } from "../../hooks/useRedux";
import { useReduxForm } from "../../hooks/useReduxForm";
import { createBook } from "../../store/slice/books.slice";
import ImageFileInput from "../common/ImageFileInput";
import TextAreaField from "../common/form/TextAreaField";
import TextField from "../common/form/TextField";

const DEFAULT_BOOK_VALUES = {
  title: "",
  author: "",
  description: "",
  image: "",
};

type BookFormValues = typeof DEFAULT_BOOK_VALUES;

const BookForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const bookFormSchema = useMemo(
    () =>
      yup
        .object({
          title: yup.string().trim().required(t("common:titleRequired")),
          author: yup.string().trim(),
          description: yup.string().max(300, t("common:descriptionMax")),
          image: yup
            .string()
            .trim()
            .test(
              "image-url-or-base64",
              t("common:imageInvalid"),
              (value) => !value || isURL(value) || isBase64Image(value),
            )
            .nullable()
            .transform((value) => (value ? value : "")),
        })
        .required(),
    [t],
  );

  const {
    control,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, submitCount },
  } = useReduxForm({
    mode: "onBlur",
    schema: bookFormSchema,
    defaultValues: DEFAULT_BOOK_VALUES,
  });

  const descriptionValue = watch("description") || "";
  const imageValue = watch("image") || "";
  const { selectedFileName, handleFileChange, resetFile } = useFile({
    onLoad: (result) => {
      setValue("image", result, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
  });

  const onSubmit = async (data: BookFormValues) => {
    dispatch(
      createBook({
        id: nanoid(),
        title: data.title.trim(),
        author: data.author.trim(),
        description: data.description.trim(),
        image: data.image.trim(),
        createdAt: new Date().toISOString(),
      }),
    );

    reset(DEFAULT_BOOK_VALUES);
    resetFile();
  };

  return (
    <Card className="panel-card panel-card--form">
      <CardContent>
        <Stack spacing={3}>
          <Box>
            <Typography variant="overline" className="section-label">
              {t("book:addBookLabel")}
            </Typography>
            <Typography variant="h4" className="section-title">
              {t("book:addBookTitle")}
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2.5}>
              <TextField
                name="title"
                control={control}
                label={t("common:title")}
                required
                fullWidth
                error={Boolean(errors.title)}
                helperText={
                  typeof errors.title?.message === "string"
                    ? errors.title.message
                    : t("common:requiredField")
                }
              />
              <TextField
                name="author"
                control={control}
                label={t("common:author")}
                fullWidth
              />
              <TextAreaField
                name="description"
                control={control}
                label={t("common:description")}
                minRows={4}
                fullWidth
                error={Boolean(errors.description)}
                helperText={
                  typeof errors.description?.message === "string"
                    ? errors.description.message
                    : t("common:descriptionCounter", {
                        count: descriptionValue.length,
                      })
                }
              />
              <TextField
                name="image"
                control={control}
                label={t("common:image")}
                placeholder="https://..."
                fullWidth
                onChange={() => {
                  if (selectedFileName) {
                    resetFile();
                  }
                }}
                error={Boolean(errors.image)}
                helperText={
                  typeof errors.image?.message === "string"
                    ? errors.image.message
                    : t("common:imageOptional")
                }
              />
              <ImageFileInput
                imageValue={imageValue}
                onChange={handleFileChange}
                selectedFileName={selectedFileName}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                className="submit-button"
              >
                {t("common:upload")}
              </Button>
              {submitCount > 0 && Object.keys(errors).length > 0 ? (
                <Alert severity="warning">{t("common:formInvalid")}</Alert>
              ) : null}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BookForm;
