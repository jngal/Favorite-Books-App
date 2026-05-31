import { Box, Button, FormHelperText, Stack } from "@mui/material";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { isBase64Image } from "../../helpers/file.helpers";

interface Props {
  imageValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedFileName: string;
}

const ImageFileInput = ({ imageValue, onChange, selectedFileName }: Props) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={1}>
      <Button component="label" variant="outlined">
        {t("common:chooseFile")}
        <input type="file" accept="image/*" hidden onChange={onChange} />
      </Button>
      <FormHelperText>
        {selectedFileName
          ? t("common:selectedFile", { name: selectedFileName })
          : t("common:imageUploadHelper")}
      </FormHelperText>
      {imageValue && isBase64Image(imageValue) ? (
        <Box
          component="img"
          src={imageValue}
          alt={t("common:imagePreviewAlt")}
          className="book-detail-image"
        />
      ) : null}
    </Stack>
  );
};

export default ImageFileInput;
