import React, { useState } from 'react';
import '../Signup/Signup.css'; // Your CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../comtext/ContextProvider'; // Assuming you have a ContextProvider for authentication
import {toast} from 'react-toastify'
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth(); // Custom hook to manage auth state

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Send login request
            const res = await axios.post("http://localhost:4000/api/auth/login", {
                email,
                password
            });

            // Check if login was successful
            if (res.data.success) {
                const token = res.data.token;
                
                // Save the token in localStorage
                localStorage.setItem("token", token);

                // Call login function from context to update auth state
                login(res.data.user);

                // Navigate to the home page after successful login
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)  // Correct way to access error message
            } else {
                toast.error("Something went wrong. Please try again.")
            }
            console.log(error)
        }
    };

    return (
        <div className="container">
            <div className="signup">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="sign-box">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            placeholder="Enter Your Email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email}
                            required 
                        />
                    </div>
                    <div className="sign-box">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            placeholder="********" 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password}
                            required 
                        />
                    </div>
                    <input type="submit" className="button" value="Login" />
                    <button onClick={()=>navigate('/')} className=' button'> Back </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
