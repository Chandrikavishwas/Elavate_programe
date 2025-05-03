# 🩺 Doctor Appointment Booking System

A modern React application for booking appointments with healthcare professionals. This application features a user-friendly interface with dark and light theme options, interactive particle background, and comprehensive doctor management functionality.
# Netlify Deployed link-
[Live Demo](https://capricornassesment.netlify.app/)

## Features

- *Search & Filter Doctors*: Find doctors by name, specialty, or location
- *Appointment Booking*: Schedule appointments with your preferred doctor
- *Doctor Management*: Add new doctors to the system
- *Appointment Tracking*: View all your booked appointments
- *Dark/Light Theme*: Toggle between visually appealing themes
- *Calendar View*: Check doctor availability through calendar view
- *Responsive Design*: Works on desktop and mobile devices
- *Interactive UI*: Features a particle background for visual appeal

## Screenshots

(Note: No actual screenshots included as per requirements)

## 🚀 Tech Stack

- React.js
- Context API for state management
- React Hooks
- Tailwind CSS for styling
- tsParticles for interactive background
- Date-fns for date manipulation

## 📁 Project Structure

```
doctor-appointment-system/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── AddDoctorForm.jsx
│   │   ├── AppointmentBooking.jsx
│   │   ├── BookedAppointments.jsx
│   │   ├── DoctorCalendarView.jsx
│   │   ├── DoctorCard.jsx
│   │   ├── DoctorsList.jsx
│   │   ├── DoctorSearch.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   └── Particle.jsx
│   ├── context/
│   │   ├── AppointmentsContext.jsx
│   │   ├── DoctorsContext.jsx
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   └── dummyDoctors.js
│   ├── styles/
│   │   └── global.css
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   └── index.js
└── README.md
```

## Installation and Setup

1. Clone the repository
   
   `git clone https://github.com/Chandrikavishwas/doctor-appointment-system.git`
   

2. Navigate to the project directory
   
  `cd doctor-appointment-system`
   

3. Install dependencies
   
   `npm install`
   

4. Start the development server
   
   `npm start`
   

5. Open your browser and visit http://localhost:3000

## Usage

1. *Browse Doctors*: View the list of available doctors on the homepage
2. *Search/Filter*: Use the search function to find doctors by name, specialty, or location
3. *Book Appointment*: Click "Book Appointment" on a doctor's card to schedule a meeting
4. *View Appointments*: Check your booked appointments in the dedicated section
5. *Add Doctors*: Add new doctors using the "Add New Doctor" button
6. *Toggle Theme*: Switch between dark and light themes using the theme toggle in the header

## Key Components

### Context Providers
- *ThemeContext*: Manages application theme (dark/light)
- *DoctorsContext*: Handles doctor data and operations
- *AppointmentsContext*: Manages appointment booking and tracking

### Main Components
- *Header*: Navigation and theme toggle
- *Hero*: Landing page introduction section
- *DoctorSearch*: Search and filter functionality
- *DoctorsList*: Display of available doctors
- *AddDoctorForm*: Form to add new doctors
- *AppointmentBooking*: Booking form with calendar
- *BookedAppointments*: List of scheduled appointments
- *DoctorCalendarView*: View of doctor's availability
- *Footer*: Contact information and links

## Author

- *Chandrika Vishwas*
- Email: chandrikavishwas@gmail.com
- GitHub: [Chandrikavishwas](https://github.com/Chandrikavishwas)

## Future Enhancements

- User authentication and profiles
- Doctor rating and review system
- Email notifications for appointments
- Payment integration for premium consultations
- Video consultation capabilities

