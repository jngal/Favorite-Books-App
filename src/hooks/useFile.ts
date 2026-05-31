import { ChangeEvent, useState } from "react";

type UseFileOptions = {
  onLoad: (value: string) => void;
};

export function useFile({ onLoad }: UseFileOptions) {
  const [selectedFileName, setSelectedFileName] = useState("");

  const resetFile = () => {
    setSelectedFileName("");
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";

      onLoad(result);
      setSelectedFileName(file.name);
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return {
    selectedFileName,
    handleFileChange,
    resetFile,
  };
}
