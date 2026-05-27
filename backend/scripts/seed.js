import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Course from '../models/Course.js';
import Payment from '../models/Payment.js';
import Attendance from '../models/Attendance.js';
import Notice from '../models/Notice.js';

// Load config
dotenv.config();

const mockStudentsData = [
  {
    id: 'STU001',
    name: 'Vyshali Gowda',
    email: 'vyshali.gowda@university.edu',
    phone: '+91 98765 43210',
    department: 'Artificial Intelligence & Machine Learning',
    semester: 8,
    gpa: 3.92,
    attendance: 94,
    fees_status: 'Paid',
    avatar: 'V',
    color: 'from-purple-500 to-pink-500',
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'Data Science'],
    enrollment_date: '2022-08-15',
    status: 'Active'
  },
  {
    id: 'STU002',
    name: 'Kalyan',
    email: 'kalyan.k@university.edu',
    phone: '+91 98765 43211',
    department: 'Computer Science',
    semester: 6,
    gpa: 3.78,
    attendance: 88,
    fees_status: 'Paid',
    avatar: 'K',
    color: 'from-blue-500 to-cyan-500',
    skills: ['Java', 'Web Development', 'Databases', 'System Design'],
    enrollment_date: '2023-08-10',
    status: 'Active'
  },
  {
    id: 'STU003',
    name: 'Vamshi',
    email: 'vamshi.m@university.edu',
    phone: '+91 98765 43212',
    department: 'Electronics & Communication',
    semester: 5,
    gpa: 3.65,
    attendance: 91,
    fees_status: 'Paid',
    avatar: 'V',
    color: 'from-indigo-500 to-purple-500',
    skills: ['VLSI', 'Signal Processing', 'Embedded Systems', 'Circuit Design'],
    enrollment_date: '2023-08-15',
    status: 'Active'
  },
  {
    id: 'STU004',
    name: 'Arya',
    email: 'arya.sharma@university.edu',
    phone: '+91 98765 43213',
    department: 'Mechanical Engineering',
    semester: 7,
    gpa: 3.71,
    attendance: 93,
    fees_status: 'Paid',
    avatar: 'A',
    color: 'from-red-500 to-orange-500',
    skills: ['CAD', 'Thermodynamics', 'Fluid Mechanics', 'Manufacturing'],
    enrollment_date: '2022-08-20',
    status: 'Active'
  },
  {
    id: 'STU005',
    name: 'Gokula',
    email: 'gokula.k@university.edu',
    phone: '+91 98765 43214',
    department: 'Information Technology',
    semester: 4,
    gpa: 3.85,
    attendance: 96,
    fees_status: 'Paid',
    avatar: 'G',
    color: 'from-green-500 to-emerald-500',
    skills: ['Cloud Computing', 'DevOps', 'Kubernetes', 'AWS'],
    enrollment_date: '2024-08-05',
    status: 'Active'
  },
  {
    id: 'STU006',
    name: 'Chetan',
    email: 'chetan.patel@university.edu',
    phone: '+91 98765 43215',
    department: 'Civil Engineering',
    semester: 6,
    gpa: 3.62,
    attendance: 85,
    fees_status: 'Pending',
    avatar: 'C',
    color: 'from-amber-500 to-yellow-500',
    skills: ['Structural Design', 'AutoCAD', 'BIM', 'Project Management'],
    enrollment_date: '2023-08-12',
    status: 'Active'
  },
  {
    id: 'STU007',
    name: 'Rohit',
    email: 'rohit.singh@university.edu',
    phone: '+91 98765 43216',
    department: 'Electrical Engineering',
    semester: 5,
    gpa: 3.58,
    attendance: 89,
    fees_status: 'Paid',
    avatar: 'R',
    color: 'from-sky-500 to-blue-500',
    skills: ['Power Systems', 'Control Systems', 'Electrical Machines', 'Renewable Energy'],
    enrollment_date: '2023-08-18',
    status: 'Active'
  },
  {
    id: 'STU008',
    name: 'Vinu',
    email: 'vinu.krishna@university.edu',
    phone: '+91 98765 43217',
    department: 'Data Science',
    semester: 3,
    gpa: 3.88,
    attendance: 98,
    fees_status: 'Paid',
    avatar: 'V',
    color: 'from-violet-500 to-purple-500',
    skills: ['Python', 'R', 'SQL', 'Big Data', 'Analytics', 'Visualization'],
    enrollment_date: '2024-08-10',
    status: 'Active'
  },
  {
    id: 'STU009',
    name: 'Ujjwal',
    email: 'ujjwal.kumar@university.edu',
    phone: '+91 98765 43218',
    department: 'Computer Science',
    semester: 2,
    gpa: 3.40,
    attendance: 92,
    fees_status: 'Paid',
    avatar: 'U',
    color: 'from-teal-400 to-cyan-500',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    enrollment_date: '2024-08-01',
    status: 'Active'
  }
];

