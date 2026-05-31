import MuiTextField from "@mui/material/TextField";
import { ChangeEvent } from "react";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any>;
  name: string;
  label: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TextField = ({
  control,
  name,
  label,
  error,
  helperText,
  required,
  fullWidth,
  placeholder,
  onChange,
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MuiTextField
          {...field}
          label={label}
          required={required}
          fullWidth={fullWidth}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          onChange={(event) => {
            field.onChange(event);
            onChange?.(event);
          }}
        />
      )}
    />
  );
};

export default TextField;
