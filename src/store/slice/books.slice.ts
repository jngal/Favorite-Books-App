import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mockedBooks from "../mockedData/books.json";
import { AppState } from "../store";

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
};

type BooksState = {
  data: Book[];
};

const initialState: BooksState = {
  data: mockedBooks as Book[],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    createBook: (state: BooksState, action: PayloadAction<Book>) => {
      state.data = [...state.data, action.payload];
    },
    deleteBook(state, action: PayloadAction<string>) {
      state.data = state.data.filter((book) => book.id !== action.payload);
    },
  },
});

export const getListBook = (state: AppState) => {
  return state.books.data;
};

export const getBook = (state: AppState, bookId: string | null) => {
  return state.books.data.find((book) => book.id === bookId) || null;
};

export const { createBook, deleteBook } = booksSlice.actions;

export default booksSlice.reducer;
