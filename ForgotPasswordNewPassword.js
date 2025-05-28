import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react'; // Back icon

// Utility to combine Tailwind classes
const combineClasses = (...classes) => classes.filter(Boolean).join(' ');

// Glassmorphism input styles (retained, but OTP will use specific new style)
const glassInput = 'w-full h-14 p-[12px] px-[23px] rounded-lg border border-[#228B22] bg-[#F8F7F7] text-gray-900 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-[#A7F3D0]';
// Button styles (retained)
const buttonBase = 'flex justify-center items-center gap-[10px] self-stretch rounded-lg h-14 px-[10px] font-semibold transition-colors duration-200 bg-[#1C731C] text-white hover:bg-[#155A15]';

const ForgotPasswordOTP = ({ phoneNumber, onVerifyOTP, onBack }) => {
    const OTP_LENGTH = 4;
    const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        console.log("ForgotPasswordOTP component mounted.");
        let timer;
        if (resendTimer > 0 && !canResend) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        } else if (resendTimer === 0) {
            setCanResend(true);
        }
        return () => clearTimeout(timer);
    }, [resendTimer, canResend]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.value !== '' && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const fullOtp = otp.join('');

        if (fullOtp.length === OTP_LENGTH && fullOtp === '1234') {
            setTimeout(() => {
                setLoading(false);
                console.log("OTP verified successfully (simulated). Calling onVerifyOTP.");
                onVerifyOTP();
            }, 1000);
        } else {
            setLoading(false);
            setError(`Invalid OTP. Please try again.`);
            console.log("Invalid OTP entered (simulated).");
        }
    };

    const handleResendOTP = async () => {
        setError('');
        setOtp(new Array(OTP_LENGTH).fill(''));
        setResendTimer(60);
        setCanResend(false);
        console.log("Resending OTP (simulated)...");
    };

    const displayPhoneNumber = phoneNumber ?
        `+91 ${phoneNumber.substring(0, 4)}****` :
        'your mobile number';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center font-figtree leading-[1.2]">Verify OTP</h2>
            <p className="text-gray-900 text-lg text-center mb-4 font-open-sans leading-[1.5]">
                Enter the {OTP_LENGTH}-digit code sent to {displayPhoneNumber}.
            </p>
            <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                    <label htmlFor="otp" className="block text-gray-900 text-lg font-bold mb-2 leading-[1.5]">
                        Verification Code
                    </label>
                    <div className="flex justify-center space-x-2">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                                onKeyDown={e => handleKeyDown(e, index)}
                                ref={el => inputRefs.current[index] = el}
                                className={combineClasses(
                                    'w-14 h-14 text-center text-2xl font-bold',
                                    'rounded-lg border border-[#228B22] bg-[#F8F7F7]',
                                    'text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A7F3D0]'
                                )}
                                required
                            />
                        ))}
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
                    {loading ? 'Verifying...' : 'Verify Code'}
                </button>
            </form>
            <div className="mt-4 text-center">
                {canResend ? (
                    <button
                        onClick={handleResendOTP}
                        className="font-bold text-[#A7F3D0] hover:text-[#2E6B24] transition-colors font-open-sans leading-[1.5]"
                    >
                        Resend Code
                    </button>
                ) : (
                    <p className="text-gray-700 text-lg font-open-sans leading-[1.5]">Resend code in {resendTimer}s</p>
                )}
            </div>
            <div className="mt-4 text-center">
                <button
                    onClick={onBack}
                    className="inline-block align-baseline text-lg font-poppins font-normal leading-[1.2] text-[#013220] hover:text-[#2E6B24] transition-colors" // Applied new styles
                >
                    <ArrowLeft className="w-5 h-5 mr-2 inline-block" /> Back to Enter Phone Number
                </button>
            </div>
        </motion.div>
    );
};

export default ForgotPasswordOTP;
