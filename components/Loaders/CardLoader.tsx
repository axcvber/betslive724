import React from 'react'
import ContentLoader from 'react-content-loader'
const CardLoader = () => {
  return (
    <div>
      <ContentLoader
        speed={2}
        width={215}
        height={260}
        viewBox='0 0 215 260'
        backgroundColor='#000000'
        foregroundColor='#2b2b2b'
      >
        <rect x='0' y='0' rx='10' ry='10' width='215' height='260' />
      </ContentLoader>
    </div>
  )
}

export default CardLoader
