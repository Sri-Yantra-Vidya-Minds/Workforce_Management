// src/components/Dashboard/CurrentStatsCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Truck } from 'lucide-react';
import { Typography } from '@mui/material'; // Assuming Material UI is installed
import { cn } from '../../lib/utils'; // Adjust path as needed
import { mockCurrentStats } from './mockData'; // Import mock data
import Button from '../../components/ui/button'; // Import your custom Button

// Glassmorphism Styles (re-defined or imported from a central theme file)
const glassmorphism = 'bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-lg';
const greenTheme = 'text-green-400';

// Framer Motion variants
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CurrentStatsCard = () => (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" className={cn(glassmorphism, 'p-4 flex flex-col items-center justify-center')}>
        <h2 className="text-lg font-semibold text-white mb-2">Current Stats</h2>
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
                <Users className={cn('w-6 h-6 mb-1', greenTheme)} />
                <Typography variant="body1" className="text-white">
                    Currently Assigned
                </Typography>
                <Typography variant="h5" className={cn('font-bold', greenTheme)}>
                    {mockCurrentStats.assigned}
                </Typography>
            </div>
            <div className="flex flex-col items-center">
                <MapPin className={cn('w-6 h-6 mb-1', greenTheme)} />
                <Typography variant="body1" className="text-white">
                    Sites
                </Typography>
                <Typography variant="h5" className={cn('font-bold', greenTheme)}>
                    {mockCurrentStats.sites}
                </Typography>
            </div>
        </div>
        <Button className="mt-4 w-full bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300">
            <Truck className="mr-2 w-4 h-4" />
            Track Live Rides
        </Button>
    </motion.div>
);

export default CurrentStatsCard;
