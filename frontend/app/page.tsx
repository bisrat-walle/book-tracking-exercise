"use client";

import BookCategory from "@/components/ui/book-category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book } from "@/types/book";
import { API_BASE_URL, categorizeBooks } from "@/utils/utils";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/books/`);
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadBooks();
  }, []);

  const addBook = async () => {
    if (!title) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/books`, {
        method: "POST",
        body: JSON.stringify({ title }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 201) {
        const newBook: Book = await res.json();
        setBooks([...books, newBook]);
        setTitle("");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const deleteBook = async (book: Book) => {
    try {
      const res = await fetch(`${API_BASE_URL}/books/${book.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 204) {
        setBooks(books.filter((b) => b.id !== book.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (book: Book, status: string) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/books/${book.id}?status=${status}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        const updateBook = await res.json();
        setBooks(books.map((b) => (b.id !== book.id ? b : updateBook)));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { toReadBooks, inProgressBooks, completedBooks } =
    categorizeBooks(books);

  const titleCategoryMapping: Map<string, Book[]> = new Map([
    ["To Read", toReadBooks],
    ["In Progress", inProgressBooks],
    ["Completed", completedBooks],
  ]);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-4 text-4xl font-bold">Book Tracking Exercise</h1>
      <div className="flex justify-center gap-2 my-3">
        <Input
          value={title}
          disabled={loading}
          placeholder="please enter book title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={addBook}>Add</Button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {Array.from(titleCategoryMapping.keys()).map((key) => (
          <div className="columns-1" key={key}>
            <BookCategory
              title={key}
              books={titleCategoryMapping.get(key) as Book[]}
              deleteBook={deleteBook}
              updateStatus={updateStatus}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
