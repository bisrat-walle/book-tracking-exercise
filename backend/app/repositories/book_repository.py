from sqlalchemy.orm import Session
from models.book import Book
from typing import Iterable


class BookRepository:
    def __init__(self, db: Session):
        self.db = db

    def save(self, book: Book) -> Book:
        self.db.add(book)
        self.db.commit()
        self.db.refresh(book)
        return book

    def find_all(self, ) -> Iterable[Book]:
        return self.db.query(Book).all()

    def delete(self, id: int):
        self.db.query(Book).filter(Book.id == id).delete()
        self.db.commit()

    def update_status(self, id: int, status: str):
        self.db.query(Book).filter(Book.id == id).update({"status": status})
        self.db.commit()
        return self.db.query(Book).filter(Book.id == id).first()