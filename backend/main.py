from fastapi import FastAPI
from database import engine
from model import User,UserInDB,UserCreate,UserResponse
from security import hash_password
from sqlmodel import SQLModel,Session
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

SQLModel.metadata.create_all(engine)
@app.post("/signup",response_model=UserResponse)
def signup(user:UserCreate):
    user_in_db=UserInDB(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password)
    )
    with Session(engine) as session:
        session.add(user_in_db)
        session.commit()
        session.refresh(user_in_db)

    return user_in_db