import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Sparkles, ShoppingBag, Heart, Star } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          .login-container {
            animation: fadeInUp 0.8s ease-out;
          }
          .feature-card {
            animation: slideInRight 0.8s ease-out;
          }
          .floating-icon {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          opacity: 0.1,
        }}>
          <Sparkles size={100} color="white" className="floating-icon" />
        </div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          opacity: 0.1,
          animationDelay: '1s',
        }}>
          <ShoppingBag size={120} color="white" className="floating-icon" />
        </div>
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          opacity: 0.1,
          animationDelay: '2s',
        }}>
          <Heart size={80} color="white" className="floating-icon" />
        </div>

        {/* Left Side - Branding */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px',
            color: 'white',
          }}
        >
          <div className="feature-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <Sparkles size={48} />
              <h1 style={{
                fontSize: '48px',
                fontWeight: 'bold',
                margin: 0,
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              }}>
                Shudh Sweets
              </h1>
            </div>

            <h2 style={{
              fontSize: '32px',
              fontWeight: '600',
              marginBottom: '24px',
              lineHeight: '1.3',
            }}>
              Experience Authentic <br />
              <span style={{
                background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 3s linear infinite',
              }}>
                Delicious Sweets
              </span>
            </h2>

            <p style={{
              fontSize: '18px',
              marginBottom: '40px',
              lineHeight: '1.6',
              opacity: 0.95,
            }}>
              Browse through our vast collection of traditional and modern sweets.
              Manage your orders, track inventory, and enjoy a seamless shopping experience.
            </p>

            {/* Features List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { icon: '🍬', text: 'Wide variety of traditional & premium sweets' },
                { icon: '🛒', text: 'Easy cart & checkout system' },
                { icon: '📦', text: 'Real-time inventory tracking' },
                { icon: '⚡', text: 'Fast & secure transactions' },
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    animationDelay: `${index * 0.2}s`,
                  }}
                  className="feature-card"
                >
                  <span style={{ fontSize: '28px' }}>{feature.icon}</span>
                  <span style={{ fontSize: '16px', fontWeight: '500' }}>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <div
            className="login-container"
            style={{
              width: '100%',
              maxWidth: '480px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              padding: '48px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            {/* Logo and Title */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                }}
              >
                <Sparkles size={40} color="white" />
              </div>
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '8px',
                }}
              >
                Welcome Back!
              </h2>
              <p style={{ color: '#6b7280', fontSize: '16px' }}>
                Login to continue shopping
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <Input
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  padding: '14px',
                  fontSize: '16px',
                  borderRadius: '12px',
                  border: '2px solid #e5e7eb',
                }}
              />
              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  padding: '14px',
                  fontSize: '16px',
                  borderRadius: '12px',
                  border: '2px solid #e5e7eb',
                }}
              />

              {error && (
                <div
                  style={{
                    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                    border: '2px solid #fca5a5',
                    color: '#dc2626',
                    padding: '16px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    fontWeight: '500',
                  }}
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span className="pulse">Logging in...</span>
                  </span>
                ) : (
                  'Login'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0', gap: '16px' }}>
              <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
              <span style={{ color: '#9ca3af', fontSize: '14px' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
            </div>

            {/* Register Link */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#6b7280', marginBottom: '12px' }}>
                Don't have an account?
              </p>
              <a
                href="/register"
                style={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Create Account <Star size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