const mockCoursesData = [
  { id: 'C101', title: 'Intro to Programming', faculty: 'Dr. Smith', seats: 40, status: 'Open' },
  { id: 'C102', title: 'Data Structures', faculty: 'Prof. Jane', seats: 35, status: 'Almost full' },
  { id: 'C103', title: 'Cloud Computing', faculty: 'Dr. Wilson', seats: 30, status: 'New' },
  { id: 'C104', title: 'AI in Education', faculty: 'Prof. Gray', seats: 28, status: 'Open' }
];

const mockPaymentsData = [
  { name: 'Vyshali Gowda', totalAmount: 10000, amount: 10000, remainingBalance: 0, status: 'Paid', date: 'May 20, 2026' },
  { name: 'Chetan', totalAmount: 10000, amount: 5000, remainingBalance: 5000, status: 'Pending', date: 'May 22, 2026' },
  { name: 'Kalyan', totalAmount: 10000, amount: 10000, remainingBalance: 0, status: 'Paid', date: 'May 23, 2026' },
  { name: 'Vamshi', totalAmount: 10000, amount: 10000, remainingBalance: 0, status: 'Paid', date: 'May 24, 2026' }
];

const mockNoticesData = [
  {
    title: 'Smart India Hackathon 2026 Registration',
    content: 'Registrations are now open for the annual Smart India Hackathon. Interested students can form teams of 6 and register on the portal by next Friday. The internal screening will take place on June 5th.',
    category: 'Event',
    postedBy: 'admin',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Spring Semester 2026 Results Declared',
    content: 'The academic department has officially declared the results for the Spring 2026 Semester. Students can access their semester grade reports and overall CGPA logs directly from their dashboard profile page.',
    category: 'Result',
    postedBy: 'admin',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Summer Vacation & Semester Break Announcement',
    content: 'This is to inform all students that the college campus will remain closed for the summer break from June 1st to July 15th, 2026. Normal academic classes and laboratory schedules will resume on July 16th.',
    category: 'Announcement',
    postedBy: 'admin',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  }
];

const importData = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Wiping old database collections...');
    await User.deleteMany();
    await Student.deleteMany();
    await Course.deleteMany();
    await Payment.deleteMany();
    await Attendance.deleteMany();
    await Notice.deleteMany();

    console.log('Creating default Admin & Student User accounts...');
    
    // Hash passwords manually for seed insertion
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const studentPassword = await bcrypt.hash('student123', salt);

    const users = [
      {
        username: 'admin',
        email: 'admin@university.edu',
        password: adminPassword,
        role: 'Admin',
      }
    ];

    // Automatically create a student user account for every single seeded student!
    for (const student of mockStudentsData) {
      users.push({
        username: student.email.split('@')[0],
        email: student.email.toLowerCase(),
        password: studentPassword,
        role: 'Student'
      });
    }

    await User.insertMany(users);
    console.log('Users Seeded Successfully!');

    console.log('Seeding mock students...');
    await Student.insertMany(mockStudentsData);
    console.log('Students Seeded Successfully!');

    console.log('Seeding mock courses...');
    await Course.insertMany(mockCoursesData);
    console.log('Courses Seeded Successfully!');

    console.log('Seeding mock payments...');
    await Payment.insertMany(mockPaymentsData);
    console.log('Payments Seeded Successfully!');

    console.log('Seeding default attendance data...');
    const attendanceRecords = mockStudentsData.map(s => ({
      studentId: s.id,
      name: s.name,
      present: s.id !== 'STU006', // STU006 Chetan is absent
      date: new Date().toISOString().split('T')[0]
    }));
    await Attendance.insertMany(attendanceRecords);
    console.log('Attendance Seeded Successfully!');

    console.log('Seeding mock notices...');
    await Notice.insertMany(mockNoticesData);
    console.log('Notices Seeded Successfully!');

    console.log('Database Seeding Completed Successfully! 🎉');
    process.exit();
  } catch (error) {
    console.error(`Error with database seeding: ${error.message}`);
    process.exit(1);
  }
};

importData();
