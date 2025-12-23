import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Saved = () => {
  const [saved, setSaved] = useState([])

useEffect(() => {
  axios
    .get("http://localhost:3000/api/food/save", { withCredentials: true })
    .then(response => {

      const savedFoods = response.data.savedFoods
        .filter(item => item.food) // ✅ EXTRA SAFETY
        .map(item => ({
          _id: item.food._id,
          video: item.food.video,
          description: item.food.description,
          likeCount: item.food.likeCount,
          savesCount: item.food.savesCount,
          commentsCount: item.food.commentsCount,
          foodPartner: item.food.foodPartner,
        }));

      setSaved(savedFoods);
    })
    .catch(err => {
      console.error(err);
      setSaved([]);
    });
}, []);


  const remove = async (id) => {
    const response = await axios.post(
    "http://localhost:3000/api/food/save",
    { foodId: id }, 
    { withCredentials: true }
  )

  console.log(response.data);
     setSaved(prev => prev.filter(item => item._id !== id));
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
