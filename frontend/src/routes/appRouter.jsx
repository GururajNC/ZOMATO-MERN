import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const appRouter = () => {
  return (
    <div>
        <Router>
            <Routes>
                 <Route path="/user/register" element={ <h1> user register</h1>} />
                 <Route path="/user/login" element={<h1> user login</h1>} />
                 <Route path="/food-partner/register" element ={<h1> food-partner register</h1>} />
                 <Route path="/food-partner/login" element = {<h1> food-partner login</h1>} />
            </Routes>
        </Router>
    </div>
  )
}

export default appRouter