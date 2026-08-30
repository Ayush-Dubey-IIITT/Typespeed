from fastapi import FastAPI,Depends,HTTPException,status
from fastapi.security import OAuth2PasswordBearer
from database import engine,get_session
from model import User,UserInDB,UserCreate,UserResponse,UserLogin,HistoryResponse,TestHistory,HistoryCreate
from security import hash_password,verify_password
from sqlmodel import SQLModel,Session,select
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
import os
from dotenv import load_dotenv
import jwt
from datetime import datetime,timedelta,timezone

load_dotenv()
SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM="HS256"
oauth2_scheme=OAuth2PasswordBearer(tokenUrl="login")

app=FastAPI()

def create_access_token(user_id:int):
    expire=datetime.now(timezone.utc)+timedelta(minutes=30)
    payload={
        "sub":str(user_id),
        "exp":expire
    }
    return jwt.encode(payload,SECRET_KEY,algorithm=ALGORITHM)

def get_current_user(
        token:Annotated[str,Depends(oauth2_scheme)],
        session:Annotated[Session,Depends(get_session)]
):
    try:
        payload=jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        user_id=payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )
        user_id=int(user_id)
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user=session.get(UserInDB,int(user_id))
    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )  
    return user

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://typespeed-omega.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
SQLModel.metadata.create_all(engine)
@app.post("/signup",response_model=UserResponse)
def signup(user:UserCreate,session:Annotated[Session,Depends(get_session)]):
    statement=select(UserInDB).where(
        (UserInDB.email==user.email)|
        (UserInDB.username==user.username)
    )
    userdb=session.exec(statement).first()
    if userdb:
        raise HTTPException(
            status_code=400,
            detail="Username or email already exists!",
        )
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
    token=create_access_token(db_user.id)
    return {
        "access_token":token,
        "token_type":"bearer"
    }

@app.get("/users/me",response_model=UserResponse)
def get_me(
    current_user:Annotated[UserInDB,Depends(get_current_user)]
):
    return current_user

@app.post("/history/")
async def store_history(
    user:Annotated[UserInDB,Depends(get_me)],
    test:HistoryCreate,
    session:Annotated[Session,Depends(get_session)]
):
    user_id=user.id
    if user_id is None:
        raise HTTPException(status_code=401,detail="User not found!")
    test_hist=HistoryCreate(
        user_id=user_id,
        wpm=test.wpm,
        accuracy=test.accuracy,
        char=test.char,
        date_time=test.date_time
    )
    session.add(test_hist)
    session.commit()
    session.refresh(test_hist)

    return test_hist

