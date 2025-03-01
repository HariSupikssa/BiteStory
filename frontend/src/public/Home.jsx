import React from 'react'
import './style.css'
const Home = () => {
  return (
    <div className="home-con">
      <h1 className="title is-1">A Tale of flavours!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida,<br />
        risus at dapibus aliquet, elit quam scelerisque tortor, nec accumsan erosbr
        <br />
        nulla interdum justo. Pellentesque dignissim, sapien et congue rutrum,<br />
        lorem tortor dapibus turpis, sit amet vestibulum eros mi et odio.
      </p>
      <button className="button sage-button" style={{ color: "white", borderRadius: "6px", }}>Share your secret Recipe!</button>

      {/* <div className="card flex">card 1</div> */}

    </div>
  )
}

export default Home
