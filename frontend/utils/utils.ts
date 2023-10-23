import { Book } from "@/types/book";

export const API_BASE_URL = "http://127.0.0.1:8000";

export const categorizeBooks: (books: Book[]) => {
  toReadBooks: Book[];
  inProgressBooks: Book[];
  completedBooks: Book[];
} = (books) => {
  let toReadBooks: Book[] = [];
  let inProgressBooks: Book[] = [];
  let completedBooks: Book[] = [];
  books.forEach((book) => {
    if (book.status === "to-read") {
      toReadBooks.push(book);
    } else if (book.status === "in-progress") {
      inProgressBooks.push(book);
    } else if (book.status === "completed") {
      completedBooks.push(book);
    }
  });
  return { toReadBooks, inProgressBooks, completedBooks };
};
