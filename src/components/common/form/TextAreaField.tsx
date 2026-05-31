import MuiTextField from "@mui/material/TextField";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any>;
  name: string;
  label: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  minRows?: number;
}

const TextAreaField = ({
  control,
  name,
  label,
  error,
  helperText,
  fullWidth,
  minRows,
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MuiTextField
          {...field}
          label={label}
          multiline
          minRows={minRows}
          fullWidth={fullWidth}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};

export default TextAreaField;
