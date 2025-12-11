import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const UserRegister = ()=>{
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create your account</h2>
          <p>Register as a user to browse delicious restaurants nearby.</p>
          <div style={{marginTop:10}} className="small">Are you a partner? <Link to="/food-partner/register">Switch to partner</Link></div>
        </div>

        <form className="auth-form" onSubmit={(e)=>e.preventDefault()}>
          <div className="field">
            <label>Full name</label>
            <input type="text" placeholder="John Doe" />
          </div>

          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="Create a password" />
          </div>

          <div className="divider" />

          <div className="actions">
            <button className="btn" type="submit">Create account</button>
            <button className="btn secondary" type="button">Sign in</button>
          </div>

          <div className="small">By creating an account you agree to our terms and privacy policy.</div>
        </form>
      </div>
    </div>
  )
}

export default UserRegister;
