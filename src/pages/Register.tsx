// src/pages/Register.tsx
import React, { useState, FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';

const Register: React.FC = () => {
  const [formState, setFormState] = useState({
    error: '',
    loading: false
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, error: '', loading: true }));

    // Use FormData to get form values
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    
    if (password !== confirmPassword) {
      setFormState(prev => ({ 
        ...prev, 
        error: 'Passwords do not match',
        loading: false
      }));
      return;
    }
    
    try {
      await register(username, email, password);
      navigate('/exercises');
    } catch (err) {
      setFormState(prev => ({ 
        ...prev, 
        error: 'Registration failed. Username or email might already be in use.',
        loading: false
      }));
    }
  }, [register, navigate]);

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        
        {formState.error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {formState.error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            type="text"
            name="username"
            required
            placeholder="Choose a username"
          />
          
          <Input
            label="Email"
            type="email"
            name="email"
            required
            placeholder="Enter your email"
          />
          
          <Input
            label="Password"
            type="password"
            name="password"
            required
            placeholder="Create a password"
          />
          
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm your password"
          />
          
          <Button
            type="submit"
            className="w-full"
            disabled={formState.loading}
          >
            {formState.loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;