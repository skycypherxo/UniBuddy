import React, { useState } from 'react';
import "./Login.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [token,setToken] = useState('');

    
    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formValues);
            const response = await axios.post('http://localhost:3000/api/auth/login', formValues , {withCredentials : true});
            alert(response.data.message);
            onLogin(response.data.token);
            const token = localStorage.setItem('token', response.data.token);
            if(response.data.token){
                navigate('/');
            }
        }
        catch (err) {
            console.error("Error in handleSubmit in Login: ", err);
            alert(err.response?.data?.message || "Login failed.");
        }
    };

    return (
        <>
            <div className="login-outercontainer">
                <div className="login-innercontainer">

                    <div className="login-leftcontainer">
                        <h1 id='login-welcome-back'>Welcome back to UniBuddy</h1>
                        <h4 id='login-quote'>Where knowledge meets opportunity!</h4>
                    </div>

                    <div className="login-rightcontainer">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="login-input-boxes" />

                            <input
                                type="password"
                                name="password"
                                value={formValues.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="login-input-boxes" />

                            <button type="submit" id='login_Sign_btn'>Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
