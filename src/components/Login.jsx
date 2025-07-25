import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('token', user.email);
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/home-todo');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              onClick={() => setShowPass(!showPass)}
              className="absolute top-2.5 right-3 cursor-pointer"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Login
          </button>
          <p className="text-sm text-center mt-2">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
