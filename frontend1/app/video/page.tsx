import React from 'react'

const Page = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/SvAWoZBFc0I"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default Page