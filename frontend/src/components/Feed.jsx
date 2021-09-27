import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';

import './Feed.css';

function Feed() {

  const [feedPics, setFeedPics] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/images")
    .then(res => {
    console.log(res.data);
    setFeedPics(res.data);
    })
  }, []);

  return (
    <div className="feed">
      <h1>FEED</h1>
      {feedPics.map(eachPic => {
        return (
          <Image
          className="feed-pic"
          key={eachPic.id}
          cloudName="dczi19lhz"
          publicId={eachPic.image_url}
        />
        )
      })}
    </div>
  )
}

export default Feed;
