import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react'; // Icons for password visibility

// Utility to combine Tailwind classes
const combineClasses = (...classes) => classes.filter(Boolean).join(' ');

// Glassmorphism input styles
const glassInput = 'w-full p-3 rounded-xl border border-transparent text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#A7F3D0] backdrop-blur-3xl';
// Button styles
const buttonBase = 'flex justify-center items-center gap-[10px] self-stretch rounded-lg h-14 px-[10px] font-semibold transition-colors duration-200 bg-[#1C731C] text-white hover:bg-[#155A15]';

const Login = ({ onLoginSuccess, onNavigateToForgotPassword }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // --- Frontend Simulation of Login (No AWS/Backend Calls) ---
        if (email && password) {
            setTimeout(() => {
                setLoading(false);
                onLoginSuccess(); // Trigger success callback to switch to HomePage
            }, 1000); // Simulate network delay
        } else {
            setLoading(false);
            setError('Please enter both email and password.');
        }
        // --- End Simulation ---
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center font-figtree leading-[1.2]">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-gray-800 text-lg font-medium mb-2 leading-[1.5]">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={glassInput}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ background: 'linear-gradient(151deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%)' }}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-800 text-lg font-medium mb-2 leading-[1.5]">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className={combineClasses(glassInput, "pr-10")}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ background: 'linear-gradient(151deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%)' }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                <button
                    type="submit"
                    className={combineClasses(
                        buttonBase,
                        "w-full",
                        "transition-all duration-300 transform hover:scale-105",
                        loading ? "opacity-70 cursor-not-allowed" : ""
                    )}
                    disabled={loading}
                >
                    {loading ? 'Logging In...' : 'Log In'}
                </button>
            </form>
            <div className="mt-6 text-center">
                <button
                    type="button"
                    onClick={onNavigateToForgotPassword} // Directly call the prop
                    className="inline-block align-baseline text-lg font-poppins font-normal leading-[1.2] text-[#013220] hover:text-[#2E6B24] transition-colors"
                >
                    Forgot Password?
                </button>
            </div>
        </motion.div>
    );
};

export default Login;
