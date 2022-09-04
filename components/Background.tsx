import React from 'react'
import { styled } from '@mui/material/styles'
import Image from 'next/image'

interface IBackground {
  url?: string
  path?: StaticImageData
}

const Background: React.FC<IBackground> = ({ url, path }) => {
  return (
    <Wrapper>
      {url && !path && (
        <Image
          priority
          src={url}
          alt='background'
          layout='fill'
          objectFit='cover'
          placeholder='blur'
          blurDataURL={url}
          quality={100}
        />
      )}
      {!url && path && (
        <Image priority src={path} alt='background' layout='fill' objectFit='cover' placeholder='blur' quality={100} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  minHeight: '100vh',
  filter: 'brightness(40%)',
  zIndex: -1,
})

export default Background
