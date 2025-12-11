import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

 


const UserRegister = ()=>{
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create your account</h2>
          <p>Register as a user to browse delicious restaurants nearby.</p>
          <div style={{marginTop:10}} className="small">Are you a partner? <Link to="/food-partner/register">Switch to partner</Link></div>
        </div>
       

        <form className="auth-form" 
        onSubmit={
         async (e)=>{
            e.preventDefault();
            const fullname = e.target.fullName.value;
            const email = e.target.email.value;
            const password = e.target.password.value;

            const response = await axios.post("http://localhost:3000/api/auth/user/register",
              {
                fullname,
                email,
                password
              },
              {
                withCredentials:true
              }
            );

            console.log(response.data);

            navigate('/');
            
            // console.log(fullname);
            // console.log(email);
            // console.log(password);
          }

        }>
          <div className="field">
            <label>Full name</label>
            <input type="text" placeholder="John Doe" id="fullName" name='fullName' />
          </div>

          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" id='email' name = 'email' />
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="Create a password" id = 'password' name='password' />
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
