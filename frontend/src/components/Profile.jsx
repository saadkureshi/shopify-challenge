import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Image } from 'cloudinary-react';
import axios from 'axios';

import './Profile.css';

function Profile() {

  let currentUser = localStorage.getItem("user_details");
  let currentUserId = JSON.parse(localStorage.getItem("user_details"))?.id;
  let currentUserEmail = JSON.parse(localStorage.getItem("user_details"))?.email;

  const [myPics, setMyPics] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/images/${currentUserId}`)
    .then(res => {
    console.log(res.data);
    setMyPics(res.data);
    })
  }, []);

  return (
    <div className="profile">
      <Card className="profile-card" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Your Details</Card.Title>
          <Card.Text>Email: {currentUserEmail}</Card.Text>
          <Card.Text className="text-muted">Free Plan</Card.Text>
        </Card.Body>
      </Card>
      <div>
      <h1>Your Uploads</h1>
        {myPics.map(eachPic => {
          return (
            <Image
            className="my-pic"
            key={eachPic.id}
            cloudName="dczi19lhz"
            publicId={eachPic.image_url}
          />
          )
        })}
      </div>
    </div>
  )
}

export default Profile;
