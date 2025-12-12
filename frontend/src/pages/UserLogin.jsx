import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import axios from 'axios'

const UserLogin = ()=>{
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome back</h2>
          <p>Sign in to continue to your account.</p>
          <div style={{marginTop:10}} className="small">Are you a partner? <Link to="/food-partner/login">Switch to partner</Link></div>
        </div>

        <form className="auth-form" 
        onSubmit={
          async(e)=>{
            e.preventDefault();
            
            const email= e.target.email.value;
            const password=e.target.password.value;

            const response = await axios.post("http://localhost:3000/api/auth/user/login",
            {
              email,
              password
            },{
              withCredentials:true
            })
            console.log(email);
            console.log(password);
            console.log(response.data);
            navigate("/")
            }
        }>
          <div className="field">
            <label>Email</label>
            <input id='email' name='email' type="email" placeholder="you@example.com" />
          </div>

          <div className="field">
            <label>Password</label>
            <input id='password' name='password' type="password" placeholder="Your password" />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Sign in</button>
            <button className="btn secondary" type="button">Create account</button>
          </div>

          <div className="small">Forgot password? Contact support to reset it.</div>
        </form>
      </div>
    </div>
  )
}

export default UserLogin;
