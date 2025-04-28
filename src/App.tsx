// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Exercises from './pages/Exercises';
import Workouts from './pages/Workouts';

// CSS
import './App.css';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/exercises" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/exercises" element={<Exercises />} />
                        <Route path="/workouts" element={<Workouts />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/exercises" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;