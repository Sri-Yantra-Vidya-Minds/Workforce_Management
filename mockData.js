// src/components/Dashboard/mockData.js

export const mockCurrentStats = {
    assigned: '0/0',
    sites: 32,
};

export const mockSiteInfo = {
    id: '637ae5bb-d145-4c0f-94cf-9980431deb1f',
    name: 'New Check Road',
    address: 'Some Address, Some City',
    supervisors: 0,
    employees: 2,
};

export const mockEmployees = [
    { id: '1', name: 'Ema', role: 'Guard', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '2', name: 'Guard Man 1', role: 'Guard', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: '3', name: 'Jane Doe', role: 'Supervisor', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: '4', name: 'John Smith', role: 'Guard', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
];

export const mockAbsentShifts = [
    { date: '2025-03-31', time: '4:00 PM - 12:00 AM', site: 'smr vinay fountain' },
    { date: '2025-04-02', time: '4:00 PM - 12:00 AM', site: 'pune' },
    { date: '2025-04-02', time: '4:00 PM - 12:00 AM', site: 'pune' },
    { date: '2025-04-03', time: '11:00 AM - 4:00 PM', site: 'Matrix Hospitals' },
    { date: '2025-04-04', time: '4:00 PM - 12:00 AM', site: 'pune' },
    { date: '2025-04-05', time: '4:00 PM - 12:00 AM', site: 'pune' },
];

export const mockLiveRides = [
    {
        id: 'ride1',
        status: 'in progress',
        vehicle: 'Top Power TRK',
        driver: 'Driver 2',
        destination: 'Matrix Hospital Mehdipatnam',
        material: 'Cement',
        speed: 0.35,
        battery: 86,
    },
    {
        id: 'ride2',
        status: 'not started',
        vehicle: 'TEST MODEL',
        driver: 'Pro Driver - 2',
        destination: 'Warehouse mill 3',
        material: 'Cement',
        speed: null,
        battery: null,
    },
];

// Mock office locations data with coordinates in India
export const mockOfficeLocations = [
    { id: 'office1', name: 'Hyderabad HQ', lat: 17.4475, lng: 78.3731, numGuards: 15, address: 'Plot No. 123, HITEC City, Hyderabad' },
    { id: 'office2', name: 'Bangalore Branch', lat: 12.9716, lng: 77.5946, numGuards: 10, address: 'MG Road, Bangalore' },
    { id: 'office3', name: 'Chennai Sector', lat: 13.0827, lng: 80.2707, numGuards: 8, address: 'Anna Salai, Chennai' },
    { id: 'office4', name: 'Delhi Main Office', lat: 28.6139, lng: 77.2090, numGuards: 20, address: 'Connaught Place, New Delhi' },
    { id: 'office5', name: 'Mumbai West', lat: 19.0760, lng: 72.8777, numGuards: 12, address: 'Bandra, Mumbai' },
];

// Mock Guard Locations (for tracking demonstration)
export const mockGuardLocations = [
    { id: 'guard1', name: 'Guard Ema', lat: 17.4480, lng: 78.3740, officeId: 'office1' }, // Near Hyderabad HQ
    { id: 'guard2', name: 'Guard Man 1', lat: 12.9720, lng: 77.5950, officeId: 'office2' }, // Near Bangalore Branch
    { id: 'guard3', name: 'Guard Jane', lat: 17.4460, lng: 78.3720, officeId: 'office1' }, // Near Hyderabad HQ
    { id: 'guard4', name: 'Guard John', lat: 13.0830, lng: 80.2710, officeId: 'office3' }, // Near Chennai Sector
    { id: 'guard5', name: 'Guard Alex', lat: 28.6145, lng: 77.2095, officeId: 'office4' }, // Near Delhi Main Office
];
