// src/components/Dashboard/AbsentShiftCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material'; // Assuming Material UI is installed
import { cn } from '../../lib/utils'; // Adjust path as needed

// Framer Motion variants
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AbsentShiftCard = ({ shift }) => (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" className={cn('bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-lg', 'p-4 mb-4')}>
        <Typography variant="body1" className="text-white">
            <span className="font-medium">Date:</span> {shift.date}
        </Typography>
        <Typography variant="body1" className="text-white">
            <span className="font-medium">Time:</span> {shift.time}
        </Typography>
        <Typography variant="body1" className="text-white">
            <span className="font-medium">Site:</span> {shift.site}
        </Typography>
    </motion.div>
);

export default AbsentShiftCard;
