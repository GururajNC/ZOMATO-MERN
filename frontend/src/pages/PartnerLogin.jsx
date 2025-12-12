import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const PartnerLogin = ()=>{
  const navigate=useNavigate()
  
return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Partner sign in</h2>
          <p>Access your partner dashboard and manage orders.</p>
          <div style={{marginTop:10}} className="small">Looking for a user account? <Link to="/user/login">Switch to user sign in</Link></div>
        </div>

        <form className="auth-form" onSubmit={async(e)=>{e.preventDefault();
        const email=e.target.email.value;
        const password =e.target.password.value;
        console.log(email);
        console.log(password);
       const response= await axios.post("http://localhost:3000/api/auth/foodpartner/login",{
          email,
          password
        },{
          withCredentials:true
        })

        console.log(response.data);
        navigate("/createfoodpartner")
        }
        }>
          <div className="field">
            <label>Email</label>
            <input id='email' name='email' type="email" placeholder="owner@restaurant.com" />
          </div>

          <div className="field">
            <label>Password</label>
            <input id='password' name='password' type="password" placeholder="Your password" />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Sign in</button>
            <button className="btn secondary" type="button">Register</button>
          </div>

          <div className="small">Need help? Contact support for partner access.</div>
        </form>
      </div>
    </div>
  )
}

export default PartnerLogin;
