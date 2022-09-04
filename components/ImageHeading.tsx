import React from 'react'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import { Typography } from '@mui/material'
import Link from 'next/link'

interface IImageHeading {
  title: string
  subtitle?: string
  link?: string
  imageUrl: string
  imageAlt: string
  backgroundUrl: string
  backgroundAlt: string
}

const ImageHeading: React.FC<IImageHeading> = ({
  link,
  title,
  subtitle,
  imageUrl,
  imageAlt,
  backgroundUrl,
  backgroundAlt,
}) => {
  return (
    <Wrapper>
      <Background>
        {backgroundUrl && (
          <Image
            src={backgroundUrl}
            layout='fill'
            objectFit='cover'
            objectPosition={'center'}
            placeholder='blur'
            blurDataURL={backgroundUrl}
            alt={backgroundAlt}
          />
        )}
      </Background>
      <Content>
        <ImageContainer>
          {link ? (
            <Link href={link} passHref>
              <a>
                {imageUrl && (
                  <Image
                    priority
                    className='logo_image'
                    src={imageUrl}
                    layout='fill'
                    objectFit='contain'
                    alt={imageAlt}
                  />
                )}
              </a>
            </Link>
          ) : (
            imageUrl && (
              <Image priority className='logo_image' src={imageUrl} layout='fill' objectFit='contain' alt={imageAlt} />
            )
          )}
        </ImageContainer>
        <ContentText>
          <Typography
            variant='h3'
            component='h1'
            color={'white'}
            sx={{
              maxWidth: '100%',
              wordBreak: 'break-word',
              textTransform: 'uppercase',
              fontFamily: "'Ubuntu', sans-serif", //refactor
              fontWeight: 500,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant='h6'
            paragraph
            color={'white'}
            sx={{
              margin: '5px 0 0 0',
              wordBreak: 'break-word',
              textTransform: 'uppercase',
              fontFamily: "'Ubuntu', sans-serif", //refactor
            }}
          >
            {subtitle}
          </Typography>
        </ContentText>
      </Content>
    </Wrapper>
  )
}

const Background = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -1,
  width: '100%',
  height: '400px',
  filter: 'brightness(40%)',
  borderBottom: '1px solid gray',
  [theme.breakpoints.down('md')]: {
    height: '500px',
  },
}))

const ContentText = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '600px',
  [theme.breakpoints.down('md')]: {
    marginTop: '10px',
    alignItems: 'center',
    textAlign: 'center',
  },
}))

const ImageContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '150px ',
  height: '150px',
  display: 'flex',
  marginRight: '30px',
  '.logo_image': {
    background: '#000',
    borderRadius: '100%',
    border: '2px solid #333333 !important',
  },
  [theme.breakpoints.down('md')]: {
    marginRight: 0,
  },
}))

const Content = styled('div')(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  // background: 'red',
  // padding: '0 10px',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))

const Wrapper = styled('header')(({ theme }) => ({
  width: '100%',
  height: '333px',
  overflow: 'hidden',
  // padding: '20px 0',
  [theme.breakpoints.down('md')]: {
    height: '433px',
  },
}))

export default ImageHeading
