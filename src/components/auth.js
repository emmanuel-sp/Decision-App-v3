import React, { createContext, useContext, useState } from 'react';
import { login, register } from '../api';
import { useNavigate } from 'react-router-dom';

const isLoggedIn = createContext(true);

function LoginButton() {
    const loggedIn = useContext(isLoggedIn);

    return (
        <div className="login">
            <button>Login</button>
        </div>
    )
}

function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await login(username, password);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            setError('');
            // Redirect or update UI
            navigate('/');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
    );
}

function RegisterComponent() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await register(username, email, password);
            setError('');
            // Redirect or update ui
            navigate('/login');
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
}

export { LoginButton, RegisterComponent, LoginComponent, isLoggedIn };

