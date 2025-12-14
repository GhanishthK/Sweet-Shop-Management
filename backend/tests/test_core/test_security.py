import pytest
from app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token,
    verify_token
)

class TestPasswordHashing:
    """Tests for password hashing functions"""
    
    def test_hash_password(self):
        """Test that password gets hashed"""
        password = "testpassword123"
        hashed = get_password_hash(password)
        
        # Password should be hashed (not equal to original)
        assert hashed != password
        # Hash should not be empty
        assert len(hashed) > 0
        # Hash should be different each time (bcrypt adds salt)
        hashed2 = get_password_hash(password)
        assert hashed != hashed2
    
    def test_verify_correct_password(self):
        """Test that correct password verification works"""
        password = "testpassword123"
        hashed = get_password_hash(password)
        
        # Correct password should verify
        assert verify_password(password, hashed) is True
    
    def test_verify_wrong_password(self):
        """Test that wrong password fails verification"""
        password = "testpassword123"
        wrong_password = "wrongpassword"
        hashed = get_password_hash(password)
        
        # Wrong password should not verify
        assert verify_password(wrong_password, hashed) is False

class TestJWTTokens:
    """Tests for JWT token functions"""
    
    def test_create_access_token(self):
        """Test that JWT token is created"""
        data = {"sub": "test@example.com"}
        token = create_access_token(data)
        
        # Token should not be empty
        assert token is not None
        assert isinstance(token, str)
        assert len(token) > 0
    
    def test_verify_valid_token(self):
        """Test that valid token can be decoded"""
        email = "test@example.com"
        token = create_access_token({"sub": email})
        
        # Decoding should return the email
        decoded_email = verify_token(token)
        assert decoded_email == email
    
    def test_verify_invalid_token(self):
        """Test that invalid token returns None"""
        invalid_token = "invalid.token.here"
        
        # Invalid token should return None
        result = verify_token(invalid_token)
        assert result is None
    
    def test_verify_expired_token(self):
        """Test that expired token returns None"""
        from datetime import timedelta
        
        # Create token that expires immediately
        email = "test@example.com"
        token = create_access_token({"sub": email}, expires_delta=timedelta(seconds=-1))
        
        # Expired token should return None
        result = verify_token(token)
        assert result is None