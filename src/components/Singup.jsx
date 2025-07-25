import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email required';
    if (formData.password.length < 6) errs.password = 'Min 6 characters';
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find((u) => u.email === formData.email);
    if (exists) {
      setErrors({ email: 'Email already registered' });
      return;
    }

    const newUser = { ...formData, todos: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <div
              onClick={() => setShowPass(!showPass)}
              className="absolute top-2.5 right-3 cursor-pointer"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
            Signup
          </button>

          <p className="text-sm text-center mt-2">
            Already have an account?{' '}
            <Link to="/" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
