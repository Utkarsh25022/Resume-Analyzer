import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function AuthForm({ onSuccess, showClose }) {
  const { login, signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      className="relative bg-white p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-center text-indigo-600">
        {mode === 'login' ? 'Login to continue' : 'Create an account'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          {mode === 'login' ? 'Login' : 'Sign up'}
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        {mode === 'login' ? "Don't have an account?" : 'Already have one?'}{' '}
        <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-indigo-600 underline">
          {mode === 'login' ? 'Sign up' : 'Login'}
        </button>
      </p>
      {showClose && (
        <button
          onClick={onSuccess}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
        >
          ✖
        </button>
      )}
    </motion.div>
  );
}
