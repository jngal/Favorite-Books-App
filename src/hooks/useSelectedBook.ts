import { useState } from "react";
import { useAppSelector } from "./useRedux";
import { getBook } from "../store/slice/books.slice";

export function useSelectedBook() {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const selectedBook = useAppSelector((state) =>
    getBook(state, selectedBookId),
  );

  const clearSelectedBook = () => {
    setSelectedBookId(null);
  };

  return {
    selectedBookId,
    selectedBook,
    setSelectedBookId,
    clearSelectedBook,
  };
}
