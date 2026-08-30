from sqlmodel import SQLModel,Field
from pydantic import EmailStr
from datetime import datetime,timezone

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

class TestHistory(SQLModel,table=True):
    id:int=Field(default=None,primary_key=True)
    wpm:float
    accuracy:float
    char:int
    date_time: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc))

    user_id:int=Field(foreign_key="userindb.id")
class HistoryCreate(TestHistory):
    pass
class HistoryResponse(TestHistory):
    pass