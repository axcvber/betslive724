import React from 'react'
import { styled } from '@mui/material/styles'
import Image from 'next/image'

interface ICard {
  children: React.ReactChild
  variant?: 'secondary' | 'bonus'
  imageUrl: string
  alt: string
}

const Card: React.FC<ICard> = ({ children, variant, imageUrl, alt }) => {
  return (
    <CardItem variant={variant} className='swiper-lazy-loading'>
      <CartImage>
        {imageUrl && (
          <Image
            src={imageUrl}
            layout='fill'
            objectFit={variant === 'bonus' ? 'cover' : 'contain'}
            alt={alt}
            priority
          />
        )}
      </CartImage>
      <CartBody>{children}</CartBody>
    </CardItem>
  )
}

const CartBody = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '50%',
  padding: '15px',
})

const CartImage = styled('div')(({ theme }) => ({
  background: theme.palette.common.black,
  position: 'relative',
  width: '100%',
  height: '50%',
  overflow: 'hidden',
}))

const CardItem = styled('div', {
  shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant: string | undefined }>(({ theme, variant }) => ({
  color: theme.palette.common.white,
  userSelect: 'none',
  width: '100%',
  height: '260px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
  transition: 'all 0.2s ease',
  border: `1px solid ${theme.palette.grey[800]}`,
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    height: '300px',
  },
  ...(variant === 'secondary' && {
    background: theme.palette.common.black,
  }),
}))

export default Card
