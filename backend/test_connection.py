import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

# Load environment variables
load_dotenv()

# Get database credentials
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_SERVER = os.getenv("POSTGRES_SERVER")
POSTGRES_DB = os.getenv("POSTGRES_DB")

# Create connection string
DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}/{POSTGRES_DB}"

print(f"Attempting to connect to: postgresql://{POSTGRES_USER}:***@{POSTGRES_SERVER}/{POSTGRES_DB}")

try:
    # Create engine and connect
    engine = create_engine(DATABASE_URL)
    with engine.connect() as connection:
        # Test query
        result = connection.execute(text("SELECT version();"))
        version = result.fetchone()[0]
        print("\n✅ SUCCESS! Connected to PostgreSQL")
        print(f"📊 Database: {POSTGRES_DB}")
        print(f"🖥️  Version: {version[:50]}...")
except Exception as e:
    print(f"\n❌ ERROR: Could not connect to database")
    print(f"Error message: {e}")