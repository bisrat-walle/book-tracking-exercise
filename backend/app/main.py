from fastapi import FastAPI
from models.book import Base
from database import engine
from routers.book_router import book_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Book Tracking Exercise", version="1.0.0")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(book_router)
