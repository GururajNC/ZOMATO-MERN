import React, { useEffect, useRef, useState } from 'react'
import '../../styles/reels.css'
import axios from "axios"
import { Link } from 'react-router-dom'
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
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem('savedVideos') || '[]')
      return s.map((it) => it._id)
    } catch (e) { return [] }
  })
  const [likes, setLikes] = useState({})

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

  // useEffect(() => {
  //   // ensure likes entries exist
  //   const map = {}
  //   videos.forEach((v) => { map[v._id] = likes[v._id] || 0 })
  //   setLikes(map)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [videos])

  async function toggleSave(item){
   const response = await axios.post(
    "http://localhost:3000/api/food/save",
    { foodId: item._id }, 
    { withCredentials: true }
  )
    console.log(response.data);
    if (response.data.SaveFood){
      // console.log("saved video")
   setVideos((prev)=>
        prev.map(v=>
          v._id===item._id ? {...v, saveCount : v.saveCount + 1} : v
        )
      )
  }else{
    // console.log("removed from save (1)")
     setVideos(prev=>
      prev.map(
        v=>v._id===item._id ? {...v , saveCount: v.saveCount - 1 } : v 
      )
    )
  }

  }
  
async function handleLike(item) {
 

    // console.log(item._id);
    const response = await axios.post(
      "http://localhost:3000/api/food/like",
      { foodId: item._id },
      { withCredentials: true }
    );

    // console.log(response.data.like)

    if(response.data.like){
      console.log("liked video");
      setVideos((prev)=>
        prev.map(v=>
          v._id===item._id ? {...v, likeCount : v.likeCount + 1} : v
        )
      )
    }else {
      console.log("unliked video ");
      setVideos((prev)=>
        prev.map(v=>
          v._id===item._id ? {...v, likeCount : v.likeCount -1 } : v
        )
      )
    }
  }


  const handleComment = (item) => {
    const text = prompt('Add comment:')
    if (text) alert('Comment added')
  }

  return (
    <div className="reels-container" ref={containerRef}>
      {videos.map((item) => (
        <section className="reel-item" key={item._id}>
          <div className="reel-overlay">
            <p className="reel-desc">{item.description}</p>
            <Link className="reel-btn"  to={"/food-partner/" + item.foodPartner}>visit store</Link>
          </div>

          <div className="reel-icons">
            <div className="reel-icon-wrap">
              <button className="icon-btn" onClick={() => handleLike(item)} aria-label="like">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 .0-7.8z"></path></svg>
              </button>
              <div className="icon-meta">likes: {item.likeCount}</div>
            </div>

            <div className="reel-icon-wrap">
              <button className={`icon-btn `} onClick={() => toggleSave(item)} aria-label="save">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              </button>
              <div className="icon-meta">save: {item.saveCount}</div>
            </div>

            <div className="reel-icon-wrap">
              <button className="icon-btn" onClick={() => handleComment(item)} aria-label="comment">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </button>
              <div className="icon-meta">comment: {item.commentsCount }</div>
            </div>
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

      <nav className="bottom-nav">
        <Link to="/" className="nav-btn">
          <div className="nav-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"></path></svg>
          </div>
          <div className="nav-label">home</div>
        </Link>
        <Link to="/saved" className="nav-btn">
          <div className="nav-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div className="nav-label">saved</div>
        </Link>
      </nav>
    </div>
  )
}

export default Home