import React, { useState } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import './FileUpload.css';

function FileUpload(props) {

  const [imageSelected, setImageSelected] = useState(null);

  const uploadImage = () => {
    console.log(imageSelected);
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "omyfsewj");

    axios.post("https://api.cloudinary.com/v1_1/dczi19lhz/image/upload", formData)
    .then(res => {
      console.log(res);
      axios.post("http://localhost:5000/upload", {
        secureUrl: res.data.secure_url,
        userId: props.currentUserId
      })
      .then(response => console.log(response))
      .catch(error => console.log(error))
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <div className="file-upload">
        <input 
          type="file" 
          onChange={e => setImageSelected(e.target.files[0])}
        />
        <button className="btn-primary" onClick={uploadImage}>Upload Image</button>
      </div>
    </div>
  )
}

export default FileUpload;
