import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './FileUpload.css';

function FileUpload() {

  let currentUser = localStorage.getItem("user_details");
  let currentUserId = JSON.parse(localStorage.getItem("user_details"))?.id;
  let currentUserEmail = JSON.parse(localStorage.getItem("user_details"))?.email;

  const history = useHistory();

  const [imageSelected, setImageSelected] = useState(null);
  const [uploadedImages, setUploadedImages] = useState(null);

  const uploadImage = () => {

    if (!imageSelected){
      alert("Please choose files to upload.");
      return;
    }

    for (let i = 0; i < imageSelected.length; i++){
      console.log("I ran");
      const formData = new FormData();
      formData.append("file", imageSelected[i]);
      formData.append("upload_preset", "omyfsewj");

      axios.post("https://api.cloudinary.com/v1_1/dczi19lhz/image/upload", formData)
      .then(res => {
        console.log(res);
        axios.post("http://localhost:5000/upload", {
          secureUrl: res.data.secure_url,
          userId: currentUserId
        })
        .then(response => {
          console.log("Post upload response is: ", response);
        })
        .catch(error => console.log(error))
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  return (
    <div>
      <div className="file-upload">
        <input 
          type="file" 
          multiple 
          onChange={e => setImageSelected(e.target.files)}
        />
        <button className="btn-primary" onClick={uploadImage}>Upload Image</button>
      </div>
    </div>
  )
}

export default FileUpload;
