#!/bin/bash

echo "🍬 Starting Sweet Shop Management System..."

# Backend setup
echo "📦 Setting up backend..."
cd backend

# Create venv if doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create database if doesn't exist
if [ ! -f "sweet_shop.db" ]; then
    echo "📊 Creating database..."
    python -c "from app.database import Base, engine; from app.models.user import User; from app.models.sweet import Sweet; Base.metadata.create_all(bind=engine); print('✅ Database created')"
fi

# Start backend in background
echo "🚀 Starting backend server..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

cd ..

# Frontend setup
echo "📦 Setting up frontend..."
cd frontend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    npm install
fi

# Start frontend
echo "🚀 Starting frontend server..."
npm run dev -- --host 0.0.0.0

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
