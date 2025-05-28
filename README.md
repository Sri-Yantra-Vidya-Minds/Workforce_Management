
# Innoworx.ai - Security Management System

## Project Description

This repository contains the front-end application for the **Innoworx.ai Security Management System**. The system is designed to provide comprehensive tools for managing security operations, offering a streamlined interface for various functionalities. It aims to enhance team coordination and ensure comprehensive site management.

The application boasts a modern and intuitive user interface built with a distinct glassmorphism design, ensuring a visually engaging and efficient user experience across all modules, including the core dashboard.

## Features

* **Secure Authentication Module:**
    * User Login (Email and Password or Phone No. and Password).
    * Robust "Forgot Password" flow including:
        * Phone number verification.
        * OTP (One-Time Password) validation.
        * Secure New Password creation.
* **Intuitive Security Management Dashboard:**
    * Provides a central hub for managing security operations.
    * Features modules for "Dashboard", "Officer Status", "Onboarding", "Org Management", "View Reports", "Shift Management", "Chat", and "Profile".
    * Implemented with React and following the core glassmorphism design principles of the system.
* **Modern UI/UX Design:**
    * Prominent **Glassmorphism** styling for main containers and interactive elements.
    * Dynamic **Geometric Shapes** serving as an animated full-page background design.
    * Standardized and visually consistent input fields across all authentication screens (e.g., `56px` height, `#228B22` border, `#F8F7F7` background).
    * Clear and consistent navigation buttons (e.g., "Back to Enter Phone Number" with Poppins font and `#013220` color).

## Technologies Used

* **React.js:** A JavaScript library for building user interfaces.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Framer Motion:** For smooth and performant animations and transitions.
* **Lucide React:** For iconography (e.g., `Eye`, `EyeOff`, `ArrowLeft` icons).

## Getting Started

Follow these steps to get a local copy of the project up and running on your machine.

### Prerequisites

* Node.js (LTS version recommended)
* npm or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [your-repository-url]
    cd [your-repository-name]
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The application will typically open in your browser at `http://localhost:3000`.

## Project Structure


src/
├── components/
│   └── Authorization/
│       ├── Authorization.js          # Main authentication flow orchestrator
│       ├── Login.js                  # Login component
│       ├── ForgotPasswordPhoneNumber.js # Phone number input for password reset
│       ├── ForgotPasswordNewPassword.js # OTP verification component
│       └── ForgotPasswordOTP.js      # Set New Password component
├── App.js
├── index.js
└── ... (other files/folders, including dashboard components)


## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

[Specify your license here, e.g., MIT License, Apache 2.0]

## Contact

[Your Name/Team Name] - [Your Email/Contact Information]
```
