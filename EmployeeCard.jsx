import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { Edit, Trash2, MapPin, AlertTriangle } from 'lucide-react'; // Import icons
import Button from '../../components/ui/button'; // Adjust path as needed
import L from 'leaflet'; // Import Leaflet for distance calculation

// Utility to combine Tailwind classes
const combineClasses = (...classes) => classes.filter(Boolean).join(' ');

// Framer Motion variants
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const EmployeeCard = ({ employee, onEdit, onDelete, onFocusMap, officeLocations, onViewAttendance }) => {
    const glassmorphism = 'bg-white/20 backdrop-blur-md rounded-xl border border-white/10 shadow-lg'; // Define locally for self-containment

    // Find the assigned office for the employee
    const assignedOffice = officeLocations.find(office => office.id === employee.officeId);

    // Determine if the employee is outside their geofence
    const isOutsideGeofence = assignedOffice && employee.lat && employee.lng &&
        L.latLng(employee.lat, employee.lng).distanceTo(L.latLng(assignedOffice.lat, assignedOffice.lng)) > 500; // 500 meters radius

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={combineClasses(
                glassmorphism,
                'p-3 flex flex-col gap-2 cursor-pointer hover:bg-white/30 transition-colors duration-200' // Added cursor and hover effect
            )}
            onClick={() => onViewAttendance(employee)} // Make the entire card clickable for attendance
        >
            <div className="flex items-center gap-4">
                <img src={employee.image} alt={employee.name} className="w-10 h-10 rounded-full" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/cccccc/000000?text=NA" }} />
                <div>
                    <Typography variant="body1" className="text-white font-medium">
                        {employee.name}
                    </Typography>
                    <Typography variant="body2" className="text-gray-300">
                        {employee.role}
                    </Typography>
                </div>
            </div>
            <div className="flex flex-col gap-1 text-gray-300 text-sm">
                <Typography variant="body2">Lat: {employee.lat?.toFixed(4)}, Lng: {employee.lng?.toFixed(4)}</Typography>
                <Typography variant="body2">Office: {assignedOffice ? assignedOffice.name : 'N/A'}</Typography>
                {isOutsideGeofence && (
                    <Typography variant="body2" className="text-red-400 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" /> Outside Geofence!
                    </Typography>
                )}
            </div>
            <div className="ml-auto flex gap-2 self-end">
                <Button onClick={(e) => { e.stopPropagation(); onEdit(employee); }} className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 p-1 rounded-full">
                    <Edit className="w-4 h-4" />
                </Button>
                <Button onClick={(e) => { e.stopPropagation(); onDelete(employee.id); }} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 p-1 rounded-full">
                    <Trash2 className="w-4 h-4" />
                </Button>
                {employee.lat && employee.lng && (
                    <Button onClick={(e) => { e.stopPropagation(); onFocusMap(employee); }} className="bg-green-500/20 text-green-400 hover:bg-green-500/30 p-1 rounded-full">
                        <MapPin className="w-4 h-4" />
                    </Button>
                )}
            </div>
        </motion.div>
    );
};

export default EmployeeCard;
