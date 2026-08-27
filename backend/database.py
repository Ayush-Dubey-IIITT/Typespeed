from sqlmodel import create_engine

DATABASE_URL="mysql+pymysql://root:B%40dt!mes69@localhost/typeSpeed"
engine=create_engine(DATABASE_URL)