import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'; // For password visibility toggle and back icon

// Utility to combine Tailwind classes
const combineClasses = (...classes) => classes.filter(Boolean).join(' ');

// Glassmorphism input styles
const glassInput = 'w-full p-3 rounded-xl bg-white/20 border border-white/20 text-gray-900 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-[#A7F3D0] backdrop-blur-3xl';
// Button styles - UPDATED TO MATCH PROVIDED CONFIGURATION
const buttonBase = 'flex justify-center items-center gap-[10px] self-stretch rounded-lg h-14 px-[10px] font-semibold transition-colors duration-200 bg-[#1C731C] text-white hover:bg-[#155A15]'; // Updated background, border-radius, and layout


const ForgotPasswordNewPassword = ({ onPasswordChangeSuccess, onBack }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (newPassword !== confirmNewPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        // --- Frontend Simulation of Password Change (No AWS/Backend Calls) ---
        if (newPassword) {
            setTimeout(() => {
                setLoading(false);
                console.log('Password changed successfully! Please log in with your new password.');
                // You could add a small success message on the UI here if needed
                onPasswordChangeSuccess(); // Navigate back to login screen
            }, 1000); // Simulate network delay
        } else {
            setLoading(false);
            setError('New password cannot be empty.');
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center font-figtree leading-[1.2]">Set New Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                    <label htmlFor="newPassword" className="block text-gray-800 text-lg font-bold mb-2 leading-[1.5]">
                        New Password
                    </label>
                    <div className="relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            className={combineClasses(glassInput, "pr-10")}
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="confirmNewPassword" className="block text-gray-800 text-lg font-bold mb-2 leading-[1.5]">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmNewPassword ? "text" : "password"}
                            id="confirmNewPassword"
                            className={combineClasses(glassInput, "pr-10")}
                            placeholder="Confirm new password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            {showConfirmNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                <button
                    type="submit"
                    className={combineClasses(
                        buttonBase,
                        "w-full", // Ensure full width is maintained
                        "transition-all duration-300 transform hover:scale-105",
                        loading ? "opacity-70 cursor-not-allowed" : ""
                    )}
                    disabled={loading}
                >
                    {loading ? 'Changing Password...' : 'Change Password'}
                </button>
            </form>
            <div className="mt-4 text-center">
                <button
                    onClick={onBack}
                    className="inline-block align-baseline text-lg font-poppins font-normal leading-[1.2] text-[#013220] hover:text-[#2E6B24] transition-colors" // Applied new styles
                >
                    <ArrowLeft className="w-5 h-5 mr-2 inline-block" /> Back to OTP Verification
                </button>
            </div>
        </motion.div>
    );
};

export default ForgotPasswordNewPassword;
