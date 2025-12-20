import React, { useEffect } from 'react'
import '../../styles/them.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';



const profile = () => {
  const {id} = useParams();
  console.log(id);

  useEffect(()=>{
    axios.get(`http://localhost:3000/api/food-partner/${id}`,{withCredentials:true})
    .then((response)=>{
      console.log(response.data);
    })
    
  },[id])


  const videos = new Array(9).fill(0)
  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-top">
          <div className="avatar" />
          <div className="info">
            <div className="pill business">business name</div>
            <div className="pill address">Address</div>
          </div>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="label">total meals</div>
            <div className="value">43</div>
          </div>
          <div className="stat">
            <div className="label">customer serve</div>
            <div className="value">15K</div>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="grid">
        {videos.map((_, i) => (
          <div className="video-card" key={i}>
            <span>video</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default profile