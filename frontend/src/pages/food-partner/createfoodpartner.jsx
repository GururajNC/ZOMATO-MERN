import React, { useState } from 'react'
import '../../styles/theme.css'
import '../../styles/createfoodpartner.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateFoodPartner = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState('')

  const navigate = useNavigate()

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoFile(file)
      setVideoUrl(URL.createObjectURL(file))
    } else {
      setVideoFile(null)
      setVideoUrl('')
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const form = new FormData()
    form.append('name', name)
    form.append('description', description)
    if (videoFile) form.append('video', videoFile)

    // TODO: call API to create food resource

    const response = await axios.post('http://localhost:3000/api/food/',
       form,
      {withCredentials:true}
    );

    console.log(response.data);

    // console.log('submit:', { name, description, videoFile })

    // reset
    setName('')
    setDescription('')
    setVideoFile(null)
    setVideoUrl('')

    navigate("/");

  }

  return (
    <div className="create-food-page">
      <div className="create-food-card">
        <div className="create-header">
          <div className="title-row">
            <h1>🍽️ Create Delicious Dish</h1>
          </div>
          <p className="sub">Add a mouth-watering item. Upload a short video to showcase it.</p>
        </div>

        <form className="create-form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Name <span className="label-emoji">🍔</span></label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Food name (e.g., Spicy Paneer Wrap)"
            />
          </div>

          <div className="field">
            <label>Description <span className="label-emoji">📝</span></label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short, tasty description"
            />
          </div>

          <div className="field">
            <label>Video <span className="label-emoji">🎬</span></label>
            <input
              id="videoInput"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              style={{ display: 'none' }}
            />

            <label htmlFor="videoInput" className="file-drop">
              <div className="file-drop-inner">
                <div className="file-icon">📤</div>
                <div className="file-text">
                  {videoFile ? (
                    <>
                      <strong>{videoFile.name}</strong>
                      <span className="muted"> • {Math.ceil(videoFile.size / 1024)} KB</span>
                    </>
                  ) : (
                    <>
                      Click to upload or drag a short video (max 60s)
                    </>
                  )}
                </div>
              </div>
            </label>

            {videoUrl && (
              <div className="video-preview">
                <div className="video-wrap">
                  <video controls src={videoUrl} />
                  <div className="play-overlay">▶</div>
                </div>
              </div>
            )}
          </div>

          <div className="actions">
            <button
              type="button"
              className="btn secondary"
              onClick={() => {
                setName('')
                setDescription('')
                setVideoFile(null)
                setVideoUrl('')
                // reset underlying file input
                const inp = document.getElementById('videoInput')
                if (inp) inp.value = ''
              }}
            >
              Reset
            </button>
            <button className="btn" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateFoodPartner