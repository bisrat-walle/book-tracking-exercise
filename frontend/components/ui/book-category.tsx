import * as React from "react";

import { Button } from "@/components/ui/button";
import SingleBook from "./single-book";
import { Book } from "@/types/book";

const BookCategory: React.FC<{
  title: string;
  books: Book[];
  deleteBook: (book: Book) => Promise<void>;
  updateStatus: (book: Book, status: string) => Promise<void>;
}> = ({ title, books, deleteBook, updateStatus }) => {
  return (
    <div className="grid columns-1 col-gap-1">
      <h3 className="text-3xl text-center font-semibold my-2">{title}</h3>
      {books.map((book) => (
        <SingleBook
          book={book}
          key={book.id}
          deleteBook={deleteBook}
          updateStatus={updateStatus}
        />
      ))}
      {books.length === 0 && (
        <div className="text-center text-gray-500">
          No book under this category
        </div>
      )}
    </div>
  );
};

export default BookCategory;
