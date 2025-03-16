import React from 'react'
import './style.css'
const Home = () => {
  return (
    <div className="home-con">

      <h1 className="title is-1">A Tale of flavours!</h1>
      <p>
        Cooking is more than just following recipes—it’s about sharing the love, creativity,<br />
        and stories behind every dish. Whether it’s your grandma’s secret sauce, a quick hack<br />
        for the perfect weeknight dinner, or that dessert you’ve been perfecting for years,<br />
        this is the place to share it all. Join a community of food lovers who are passionate<br />
        about discovering new flavors, swapping tips, and celebrating the joy of cooking.<br />
        Let’s turn every meal into a masterpiece, together!
      </p>
      <button className="button sage-button" style={{ color: "white", borderRadius: "6px", }}>Share your secret Recipe!</button>

      {/* <div className="card flex">card 1</div> */}

    </div>
  )
}

export default Home
