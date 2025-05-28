import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react'; // Back icon

// Utility to combine Tailwind classes
const combineClasses = (...classes) => classes.filter(Boolean).join(' ');

// Glassmorphism input styles - UPDATED GLOBALLY
const glassInput = 'w-full h-14 p-[12px] px-[23px] rounded-lg border border-[#228B22] bg-[#F8F7F7] text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#A7F3D0]';
// Button styles (retained)
const buttonBase = 'flex justify-center items-center gap-[10px] self-stretch rounded-lg h-14 px-[10px] font-semibold transition-colors duration-200 bg-[#1C731C] text-white hover:bg-[#155A15]';

const ForgotPasswordPhoneNumber = ({ onSendOTP, onBack }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // --- Frontend Simulation of OTP Send (No AWS/Backend Calls) ---
        if (phoneNumber) {
            setTimeout(() => {
                setLoading(false);
                console.log(`OTP sent to ${phoneNumber} (simulated). Calling onSendOTP.`);
                onSendOTP(phoneNumber); // Navigate to OTP verification page, pass phone number
            }, 1000); // Simulate network delay
        } else {
            setLoading(false);
            setError('Please enter your phone number.');
            console.log("Phone number not entered.");
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center font-figtree leading-[1.2]">Forgot Password</h2>
            <p className="text-gray-900 text-lg text-center mb-4 font-open-sans leading-[1.5]">
                Enter your registered mobile number to receive an OTP.
            </p>
            <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                    <label htmlFor="phoneNumber" className="block text-gray-800 text-lg font-medium mb-2 leading-[1.5]">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        className={glassInput} // Uses updated glassInput
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        // Removed inline style for linear-gradient
                    />
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
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
            </form>
            <div className="mt-4 text-center">
                <button
                    onClick={onBack}
                    className="inline-block align-baseline text-lg font-poppins font-normal leading-[1.2] text-[#013220] hover:text-[#2E6B24] transition-colors" // Applied new styles
                >
                    <ArrowLeft className="w-5 h-5 mr-2 inline-block" /> Back to Login
                </button>
            </div>
        </motion.div>
    );
};

export default ForgotPasswordPhoneNumber;
