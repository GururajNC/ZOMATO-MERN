import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import { Link } from 'react-router-dom'

const Saved = () => {
  const [saved, setSaved] = useState([])

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('savedVideos') || '[]')
      setSaved(s)
    } catch (e) { setSaved([]) }
  }, [])

  const remove = (id) => {
    const next = saved.filter((s) => s._id !== id)
    localStorage.setItem('savedVideos', JSON.stringify(next))
    setSaved(next)
  }

  return (
    <div className="saved-page">
      <header className="saved-header">
        <h2>Saved</h2>
        <Link to="/">back</Link>
      </header>

      <div className="saved-list">
        {saved.length === 0 && (
          <div className="empty-saved">No saved videos</div>
        )}

        {saved.map((it) => (
          <div className="saved-item" key={it._id}>
            <video src={it.video} className="saved-thumb" controls />
            <div className="saved-meta">
              <div className="saved-desc">{it.description}</div>
              <div style={{marginTop:8}}>
                <button className="small-btn" onClick={() => remove(it._id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Saved
