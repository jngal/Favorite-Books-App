import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slice/books.slice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
