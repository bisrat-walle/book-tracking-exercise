from fastapi import APIRouter, Path, Depends, status
from sqlalchemy.orm import Session
from schemas.schema import CreateBook, BookDto
from repositories.book_repository import BookRepository
from database import get_db
from models.book import Book

book_router = APIRouter(prefix="/books")


@book_router.post("/", response_model=BookDto, status_code=status.HTTP_201_CREATED)
async def create_book(request: CreateBook, db: Session = Depends(get_db)):
    book = Book(title=request.title, status="to-read")
    book_repository = BookRepository(db)
    book_repository.save(book)
    return book


@book_router.get("/", response_model=list[BookDto], status_code=status.HTTP_200_OK)
async def get_books(db: Session = Depends(get_db)):
    book_repository = BookRepository(db)
    books = book_repository.find_all()
    return books


@book_router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_book(id: int = Path(..., gt=0), db: Session = Depends(get_db)):
    book_repository = BookRepository(db)
    book_repository.delete(id)


@book_router.put("/{id}", response_model=BookDto, status_code=status.HTTP_200_OK)
async def update_status(
    id: int = Path(..., gt=0), status: str = "", db: Session = Depends(get_db)
):
    book_repository = BookRepository(db)
    book = book_repository.update_status(id, status)
    return book
