import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        
        const response = await axios.get('http://localhost:3000/api/dashboard/info', { withCredentials: true });
        console.log(response.data);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (dashboardData) {
      dashboardData.attendance.forEach(subject => {
        const attended = parseInt(subject.attendedClasses);
        const total = parseInt(subject.totalClasses);
        const percentage = Math.round((attended / total) * 100);
        
        
        if (percentage < 75) {
          toast.warn(`Your attendance in ${subject.subject} is below 75% (${percentage}%)`, {
            position: "top-right",
            autoClose: 5000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    }
  }, [dashboardData]);

  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard-dashboard">
      <div className="dashboard-left-panel">
        <div className="dashboard-profile-section">
          <img src="profile-picture.jpg" alt="Profile" className="dashboard-profile-pic" />
          <div className="dashboard-profile-info">
            <h2>Hello, {dashboardData.userId}</h2>
            <p><strong>Email:</strong> {dashboardData.email}</p>
          </div>
        </div>
        <div className="dashboard-info">
          <p><strong>Course:</strong> {dashboardData.course}</p>
          <p><strong>DOB:</strong> {new Date(dashboardData.dob).toLocaleDateString()}</p>
          <p><strong>Contact:</strong> {dashboardData.contact}</p>
          <p><strong>Address:</strong> {dashboardData.address}</p>
        </div>
      </div>

      <div className="dashboard-middle-panel">
        <div className="dashboard-attendance-section">
          <h3>Attendance</h3>
          <div className="dashboard-attendance-cards">
            {dashboardData.attendance.map((subject, index) => {
              const attended = parseInt(subject.attendedClasses);  
              const total = parseInt(subject.totalClasses);        
              const percentage = Math.round((attended / total) * 100);

              return (
                <div key={index} className="dashboard-attendance-card">
                  <p>{subject.subject}</p>
                  <p>{attended}/{total}</p>
                  <div className="dashboard-circle">{percentage}%</div>
                  <p>{subject.lastUpdated}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="dashboard-attendance-graph-section">
          <h3>Attendance Trends</h3>
          {dashboardData.attendance.map((subject, index) => (
            <div key={index} className="dashboard-attendance-graph">
              <h4>{subject.subject}</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={subject.history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="attendedClasses" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="totalClasses" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
        
        <div className="dashboard-timetable-section">
          <h3>Today's Timetable</h3>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Subject</th>
                <th>Room Number</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.timetable.map((slot, index) => (
                <tr key={index}>
                  <td>{slot.time}</td>
                  <td>{slot.subject}</td>
                  <td>{slot.roomNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-extra-right-panel">
        <div className="dashboard-announcements-section">
          <h3>Announcements</h3>
          <div className="dashboard-announcement-cards">
            {dashboardData.announcements.map((announcement, index) => (
              <div key={index} className="dashboard-announcement-card">
                <p><strong>{announcement.category}:</strong> {announcement.message}</p>
                <p>{new Date(announcement.date).toLocaleTimeString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-teachers-on-leave-section">
          <h3>Teachers on leave</h3>
          <div className="dashboard-teacher-cards">
            {dashboardData.teachersOnLeave.map((teacher, index) => (
              <div key={index} className="dashboard-teacher-card">
                <p><strong>{teacher.teacherName}:</strong> {teacher.leaveDuration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
