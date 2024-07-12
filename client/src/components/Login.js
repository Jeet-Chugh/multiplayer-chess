import React, { useState, useContext } from 'react';
import { login } from '../services/api';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      authLogin(response.data.token)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <form className="bg-gray-900 p-8 rounded-lg shadow-lg text-white w-full max-w-sm" onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="/forgot-password" className="text-sm text-gray-400 hover:underline">
            Forgot Password?
          </a>
        </div>
        <button type="submit" className="w-full py-2 bg-green-500 hover:bg-green-600 rounded text-white font-semibold">
          Log In
        </button>
        <div className="mt-4 text-center text-gray-400 text-sm">
          New? <a href="/register" className="text-green-500 hover:underline">Create Account</a> - and start playing chess!
        </div>
      </form>
    </div>
  );
};

export default Login;