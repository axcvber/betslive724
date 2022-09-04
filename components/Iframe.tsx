import React from 'react'

const Iframe: React.FC<{ source: any }> = ({ source }) => {
  if (!source) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <iframe
        width='315'
        height='315'
        src={source}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default Iframe
