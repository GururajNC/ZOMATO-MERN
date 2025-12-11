import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const UserLogin = ()=>{
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome back</h2>
          <p>Sign in to continue to your account.</p>
          <div style={{marginTop:10}} className="small">Are you a partner? <Link to="/food-partner/login">Switch to partner</Link></div>
        </div>

        <form className="auth-form" onSubmit={(e)=>e.preventDefault()}>
          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="Your password" />
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
