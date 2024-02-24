# MediCare - Medical Consultation App 🏥

MediCare is a web application designed for medical consultation, allowing users to connect with doctors, book appointments, and have video consultations.

## Features 🚀

- *User Authentication:* 👤 Users can register and log in using their email and password. They can also set their profile picture.
- *Forget Password:* 🔑 Provides a feature to reset the password by sending an OTP to the registered email address.
- *Doctor Registration:* 🩺 Users can apply to become a doctor by submitting details such as fees, availability, certificates, and education. Admin approval is required for doctor status.
- *Doctor Search:* 🔍 Users can search for doctors by name or specialty (e.g., dentist, neurosurgeon).
- *Doctor Details:* 📋 Users can view detailed profiles of doctors, including their qualifications and availability.
- *Appointment Booking:* 📅 Users can see available time slots for doctors and book appointments for specific dates.
- *Payment Gateway:* 💳 Stripe payment gateway integration allows users to pay doctor fees securely.
- *Appointment Confirmation:* 📩 After successful payment, the doctor receives a notification about the booking and the time slot. The doctor can see the patient's name and the booked slot in the appointments tab.
- *Appointment Management:* 🗓 Users can view their appointments in the appointments tab, where a call button activates during the appointment's time slot for video consultations.
- *Video Consultation:* 🎥 Users can have video consultations with doctors during their appointment slots using WebRTC technology.

## Technology Stack 💻

- *Frontend:* React.js 🌐
- *Backend:* Node.js, Express.js 🚀
- *Database:* MongoDB 📂
- *Image Storage:* Cloudinary ☁
- *Email Service:* Nodemailer 📧
- *Video Calling:* WebRTC 📹
- *Socket Library:* Socket.io 🔌
- *Payment Gateway:* Stripe 💳
- *Authentication:* JWT 🔐
- *Password Encryption:* Bcrypt 🔒
- *Form Handling:* React Hook Forms 📝
- *Scheduling:* Node-schedule ⏰
- *Styling:* Tailwind CSS 🎨

## Installation 🛠

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using npm install for both frontend and backend.
4. Set up environment variables.
5. Run the frontend and backend servers using npm start.

## Usage 🌟

- Register and log in as a user or apply to become a doctor.
- Search for doctors and view their profiles.
- Book appointments with doctors and make payments securely.
- Have video consultations during scheduled appointment slots.