import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Login from './login';
import ForgotPasswordPhoneNumber from './ForgotPasswordPhoneNumber'; // New import
import ForgotPasswordOTP from './ForgotPasswordNewPassword';
import ForgotPasswordNewPassword from './ForgotPasswordOTP';

// Utility to combine Tailwind classes
const combineClasses = (...classes) => classes.filter(Boolean).join(' ');

// Glassmorphism background styles
const glassBg = 'bg-white/10 backdrop-blur-2xl rounded-xl border border-white/10 shadow-lg';


const Authorization = ({ onAuthSuccess }) => {
    // State to manage which authentication view is currently active
    const [currentView, setCurrentView] = useState('login'); // 'login', 'forgot-phone', 'forgot-otp', 'forgot-new-password'
    const [phoneNumberForOTP, setPhoneNumberForOTP] = useState(''); // To pass phone number for OTP screen

    // Log state changes for debugging
    useEffect(() => {
        console.log("Current Auth View:", currentView);
    }, [currentView]);

    // Load Google Fonts dynamically
    useEffect(() => {
        const link1 = document.createElement('link');
        link1.href = 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700&display=swap';
        link1.rel = 'stylesheet';
        document.head.appendChild(link1);

        const link2 = document.createElement('link');
        link2.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap';
        link2.rel = 'stylesheet';
        document.head.appendChild(link2);

        // Apply default font to body
        document.body.style.fontFamily = "'Figtree', sans-serif"; // Default to Figtree

        return () => {
            document.head.removeChild(link1);
            document.head.removeChild(link2);
            document.body.style.fontFamily = ''; // Clean up
        };
    }, []);

    // Render the appropriate component based on currentView state
    const renderAuthView = () => {
        switch (currentView) {
            case 'login':
                return (
                    <Login
                        onLoginSuccess={onAuthSuccess}
                        onNavigateToForgotPassword={() => { // Changed to navigate to phone number input
                            console.log("Navigating to forgot-phone from Login.");
                            setCurrentView('forgot-phone');
                        }}
                    />
                );
            case 'forgot-phone': // New case for phone number input
                return (
                    <ForgotPasswordPhoneNumber
                        onSendOTP={(phone) => {
                            console.log("Phone number submitted. Navigating to forgot-otp. Phone:", phone);
                            setPhoneNumberForOTP(phone);
                            setCurrentView('forgot-otp');
                        }}
                        onBack={() => {
                            console.log("Navigating back to login from forgot-phone.");
                            setCurrentView('login');
                        }}
                    />
                );
            case 'forgot-otp':
                return (
                    <ForgotPasswordOTP
                        phoneNumber={phoneNumberForOTP}
                        onVerifyOTP={() => {
                            console.log("OTP Verified. Navigating to forgot-new-password.");
                            setCurrentView('forgot-new-password');
                        }}
                        onBack={() => {
                            console.log("Navigating back to forgot-phone from forgot-otp."); // Back to phone number input
                            setCurrentView('forgot-phone');
                        }}
                    />
                );
            case 'forgot-new-password':
                return (
                    <ForgotPasswordNewPassword
                        onPasswordChangeSuccess={() => {
                            console.log("Password changed. Navigating back to login.");
                            setCurrentView('login');
                        }}
                        onBack={() => {
                            console.log("Navigating back to forgot-otp from forgot-new-password.");
                            setCurrentView('forgot-otp');
                        }}
                    />
                );
            default:
                return (
                    <Login
                        onLoginSuccess={onAuthSuccess}
                        onNavigateToForgotPassword={() => setCurrentView('forgot-phone')}
                    />
                );
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col md:flex-row items-center justify-center p-4 font-figtree relative overflow-hidden"
            style={{ background: 'radial-gradient(50% 50% at 50% 50%, #BBF246 0%, #6C8C28 100%)' }}
        >
            {/* Abstract 3D shapes in the background */}
            <motion.div
                className="absolute inset-0 z-0 opacity-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 1.5 }}
            >
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full mix-blend-overlay" />
                <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-green-300 rounded-full mix-blend-overlay" />
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500 rounded-full mix-blend-overlay" />
                <div className="absolute top-1/4 right-1/2 w-40 h-40 bg-green-700 rounded-full mix-blend-overlay" />

                {/* Larger geometric shapes (simplified for CSS) */}
                <div className="absolute top-10 left-10 w-40 h-40 border-4 border-green-400 rounded-lg transform rotate-45 opacity-50" />
                <div className="absolute bottom-20 right-20 w-32 h-32 border-4 border-white rounded-full transform rotate-12 opacity-50" />
                <div className="absolute top-1/3 right-10 w-24 h-24 border-4 border-green-200 rounded-md transform -rotate-30 opacity-50" />
            </motion.div>

            {/* Left side content for Login/Forgot Password */}
            <motion.div
                className="relative z-10 text-center md:text-left text-white md:w-1/2 p-8"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1 className="text-5xl font-bold mb-4 font-figtree leading-[1.2]">
                    Welcome to <span className="text-[#A7F3D0]">Innoworx.ai</span>
                </h1>
                <p className="text-lg text-gray-200 font-open-sans leading-[1.5]">
                    Smart, seamless attendance tracking for your workforce
                </p>
            </motion.div>

            {/* Authentication forms container */}
            <motion.div
                className={combineClasses(
                    'relative z-20',
                    'flex items-center flex-shrink-0',
                    'rounded-xl backdrop-blur-3xl',
                    'gap-[10px]'
                )}
                style={{
                    width: '559px',
                    height: '642px',
                    padding: '100px 69px',
                    background: 'linear-gradient(151deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.00)'
                }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {renderAuthView()}
            </motion.div>
        </div>
    );
};

export default Authorization;
