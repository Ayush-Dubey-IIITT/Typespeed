from fastapi import FastAPI,Depends,HTTPException,status
from database import engine,get_session
from model import User,UserInDB,UserCreate,UserResponse,UserLogin
from security import hash_password,verify_password
from sqlmodel import SQLModel,Session,select
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated

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
def signup(user:UserCreate,session:Annotated[Session,Depends(get_session)]):
    user_in_db=UserInDB(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password)
    )
    session.add(user_in_db)
    session.commit()
    session.refresh(user_in_db)

    return user_in_db

@app.post("/login")
def login(user:UserLogin,session:Annotated[Session,Depends(get_session)]):
    statement=select(UserInDB).where(
        UserInDB.email==user.email
    )
    db_user=session.exec(statement).first()
    if db_user is None:
        raise HTTPException(status_code=401,detail="Invalid email or password!")

    if not verify_password(user.password,db_user.hashed_password):
        raise HTTPException(status_code=401,detail="Invalid email or password!")
    return {"message":"Login successfull"}