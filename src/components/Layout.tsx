// src/components/Layout.tsx
import React, { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Button from './Button';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Fitness Tracker</h1>
                    {user ? (
                        <nav className="flex items-center space-x-4">
                            <Link to="/exercises" className="hover:text-blue-400">Exercises</Link>
                            <Link to="/workouts" className="hover:text-blue-400">Workouts</Link>
                            <Button onClick={handleLogout} variant="secondary">Logout</Button>
                        </nav>
                    ) : (
                        <nav className="flex items-center space-x-4">
                            <Link to="/login" className="hover:text-blue-400">Login</Link>
                            <Link to="/register" className="hover:text-blue-400">Register</Link>
                        </nav>
                    )}
                </div>
            </header>
            <main className="container mx-auto p-4">
                {children}
            </main>
        </div>
    );
};

export default Layout;