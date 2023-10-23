from pydantic import BaseModel, Field
from pydantic.generics import GenericModel


class CreateBook(BaseModel):
    title: str

    class Config:
        orm_mode = True

class BookDto(BaseModel):
    id: int
    title: str
    status: str

    class Config:
        orm_mode = True
