// src/components/Dashboard/LiveRideCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertTriangle, CheckCircle, Battery } from 'lucide-react';
import { Typography } from '@mui/material'; // Assuming Material UI is installed
import { cn } from '../../lib/utils'; // Adjust path as needed

// Framer Motion variants
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const LiveRideCard = ({ ride }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'in progress':
                return 'text-green-400';
            case 'not started':
                return 'text-yellow-400';
            case 'completed':
                return 'text-blue-400';
            default:
                return 'text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'in progress':
                return <Zap className="w-4 h-4" />;
            case 'not started':
                return <AlertTriangle className="w-4 h-4" />;
            case 'completed':
                return <CheckCircle className="w-4 h-4" />;
            default:
                return null;
        }
    };

    return (
        <motion.div variants={cardVariants} initial="hidden" animate="visible" className={cn('bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-lg', 'p-4 mb-4')}>
            <Typography variant="h6" className="text-white flex items-center gap-2">
                Ride: <span className={getStatusColor(ride.status)}>{getStatusIcon(ride.status)} Ride {ride.id.slice(-4)}</span>
            </Typography>
            <Typography variant="body1" className="text-gray-300">
                <span className="font-medium text-white">Vehicle:</span> {ride.vehicle}
            </Typography>
            <Typography variant="body1" className="text-gray-300">
                <span className="font-medium text-white">Driver:</span> {ride.driver}
            </Typography>
            <Typography variant="body1" className="text-gray-300">
                <span className="font-medium text-white">Destination:</span> {ride.destination}
            </Typography>
            <Typography variant="body1" className="text-gray-300">
                <span className="font-medium text-white">Material:</span> {ride.material}
            </Typography>
            <Typography variant="body1" className="text-gray-300">
                <span className="font-medium text-white">Speed:</span> {ride.speed !== null ? `${ride.speed} km/h` : 'N/A'}
            </Typography>
            <Typography variant="body1" className="text-gray-300 flex items-center gap-1">
                <span className="font-medium text-white">Battery:</span>
                {ride.battery !== null ? (
                    <>
                        {ride.battery < 20 && <Battery className="w-4 h-4 text-red-500" />}
                        {ride.battery >= 20 && ride.battery < 50 && <Battery className="w-4 h-4 text-orange-500" />}
                        {ride.battery >= 50 && <Battery className="w-4 h-4 text-green-500" />}
                        {ride.battery}%
                    </>
                ) : (
                    'N/A'
                )}
            </Typography>
        </motion.div>
    );
};

export default LiveRideCard;
