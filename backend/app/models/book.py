from sqlalchemy import Column, Integer, String
from database import Base
from dataclasses import dataclass


@dataclass
class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    status = Column(String)
