import React, { useState, useContext } from 'react';
import { register, login } from '../services/api';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(username, password, email);
    } catch (error) {
      setError(error.response.data);
    }
    try {
      const response = await login(username, password);
      if (response.data.accessToken && response.data.refreshToken) {
        authLogin(response.data.accessToken, response.data.refreshToken, false);
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed', error);
      navigate('/login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <form className="bg-gray-900 p-8 rounded-lg shadow-lg text-white w-full max-w-sm" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-green-500 hover:bg-green-600 rounded text-white font-semibold">
          Register
        </button>
        <div className="mt-4 text-center text-gray-400 text-sm">
          Already registered? <a href="/login" className="text-green-500 hover:underline">Log In</a> - and start playing!
        </div>
      </form>
    </div>
  );
};

export default Register;
