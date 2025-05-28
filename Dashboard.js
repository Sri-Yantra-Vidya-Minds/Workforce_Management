import React, { useState, useRef } from 'react';

import { motion } from 'framer-motion';
import {
    MapPin,
    Users,
    CheckCircle,
    XCircle,
    Search,
    ListChecks,
    Truck,
    Battery,
    Zap,
    AlertTriangle,
    ArrowRightCircle,
    ArrowLeftCircle,
    Edit, // Added for edit functionality
    Trash2, // Added for delete functionality
    PlusCircle // Added for add functionality
} from 'lucide-react';

// Assuming these are your custom UI components from your project
import Button from '../../components/ui/button';
import Input from '../../components/ui/input';
import { Typography } from '@mui/material'; // Assuming Material UI is installed
import MapComponent from './MapComponent'; // Import the Leaflet MapComponent

// Styles and utilities (from your provided code)
const glassmorphism = 'bg-white/20 backdrop-blur-md rounded-xl border border-white/10 shadow-lg'; // Changed from bg-white/10 to bg-white/20 for darker appearance
const greenTheme = 'text-green-400';
const combineClasses = (...classes) => classes.filter(Boolean).join(' ');
const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

// Mock data (now managed by state for modifiability)
// Initial mock data
const initialMockCurrentStats = { assigned: '0/0', sites: 32 };
const initialMockSiteInfo = { id: '637ae5bb-d145-4c0f-94cf-9980431deb1f', name: 'New Check Road', address: 'Some Address, Some City', supervisors: 0, employees: 2 };
const initialMockEmployees = [
    { id: '1', name: 'Ema', role: 'Guard', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '2', name: 'Guard Man 1', role: 'Guard', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
];
const initialMockAbsentShifts = [
    { id: 'absent1', date: '2025-03-31', time: '4:00 PM - 12:00 AM', site: 'smr vinay fountain' },
    { id: 'absent2', date: '2025-04-02', time: '4:00 PM - 12:00 AM', site: 'pune' },
];
const initialMockLiveRides = [
    { id: 'ride1', status: 'in progress', vehicle: 'Top Power TRK', driver: 'Driver 2', destination: 'Matrix Hospital Mehdipatnam', material: 'Cement', speed: 0.35, battery: 86 },
    { id: 'ride2', status: 'not started', vehicle: 'TEST MODEL', driver: 'Pro Driver - 2', destination: 'Warehouse mill 3', material: 'Cement', speed: null, battery: null },
];
const initialMockOfficeLocations = [
    { id: 'office1', name: 'Hyderabad HQ', address: 'Hyderabad, India', lat: 17.4475, lng: 78.3731, numGuards: 5 },
    { id: 'office2', name: 'Mumbai Branch', address: 'Mumbai, India', lat: 19.0760, lng: 72.8777, numGuards: 8 },
];
const initialMockGuardLocations = [
    { id: 'guard1', name: 'Guard A', lat: 17.4480, lng: 78.3740, officeId: 'office1' },
    { id: 'guard2', name: 'Guard B', lat: 19.0770, lng: 72.8780, officeId: 'office2' },
];


// Sub-Components

// Modal for adding/editing offices
const OfficeModal = ({ isOpen, onClose, office, onSave }) => {
    const [name, setName] = useState(office ? office.name : '');
    const [address, setAddress] = useState(office ? office.address : '');
    const [lat, setLat] = useState(office ? office.lat : '');
    const [lng, setLng] = useState(office ? office.lng : '');
    const [numGuards, setNumGuards] = useState(office ? office.numGuards : 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...office,
            name,
            address,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            numGuards: parseInt(numGuards),
            id: office ? office.id : Date.now().toString()
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className={combineClasses(glassmorphism, 'p-6 w-full max-w-md text-white space-y-4')}
            >
                <h2 className="text-2xl font-bold text-green-400">{office ? 'Edit Office' : 'Add New Office'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="officeName" className="block text-gray-300 text-sm font-medium mb-1">Name</label>
                        <Input
                            id="officeName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="officeAddress" className="block text-gray-300 text-sm font-medium mb-1">Address</label>
                        <Input
                            id="officeAddress"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="officeLat" className="block text-gray-300 text-sm font-medium mb-1">Latitude</label>
                        <Input
                            id="officeLat"
                            type="number"
                            step="any"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="officeLng" className="block text-gray-300 text-sm font-medium mb-1">Longitude</label>
                        <Input
                            id="officeLng"
                            type="number"
                            step="any"
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="officeNumGuards" className="block text-gray-300 text-sm font-medium mb-1">Number of Guards</label>
                        <Input
                            id="officeNumGuards"
                            type="number"
                            value={numGuards}
                            onChange={(e) => setNumGuards(e.target.value)}
                            className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button type="button" onClick={onClose} className="bg-gray-500/20 text-gray-300 hover:bg-gray-500/30">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                            Save
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};


// Modal for adding/editing employees
const EmployeeModal = ({ isOpen, onClose, employee, onSave }) => {
    const [name, setName] = useState(employee ? employee.name : '');
    const [role, setRole] = useState(employee ? employee.role : '');
    const [image, setImage] = useState(employee ? employee.image : 'https://randomuser.me/api/portraits/men/99.jpg'); // Default image

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...employee, name, role, image, id: employee ? employee.id : Date.now().toString() });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className={combineClasses(glassmorphism, 'p-6 w-full max-w-md text-white space-y-4')}
            >
                <h2 className="text-2xl font-bold text-green-400">{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="employeeName" className="block text-gray-300 text-sm font-medium mb-1">Name</label>
                        <Input
                            id="employeeName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="employeeRole" className="block text-gray-300 text-sm font-medium mb-1">Role</label>
                        <Input
                            id="employeeRole"
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="employeeImage" className="block text-gray-300 text-sm font-medium mb-1">Image URL (Optional)</label>
                        <Input
                            id="employeeImage"
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button type="button" onClick={onClose} className="bg-gray-500/20 text-gray-300 hover:bg-gray-500/30">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                            Save
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

// Modal for adding/editing absent shifts
const AbsentShiftModal = ({ isOpen, onClose, shift, onSave }) => {
    const [date, setDate] = useState(shift ? shift.date : '');
    const [time, setTime] = useState(shift ? shift.time : '');
    const [site, setSite] = useState(shift ? shift.site : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...shift, date, time, site, id: shift ? shift.id : Date.now().toString() });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className={combineClasses(glassmorphism, 'p-6 w-full max-w-md text-white space-y-4')}
            >
                <h2 className="text-2xl font-bold text-green-400">{shift ? 'Edit Absent Shift' : 'Add New Absent Shift'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="shiftDate" className="block text-gray-300 text-sm font-medium mb-1">Date</label>
                        <Input
                            id="shiftDate"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="shiftTime" className="block text-gray-300 text-sm font-medium mb-1">Time (e.g., 4:00 PM - 12:00 AM)</label>
                        <Input
                            id="shiftTime"
                            type="text"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="shiftSite" className="block text-gray-300 text-sm font-medium mb-1">Site</label>
                        <Input
                            id="shiftSite"
                            type="text"
                            value={site}
                            onChange={(e) => setSite(e.target.value)}
                            className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button type="button" onClick={onClose} className="bg-gray-500/20 text-gray-300 hover:bg-gray-500/30">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                            Save
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};


const CurrentStatsCard = ({ currentStats, onEdit }) => (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" className={combineClasses(glassmorphism, 'p-4 flex flex-col items-center justify-center')}>
        <h2 className="text-lg font-semibold text-white mb-2">Current Stats</h2>
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
                <Users className={combineClasses('w-6 h-6 mb-1', greenTheme)} />
                <Typography variant="body1" className="text-white">
                    Currently Assigned
                </Typography>
                <Typography variant="h5" className={combineClasses('font-bold', greenTheme)}>
                    {currentStats.assigned}
                </Typography>
            </div>
            <div className="flex flex-col items-center">
                <MapPin className={combineClasses('w-6 h-6 mb-1', greenTheme)} />
                <Typography variant="body1" className="text-white">
                    Sites
                </Typography>
                <Typography variant="h5" className={combineClasses('font-bold', greenTheme)}>
                    {currentStats.sites}
                </Typography>
            </div>
        </div>
        <Button onClick={onEdit} className="mt-4 w-full bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300">
            <Edit className="mr-2 w-4 h-4" />
            Edit Stats
        </Button>
        <Button className="mt-2 w-full bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300">
            <Truck className="mr-2 w-4 h-4" />
            Track Live Rides
        </Button>
    </motion.div>
);

const SiteInformationCard = ({ siteInfo, onEdit, selectedOffice, onFocusMap }) => (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" className={combineClasses(glassmorphism, 'p-4')}>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Site Information</h2>
            <Button onClick={onEdit} size="small" className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                <Edit className="w-4 h-4" />
            </Button>
        </div>
        <div className="space-y-2">
            <Typography variant="body1" className="text-gray-300">
                <span className="font-medium text-white">Name:</span> {siteInfo.name}
            </Typography>
            <Typography variant="body1" className="text-gray-300">
                <span className="font-medium text-white">ID:</span> {siteInfo.id}
            </Typography>
            <Typography variant="body1" className="text-gray-300">
                <span className="font-medium text-white">Address:</span> {siteInfo.address}
            </Typography>
        </div>
        <div className="mt-6">
            <Typography variant="h6" className="text-white mb-2">
                Employees assigned to the present shift
            </Typography>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                    <Users className={combineClasses('w-5 h-5 mb-1', greenTheme)} />
                    <Typography variant="body2" className="text-white">
                        Supervisors
                    </Typography>
                    <Typography variant="h5" className={combineClasses('font-bold', greenTheme)}>
                        {siteInfo.supervisors}
                    </Typography>
                </div>
                <div className="flex flex-col items-center">
                    <Users className={combineClasses('w-5 h-5 mb-1', greenTheme)} />
                    <Typography variant="body2" className="text-white">
                        Employees
                    </Typography>
                    <Typography variant="h5" className={combineClasses('font-bold', greenTheme)}>
                        {siteInfo.employees}
                    </Typography>
                </div>
            </div>
        </div>
        <Button className="mt-6 w-full bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300">
            <ListChecks className="mr-2 w-4 h-4" />
            Modify Site Schedule
        </Button>
        {selectedOffice && (
            <Button
                className="mt-4 w-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300"
                onClick={() => onFocusMap(selectedOffice)}
            >
                <MapPin className="mr-2 w-4 h-4" />
                Focus on Map
            </Button>
        )}
    </motion.div>
);

const EmployeeCard = ({ employee, onEdit, onDelete }) => (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" className={combineClasses(glassmorphism, 'p-3 flex items-center gap-4')}>
        <img src={employee.image} alt={employee.name} className="w-10 h-10 rounded-full" />
        <div>
            <Typography variant="body1" className="text-white font-medium">
                {employee.name}
            </Typography>
            <Typography variant="body2" className="text-gray-300">
                {employee.role}
            </Typography>
        </div>
        <div className="ml-auto flex gap-2">
            <Button onClick={() => onEdit(employee)} className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 p-1 rounded-full">
                <Edit className="w-4 h-4" />
            </Button>
            <Button onClick={() => onDelete(employee.id)} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 p-1 rounded-full">
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    </motion.div>
);

const AbsentShiftCard = ({ shift, onEdit, onDelete }) => (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" className={combineClasses(glassmorphism, 'p-4 mb-4')}>
        <div className="flex justify-between items-center mb-2">
            <div>
                <Typography variant="body1" className="text-white">
                    <span className="font-medium">Date:</span> {shift.date}
                </Typography>
                <Typography variant="body1" className="text-white">
                    <span className="font-medium">Time:</span> {shift.time}
                </Typography>
                <Typography variant="body1" className="text-white">
                    <span className="font-medium">Site:</span> {shift.site}
                </Typography>
            </div>
            <div className="flex gap-2">
                <Button onClick={() => onEdit(shift)} className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 p-1 rounded-full">
                    <Edit className="w-4 h-4" />
                </Button>
                <Button onClick={() => onDelete(shift.id)} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 p-1 rounded-full">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    </motion.div>
);

const LiveRideCard = ({ ride }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'in progress': return 'text-green-400';
            case 'not started': return 'text-yellow-400';
            case 'completed': return 'text-blue-400';
            default: return 'text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'in progress': return <Zap className="w-4 h-4" />;
            case 'not started': return <AlertTriangle className="w-4 h-4" />;
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    return (
        <motion.div variants={cardVariants} initial="hidden" animate="visible" className={combineClasses(glassmorphism, 'p-4 mb-4')}>
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


// Main Dashboard Component
const Dashboard = ({ onGoBack }) => {
    // State for all modifiable data
    const [currentStats, setCurrentStats] = useState(initialMockCurrentStats);
    const [siteInfo, setSiteInfo] = useState(initialMockSiteInfo);
    const [employees, setEmployees] = useState(initialMockEmployees);
    const [absentShifts, setAbsentShifts] = useState(initialMockAbsentShifts);
    const [liveRides, setLiveRides] = useState(initialMockLiveRides); // Live rides might be read-only, but keeping it in state for consistency
    const [officeLocations, setOfficeLocations] = useState(initialMockOfficeLocations); // Office locations as state

    const [searchTerm, setSearchTerm] = useState('');
    const [showLiveRides, setShowLiveRides] = useState(false);
    const [selectedOffice, setSelectedOffice] = useState(null);

    // Modals state
    const [isEditStatsModalOpen, setIsEditStatsModalOpen] = useState(false);
    const [isEditSiteInfoModalOpen, setIsEditSiteInfoModalOpen] = useState(false);
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null); // For editing
    const [isAbsentShiftModalOpen, setIsAbsentShiftModalOpen] = useState(false);
    const [currentAbsentShift, setCurrentAbsentShift] = useState(null); // For editing
    const [isOfficeModalOpen, setIsOfficeModalOpen] = useState(false); // For adding/editing offices
    const [currentOffice, setCurrentOffice] = useState(null); // For editing offices

    const mapComponentRef = useRef(); // Ref to the MapComponent instance

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            setSelectedOffice(null); // Clear selected office if search bar is empty
            return;
        }

        const filteredOffices = officeLocations.filter(office =>
            office.name.toLowerCase().includes(value.toLowerCase()) ||
            office.address.toLowerCase().includes(value.toLowerCase())
        );

        if (filteredOffices.length === 1) {
            handleFocusMap(filteredOffices[0]);
            setSelectedOffice(filteredOffices[0]);
        } else {
            setSelectedOffice(null); // Clear if multiple or no matches
            // Optionally, you could show a list of matches here for the user to pick
        }
    };

    const handleFocusMap = (office) => {
        if (mapComponentRef.current && mapComponentRef.current.panTo) {
            mapComponentRef.current.panTo([office.lat, office.lng], 14);
            setSelectedOffice(office);
        }
    };

    // Handlers for Current Stats
    const handleSaveCurrentStats = (newStats) => {
        setCurrentStats(newStats);
        // In a real app: call API to save newStats
        console.log('Saved Current Stats:', newStats);
    };

    // Handlers for Site Information
    const handleSaveSiteInfo = (newSiteInfo) => {
        setSiteInfo(newSiteInfo);
        // In a real app: call API to save newSiteInfo
        console.log('Saved Site Info:', newSiteInfo);
    };

    // Handlers for Employees
    const handleAddEmployee = () => {
        setCurrentEmployee(null); // Clear for new entry
        setIsEmployeeModalOpen(true);
    };

    const handleEditEmployee = (employee) => {
        setCurrentEmployee(employee);
        setIsEmployeeModalOpen(true);
    };

    const handleSaveEmployee = (employeeToSave) => {
        if (employeeToSave.id && employees.some(emp => emp.id === employeeToSave.id)) {
            // Edit existing
            setEmployees(employees.map(emp => emp.id === employeeToSave.id ? employeeToSave : emp));
            console.log('Updated Employee:', employeeToSave);
        } else {
            // Add new
            setEmployees([...employees, { ...employeeToSave, id: Date.now().toString() }]);
            console.log('Added Employee:', employeeToSave);
        }
        // In a real app: call API to save/update employee
    };

    const handleDeleteEmployee = (id) => {
        setEmployees(employees.filter(emp => emp.id !== id));
        // In a real app: call API to delete employee
        console.log('Deleted Employee ID:', id);
    };

    // Handlers for Absent Shifts
    const handleAddAbsentShift = () => {
        setCurrentAbsentShift(null); // Clear for new entry
        setIsAbsentShiftModalOpen(true);
    };

    const handleEditAbsentShift = (shift) => {
        setCurrentAbsentShift(shift);
        setIsAbsentShiftModalOpen(true);
    };

    const handleSaveAbsentShift = (shiftToSave) => {
        if (shiftToSave.id && absentShifts.some(s => s.id === shiftToSave.id)) {
            // Edit existing
            setAbsentShifts(absentShifts.map(shift => shift.id === shiftToSave.id ? shiftToSave : shift));
            console.log('Updated Absent Shift:', shiftToSave);
        } else {
            // Add new
            setAbsentShifts([...absentShifts, { ...shiftToSave, id: Date.now().toString() }]);
            console.log('Added Absent Shift:', shiftToSave);
        }
        // In a real app: call API to save/update absent shift
    };

    const handleDeleteAbsentShift = (id) => {
        setAbsentShifts(absentShifts.filter(shift => shift.id !== id));
        // In a real app: call API to delete absent shift
        console.log('Deleted Absent Shift ID:', id);
    };

    // Handlers for Office Locations
    const handleAddOffice = () => {
        setCurrentOffice(null); // Clear for new entry
        setIsOfficeModalOpen(true);
    };

    const handleEditOffice = (office) => {
        setCurrentOffice(office);
        setIsOfficeModalOpen(true);
    };

    const handleSaveOffice = (officeToSave) => {
        if (officeToSave.id && officeLocations.some(o => o.id === officeToSave.id)) {
            // Edit existing
            setOfficeLocations(officeLocations.map(office => office.id === officeToSave.id ? officeToSave : office));
            console.log('Updated Office:', officeToSave);
        } else {
            // Add new
            setOfficeLocations([...officeLocations, { ...officeToSave, id: Date.now().toString() }]);
            console.log('Added Office:', officeToSave);
        }
        // In a real app: call API to save/update office
    };

    const handleDeleteOffice = (id) => {
        setOfficeLocations(officeLocations.filter(office => office.id !== id));
        // In a real app: call API to delete office
        console.log('Deleted Office ID:', id);
        if (selectedOffice && selectedOffice.id === id) {
            setSelectedOffice(null); // Deselect if the deleted office was selected
        }
    };


    return (
        <div className="relative min-h-screen bg-gray-900 overflow-hidden">
            {/* Leaflet Map Container - Now at the top, scrollable with content */}
            <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] z-0"> {/* Adjusted height for map */}
                <MapComponent
                    ref={mapComponentRef} // Attach ref to MapComponent
                    officeLocations={officeLocations} // Pass office locations from state to map
                    guardLocations={initialMockGuardLocations} // Pass initial mock guard locations to map
                    onMarkerClick={(office) => setSelectedOffice(office)}
                />
            </div>

            {/* Dashboard Content Overlay - Now flows below the map */}
            <div className="relative z-10 container mx-auto p-6 space-y-8 bg-gray-900/80 rounded-lg shadow-xl mt-8">
                {/* Header and Search */}
                <div className="flex justify-between items-center">
                    <h1 className={combineClasses('text-3xl font-bold text-white', greenTheme)}>Admin Dashboard</h1>
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search Office Name/Address" // Updated placeholder
                            value={searchTerm}
                            onChange={handleSearch}
                            className={combineClasses(
                                glassmorphism,
                                'w-64 text-white placeholder:text-gray-400',
                                'focus:ring-2 focus:ring-green-400 focus:border-green-400',
                                'border-green-500/30 outline-none'
                            )}
                            startContent={<Search className="w-4 h-4 text-gray-400 ml-2" />}
                        />
                    </div>
                </div>

                {/* Selected Office Panel */}
                {selectedOffice && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className={combineClasses(glassmorphism, 'p-4 fixed right-6 top-24 w-80 z-20')}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <Typography variant="h6" className="text-white font-bold">
                                {selectedOffice.name}
                            </Typography>
                            <div className="flex gap-2">
                                <Button onClick={() => handleEditOffice(selectedOffice)} size="small" className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 p-1 rounded-full">
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button onClick={() => handleDeleteOffice(selectedOffice.id)} size="small" className="bg-red-500/20 text-red-400 hover:bg-red-500/30 p-1 rounded-full">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                                <Button
                                    onClick={() => setSelectedOffice(null)}
                                    size="small"
                                    className="text-white"
                                >
                                    <XCircle className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                        <Typography variant="body2" className="text-gray-300">
                            ID: {selectedOffice.id}
                        </Typography>
                        <Typography variant="body2" className="text-gray-300">
                            Address: {selectedOffice.address}
                        </Typography>
                        <Typography variant="body2" className="text-gray-300">
                            Guards: {selectedOffice.numGuards}
                        </Typography>
                        <div className="mt-4">
                            <Typography variant="body2" className="text-white font-medium mb-2">
                                Geofence Status:
                            </Typography>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <Typography variant="body2" className="text-gray-300">
                                    Active (500m radius)
                                </Typography>
                            </div>
                        </div>
                        <Button
                            className="mt-4 w-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300"
                            onClick={() => handleFocusMap(selectedOffice)}
                        >
                            <MapPin className="mr-2 w-4 h-4" />
                            Focus on Map
                        </Button>
                    </motion.div>
                )}

                {/* Current Stats and Site Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <CurrentStatsCard currentStats={currentStats} onEdit={() => setIsEditStatsModalOpen(true)} />
                    <SiteInformationCard siteInfo={siteInfo} onEdit={() => setIsEditSiteInfoModalOpen(true)} selectedOffice={selectedOffice} onFocusMap={handleFocusMap} />
                </div>

                {/* Offices Section (New) */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className={combineClasses('text-2xl font-semibold text-white', greenTheme)}>Office Locations</h2>
                        <Button onClick={handleAddOffice} className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                            <PlusCircle className="mr-2 w-4 h-4" /> Add Office
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {officeLocations.map((office) => (
                            <motion.div key={office.id} variants={cardVariants} initial="hidden" animate="visible" className={combineClasses(glassmorphism, 'p-3 flex flex-col gap-2')}>
                                <Typography variant="body1" className="text-white font-medium">{office.name}</Typography>
                                <Typography variant="body2" className="text-gray-300">{office.address}</Typography>
                                <Typography variant="body2" className="text-gray-300">Guards: {office.numGuards}</Typography>
                                <div className="flex justify-end gap-2 mt-2">
                                    <Button onClick={() => handleEditOffice(office)} className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 p-1 rounded-full">
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button onClick={() => handleDeleteOffice(office.id)} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 p-1 rounded-full">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Button onClick={() => handleFocusMap(office)} className="bg-green-500/20 text-green-400 hover:bg-green-500/30 p-1 rounded-full">
                                        <MapPin className="w-4 h-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>


                {/* Employees */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className={combineClasses('text-2xl font-semibold text-white', greenTheme)}>Employees</h2>
                        <Button onClick={handleAddEmployee} className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                            <PlusCircle className="mr-2 w-4 h-4" /> Add Employee
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {employees.map((employee) => (
                            <EmployeeCard key={employee.id} employee={employee} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} />
                        ))}
                    </div>
                </div>

                {/* Absent Shift Details */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className={combineClasses('text-2xl font-semibold text-white', greenTheme)}>Absent Shift Details</h2>
                        <Button onClick={handleAddAbsentShift} className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                            <PlusCircle className="mr-2 w-4 h-4" /> Add Absent Shift
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {absentShifts.map((shift) => (
                            <AbsentShiftCard key={shift.id} shift={shift} onEdit={handleEditAbsentShift} onDelete={handleDeleteAbsentShift} />
                        ))}
                    </div>
                </div>

                {/* Live Rides */}
                <div>
                    <div className='flex items-center gap-4 mb-4'>
                        <h2 className={combineClasses('text-2xl font-semibold text-white', greenTheme)}>Live Rides</h2>
                        <Button
                            onClick={() => setShowLiveRides(!showLiveRides)}
                            className={combineClasses(
                                glassmorphism,
                                'text-white hover:bg-white/20',
                                'border-green-500/30'
                            )}
                        >
                            {showLiveRides ? 'Hide Rides' : 'Show Rides'}
                        </Button>
                    </div>
                    {showLiveRides && (
                        <div className="space-y-4">
                            {liveRides.map((ride) => (
                                <LiveRideCard key={ride.id} ride={ride} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {onGoBack && ( // Conditionally render back button if onGoBack prop is provided
                <Button
                    onClick={onGoBack}
                    className={combineClasses(
                        glassmorphism,
                        'fixed bottom-4 right-5 z-50', // Fixed position at bottom right
                        'text-white hover:bg-white/20',
                        'border-green-500/30 px-6 py-3' // Added padding for better button size
                    )}
                >
                    <ArrowLeftCircle className="mr-2 w-5 h-5" /> {/* Larger icon */}
                    Back to Dashboard
                </Button>
            )}

            {/* Modals for editing */}
            {isEditStatsModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className={combineClasses(glassmorphism, 'p-6 w-full max-w-md text-white space-y-4')}
                    >
                        <h2 className="text-2xl font-bold text-green-400">Edit Current Stats</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSaveCurrentStats({
                                assigned: e.target.assigned.value,
                                sites: parseInt(e.target.sites.value)
                            });
                            setIsEditStatsModalOpen(false);
                        }} className="space-y-4">
                            <div>
                                <label htmlFor="assigned" className="block text-gray-300 text-sm font-medium mb-1">Assigned (e.g., 0/0)</label>
                                <Input
                                    id="assigned"
                                    type="text"
                                    defaultValue={currentStats.assigned}
                                    className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                                />
                            </div>
                            <div>
                                <label htmlFor="sites" className="block text-gray-300 text-sm font-medium mb-1">Sites</label>
                                <Input
                                    id="sites"
                                    type="number"
                                    defaultValue={currentStats.sites}
                                    className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <Button type="button" onClick={() => setIsEditStatsModalOpen(false)} className="bg-gray-500/20 text-gray-300 hover:bg-gray-500/30">
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {isEditSiteInfoModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className={combineClasses(glassmorphism, 'p-6 w-full max-w-md text-white space-y-4')}
                    >
                        <h2 className="text-2xl font-bold text-green-400">Edit Site Information</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSaveSiteInfo({
                                ...siteInfo, // Keep existing ID
                                name: e.target.siteName.value,
                                address: e.target.siteAddress.value,
                                supervisors: parseInt(e.target.siteSupervisors.value),
                                employees: parseInt(e.target.siteEmployees.value)
                            });
                            setIsEditSiteInfoModalOpen(false);
                        }} className="space-y-4">
                            <div>
                                <label htmlFor="siteName" className="block text-gray-300 text-sm font-medium mb-1">Name</label>
                                <Input
                                    id="siteName"
                                    type="text"
                                    defaultValue={siteInfo.name}
                                    className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                                />
                            </div>
                            <div>
                                <label htmlFor="siteAddress" className="block text-gray-300 text-sm font-medium mb-1">Address</label>
                                <Input
                                    id="siteAddress"
                                    type="text"
                                    defaultValue={siteInfo.address}
                                    className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                                />
                            </div>
                            <div>
                                <label htmlFor="siteSupervisors" className="block text-gray-300 text-sm font-medium mb-1">Supervisors</label>
                                <Input
                                    id="siteSupervisors"
                                    type="number"
                                    defaultValue={siteInfo.supervisors}
                                    className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                                />
                            </div>
                            <div>
                                <label htmlFor="siteEmployees" className="block text-gray-300 text-sm font-medium mb-1">Employees</label>
                                <Input
                                    id="siteEmployees"
                                    type="number"
                                    defaultValue={siteInfo.employees}
                                    className={combineClasses(glassmorphism, 'w-full text-white placeholder:text-gray-400')}
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <Button type="button" onClick={() => setIsEditSiteInfoModalOpen(false)} className="bg-gray-500/20 text-gray-300 hover:bg-gray-500/30">
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            <EmployeeModal
                isOpen={isEmployeeModalOpen}
                onClose={() => setIsEmployeeModalOpen(false)}
                employee={currentEmployee}
                onSave={handleSaveEmployee}
            />

            <AbsentShiftModal
                isOpen={isAbsentShiftModalOpen}
                onClose={() => setIsAbsentShiftModalOpen(false)}
                shift={currentAbsentShift}
                onSave={handleSaveAbsentShift}
            />

            <OfficeModal
                isOpen={isOfficeModalOpen}
                onClose={() => setIsOfficeModalOpen(false)}
                office={currentOffice}
                onSave={handleSaveOffice}
            />
        </div>
    );
};

export default Dashboard;
