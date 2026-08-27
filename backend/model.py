from sqlmodel import SQLModel,Field
from pydantic import EmailStr
from security import hash_password

class User(SQLModel):
    username:str
    email:EmailStr

class UserInDB(User):
    id:str=Field(default=None,primary_key=True)
    password:str