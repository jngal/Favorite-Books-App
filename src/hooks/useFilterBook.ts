import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";
import { Book } from "../store/slice/books.slice";

export type SortOrder = "newest" | "oldest";

export function useFilterBook(items: Book[]) {
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const filteredBooks = useMemo(() => {
    const normalizedFilter = filter.trim().toLowerCase();

    const nextBooks = !normalizedFilter
      ? items
      : items.filter((book) =>
          book.title.toLowerCase().includes(normalizedFilter),
        );

    return [...nextBooks].sort((left, right) => {
      const leftTime = new Date(left.createdAt).getTime();
      const rightTime = new Date(right.createdAt).getTime();

      return sortOrder === "newest"
        ? rightTime - leftTime
        : leftTime - rightTime;
    });
  }, [filter, items, sortOrder]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleSetOrder = (event: ChangeEvent<HTMLInputElement>) => {
    setSortOrder(event.target.value as SortOrder);
  };

  return {
    filter,
    sortOrder,
    filteredBooks,
    handleOnChange,
    handleSetOrder,
  };
}
