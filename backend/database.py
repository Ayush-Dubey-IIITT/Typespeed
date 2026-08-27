import os
from dotenv import load_dotenv
from sqlmodel import create_engine,Session

load_dotenv()

DATABASE_URL=os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise RuntimeError("DATABASE_URL is not set")   
engine=create_engine(DATABASE_URL)

def get_session():
    with Session(engine) as session:
        yield session