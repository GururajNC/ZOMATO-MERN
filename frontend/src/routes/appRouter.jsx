import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';
import PartnerRegister from '../pages/PartnerRegister';
import PartnerLogin from '../pages/PartnerLogin';
import Home from '../pages/general/Home.jsx'
import Createfoodpartner from '../pages/food-partner/createfoodpartner.jsx';
import Profile from '../pages/food-partner/profile.jsx';

const appRouter = () => {
  return (
    <div>
        <Router>
            <Routes>
                 <Route path="/user/register" element={ <UserRegister/>} />
                 <Route path="/user/login" element={<UserLogin/>} />
                 <Route path="/food-partner/register" element ={<PartnerRegister/>} />
                 <Route path="/food-partner/login" element = {<PartnerLogin/>} />
                 <Route path="/" element = {<Home/>} />
                 <Route path="/createfoodpartner" element={<Createfoodpartner/>} />
                 <Route path = "/food-partner/:id" element={<Profile/>} />

            </Routes>
        </Router>
    </div>
  )
}

export default appRouter