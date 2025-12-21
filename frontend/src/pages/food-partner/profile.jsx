import React, { useEffect, useState } from 'react'
import '../../styles/them.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';



const profile = () => {
  const {id} = useParams();
  // console.log(id);
  let [profile,setProfile]=useState({})

  let [video,setVideos] = useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:3000/api/food-partner/${id}`,{withCredentials:true})
    .then((response)=>{
      console.log(response.data.foodPartner)
      setProfile(response.data.foodPartner)
      setVideos(response.data.foodPartner.foodItems)
    })
  },[id])

 console.log(video);

  const videos = new Array(9).fill(0)
  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-top">
          <img className="avatar" src='https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'> 
          </img>
          
          <div className="info">
            <div className="pill business">
              {profile.name}
            </div>
            <div className="pill address">
              {profile.address}
            </div>
          </div>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="label">total meals</div>
            <div className="value">{profile?.meals}</div>
          </div>
          <div className="stat">
            <div className="label">customer serve</div>
            <div className="value">{profile?.server}</div>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="grid">
        {video.map((v) => (
          <div className="video-card" key={v._id}>

            <video 
             style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            src={v.video} muted></video>

          </div>
        ))}
      </div>
    </div>
  )
}

export default profile