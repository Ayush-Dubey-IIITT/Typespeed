from sqlmodel import SQLModel,Field
from pydantic import EmailStr

class User(SQLModel):
    username:str=Field(unique=True)
    email:EmailStr=Field(unique=True)

class UserCreate(User):
    password:str

class UserInDB(User,table=True):
    id:int=Field(default=None,primary_key=True)
    hashed_password:str

class UserResponse(User):
    id:int

class UserLogin(SQLModel):
    email:EmailStr
    password:str