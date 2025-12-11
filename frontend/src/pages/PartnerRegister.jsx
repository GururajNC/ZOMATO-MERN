import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import axios from 'axios';

const PartnerRegister = ()=>{

  const navigate= useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const name =e.target.name.value;
    const email =e.target.email.value;
    const address =e.target.address.value;
    const phone = e.target.phone.value;
    const city =e.target.city.value;
    const password= e.target.password.value;

    // console.log(name);
    // console.log(email);
    // console.log(address);
    // console.log(phone);
    // console.log(city);
    // console.log(password);

    const response = await axios.post("http://localhost:3000/api/auth/foodpartner/register",{
      name,email,address,phone,city,password
    },{
      withCredentials:true
    })

    console.log(response.data);
    navigate("/")
    // TODO: replace with real submit logic
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Partner onboarding</h2>
          <p>Register your restaurant or service to receive orders.</p>
          <div style={{marginTop:10}} className="small">Looking for a user account? <Link to="/user/register">Switch to user register</Link></div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Business name</label>
            <input name ='name' type="text" placeholder="e.g. The Green Spoon" />
          </div>

          <div className="field">
            <label>Contact email</label>
            <input name = 'email' type="email" placeholder="owner@restaurant.com" />
          </div>

          <div className="field">
            <label>Address</label>
            <textarea name = 'address' rows={3} placeholder="Street address, suite, postal code" />
          </div>

          <div className="row">
            <div className="field">
              <label>Phone</label>
              <input name = 'phone' type="tel" placeholder="+1 555 555 5555" />
            </div>
            <div className="field">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
              />
            </div>
          </div>

          <div className="field">
            <label>Password</label>
            <input name= 'password' type="password" placeholder="Create a password" />
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
