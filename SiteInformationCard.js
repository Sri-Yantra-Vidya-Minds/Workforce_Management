// src/components/Dashboard/SiteInformationCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users, ListChecks } from 'lucide-react';
import { Typography } from '@mui/material'; // Assuming Material UI is installed
import { cn } from '../../lib/utils'; // Adjust path as needed
import { mockSiteInfo } from './mockData'; // Import mock data
import Button from '../../components/ui/button'; // Import your custom Button

// Glassmorphism Styles (re-defined or imported from a central theme file)
const glassmorphism = 'bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-lg';
const greenTheme = 'text-green-400';

// Framer Motion variants
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SiteInformationCard = () => (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" className={cn(glassmorphism, 'p-4')}>
        <h2 className="text-lg font-semibold text-white mb-4">Site Information</h2>
        <div className="space-y-2">
            <Typography variant="body1" className="text-gray-300">
                <span className="font-medium text-white">Name:</span> {mockSiteInfo.name}
            </Typography>
            <Typography variant="body1" className="text-gray-300">
                <span className="font-medium text-white">ID:</span> {mockSiteInfo.id}
            </Typography>
            <Typography variant="body1" className="text-gray-300">
                <span className="font-medium text-white">Address:</span> {mockSiteInfo.address}
            </Typography>
        </div>
        <div className="mt-6">
            <Typography variant="h6" className="text-white mb-2">
                Employees assigned to the present shift
            </Typography>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                    <Users className={cn('w-5 h-5 mb-1', greenTheme)} />
                    <Typography variant="body2" className="text-white">
                        Supervisors
                    </Typography>
                    <Typography variant="h5" className={cn('font-bold', greenTheme)}>
                        {mockSiteInfo.supervisors}
                    </Typography>
                </div>
                <div className="flex flex-col items-center">
                    <Users className={cn('w-5 h-5 mb-1', greenTheme)} />
                    <Typography variant="body2" className="text-white">
                        Employees
                    </Typography>
                    <Typography variant="h5" className={cn('font-bold', greenTheme)}>
                        {mockSiteInfo.employees}
                    </Typography>
                </div>
            </div>
        </div>
        <Button className="mt-6 w-full bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300">
            <ListChecks className="mr-2 w-4 h-4" />
            Modify Site Schedule
        </Button>
    </motion.div>
);

export default SiteInformationCard;