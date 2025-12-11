import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const PartnerRegister = ()=>{
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Partner onboarding</h2>
          <p>Register your restaurant or service to receive orders.</p>
          <div style={{marginTop:10}} className="small">Looking for a user account? <Link to="/user/register">Switch to user register</Link></div>
        </div>

        <form className="auth-form" onSubmit={(e)=>e.preventDefault()}>
          <div className="field">
            <label>Business name</label>
            <input type="text" placeholder="e.g. The Green Spoon" />
          </div>

          <div className="field">
            <label>Contact email</label>
            <input type="email" placeholder="owner@restaurant.com" />
          </div>

          <div className="field">
            <label>Address</label>
            <textarea rows={3} placeholder="Street address, suite, postal code" />
          </div>

          <div className="row">
            <div className="field">
              <label>Phone</label>
              <input type="tel" placeholder="+1 555 555 5555" />
            </div>
            <div className="field">
              <label>City</label>
              <input type="text" placeholder="City" />
            </div>
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="Create a password" />
          </div>

          <div className="divider" />

          <div className="actions">
            <button className="btn" type="submit">Register</button>
            <button className="btn secondary" type="button">Sign in</button>
          </div>

          <div className="small">We'll review your application and get back within 2 business days.</div>
        </form>
      </div>
    </div>
  )
}

export default PartnerRegister;
