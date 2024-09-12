import React, {useState , useEffect} from 'react';
import './Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData , setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/dashboard/dashboard', { withCredentials: true });
        console.log(response.data);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
   
      <div className="dashboard-dashboard">
        <div className="dashboard-left-panel">
          <div className="dashboard-profile-section">
            <img src="profile-picture.jpg" alt="Profile" className="dashboard-profile-pic" />
            <div className="dashboard-profile-info">
              <h2>Hey</h2>
              <p>1243332</p>
            </div>
          </div>
          <div className="dashboard-info">
            <p><strong>Course:</strong> BTech Comp Sci</p>
            <p><strong>DOB:</strong> 29-Feb-2020</p>
            <p><strong>Contact:</strong> 1234567890</p>
            <p><strong>Email:</strong> unknown@gmail.com</p>
            <p><strong>Address:</strong> Ghost town Road, New York, America</p>
          </div>
        </div>

        <div className="dashboard-middle-panel">
          <div className="dashboard-attendance-section">
            <h3>Attendance</h3>
            <div className="dashboard-attendance-cards">
              <div className="dashboard-attendance-card">
                <p>Engineering Graphics</p>
                <p>12/14</p>
                <div className="dashboard-circle">86%</div>
                <p>Last 24 Hours</p>
              </div>
              <div className="dashboard-attendance-card">
                <p>Mathematical Engineering</p>
                <p>27/29</p>
                <div className="dashboard-circle">93%</div>
                <p>Last 24 Hours</p>
              </div>
              <div className="dashboard-attendance-card">
                <p>Computer Architecture</p>
                <p>27/30</p>
                <div className="dashboard-circle">81%</div>
                <p>Last 24 Hours</p>
              </div>
              <div className="dashboard-attendance-card">
                <p>Database Management</p>
                <p>24/25</p>
                <div className="dashboard-circle">96%</div>
                <p>Last 24 Hours</p>
              </div>
              <div className="dashboard-attendance-card">
                <p>Network Security</p>
                <p>25/27</p>
                <div className="dashboard-circle">92%</div>
                <p>Last 24 Hours</p>
              </div>
            </div>
          </div>

          <div className="dashboard-timetable-section">
            <h3>Today's Timetable</h3>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Room No.</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10-11 AM</td>
                  <td>33-309</td>
                  <td>DBMS130</td>
                </tr>
                <tr>
                  <td>11-12 AM</td>
                  <td>38-719</td>
                  <td>CS200</td>
                </tr>
                <tr>
                  <td>01-02 PM</td>
                  <td>33-309</td>
                  <td>MTH166</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-extra-right-panel">
          <div className="dashboard-announcements-section">
            <h3>Announcements</h3>
            <div className="dashboard-announcement-cards">
              <div className="dashboard-announcement-card">
                <p><strong>Academic:</strong> Summer training internship with Live Projects.</p>
                <p>2 Minutes Ago</p>
              </div>
              <div className="dashboard-announcement-card">
                <p><strong>Co-curricular:</strong> Global internship opportunity by Student organization.</p>
                <p>10 Minutes Ago</p>
              </div>
              <div className="dashboard-announcement-card">
                <p><strong>Examination:</strong> Instructions for Mid Term Examination.</p>
                <p>Yesterday</p>
              </div>
            </div>
          </div>

          <div className="dashboard-teachers-on-leave-section">
            <h3>Teachers on leave</h3>
            <div className="dashboard-teacher-cards">
              <div className="dashboard-teacher-card">
                <p><strong>The Professor:</strong> Full Day</p>
              </div>
              <div className="dashboard-teacher-card">
                <p><strong>Lisa Manobal:</strong> Half Day</p>
              </div>
              <div className="dashboard-teacher-card">
                <p><strong>Himanshu Jindal:</strong> Full Day</p>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}

export default Dashboard;
