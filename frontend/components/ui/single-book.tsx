import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "@/types/book";
import { Trash2 } from "lucide-react";

const SingleBook: React.FC<{
  book: Book;
  deleteBook: (book: Book) => Promise<void>;
  updateStatus: (book: Book, status: string) => Promise<void>;
}> = ({ book, deleteBook, updateStatus }) => {
  return (
    <Card className="w-[350px] mb-3">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <div>{book.title}</div>

            <Button variant="link">
              <Trash2 color="red" onClick={async () => deleteBook(book)} />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between">
        Move to{" "}
        <div>
          <div className="flex space-between gap-1">
            {book.status !== "to-read" && (
              <Button
                variant="outline"
                onClick={() => updateStatus(book, "to-read")}
              >
                To Read
              </Button>
            )}
            {book.status !== "in-progress" && (
              <Button
                variant="outline"
                onClick={() => updateStatus(book, "in-progress")}
              >
                In Progress
              </Button>
            )}
            {book.status !== "completed" && (
              <Button
                variant="outline"
                onClick={() => updateStatus(book, "completed")}
              >
                Completed
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SingleBook;
