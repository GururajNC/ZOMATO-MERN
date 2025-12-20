import React, { useEffect, useRef, useState } from 'react'
import '../../styles/reels.css'
import axios from "axios"
import { useNavigate,Link } from 'react-router-dom'
const sampleVideos = [
  {
    id: 1,
    src: 'https://res.cloudinary.com/dixznparc/video/upload/v1765288701/k6rk8habhmys5kfii3nx.mp4',
    description: 'Fresh biryani with authentic spices — made daily by local partners.',
    store: '#'
  },
  {
    id: 2,
    src: 'https://res.cloudinary.com/dixznparc/video/upload/v1765288701/k6rk8habhmys5kfii3nx.mp4',
    description: 'Street-style tacos with a crispy shell and fresh salsa.',
    store: '#'
  },
  {
    id: 3,
    src: 'https://res.cloudinary.com/dixznparc/video/upload/v1765288701/k6rk8habhmys5kfii3nx.mp4',
    description: 'Homemade desserts — sweet, soft and absolutely delightful.',
    store: '#'
  }
]

const Home = () => {
  const containerRef = useRef(null)
  const [videos,setVideos] = useState([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const videos = Array.from(container.querySelectorAll('video'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (entry.intersectionRatio >= 0.6) {
            const playPromise = video.play()
            if (playPromise && typeof playPromise.then === 'function') playPromise.catch(() => {})
          } else {
            try {
              video.pause()
            } catch (e) {}
          }
        })
      },
      { threshold: [0.25, 0.5, 0.75] }
    )

    videos.forEach((v) => {
      v.muted = true
      v.playsInline = true
      observer.observe(v)
    })

    return () => {
      observer.disconnect()
    }
  })

  useEffect(()=>{
    axios.get("http://localhost:3000/api/food",{withCredentials :true})
    .then(response=>{
      console.log(response.data)

      setVideos(response.data.foodItems)
    })
    .catch((error) => {
      console.error(error);
    });
  },[])

  return (
    <div className="reels-container" ref={containerRef}>
      {videos.map((item) => (
        <section className="reel-item" key={item._id}>
          <div className="reel-overlay">
            <p className="reel-desc">{item.description}</p>
            <Link className="reel-btn"  to={"/food-partner/" + item.foodPartner}>Visit Store</Link>
          </div>

          <video
            src={item.video}
            loop
            autoPlay
            playsInline
            muted
            preload="metadata"
            className="reel-video"
          />
        </section>
      ))}
    </div>
  )
}

export default Home