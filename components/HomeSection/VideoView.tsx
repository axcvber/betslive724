import React from 'react'
import { styled } from '@mui/material/styles'
import Iframe from 'react-iframe'
import Section from '../../theme/Section'
import dynamic from 'next/dynamic'

// const DynamicIframe = dynamic(() => import('react-iframe'), {
//   loading: () => <div style={{ display: 'flex', width: '33.3333%', height: '320px', background: 'gray' }}></div>,
//   ssr: false,
// })

type IframePayload = {
  id: number
  iframeLink: string
}

interface IVideoView {
  links: Array<IframePayload>
}

const VideoView: React.FC<IVideoView> = ({ links }) => {
  return (
    <Section>
      <Wrapper>
        {links &&
          links.map((item) => (
            <Iframe
              title='Youtube Video'
              key={item.id}
              url={item.iframeLink}
              height='320px'
              className='home-iframe'
              allowFullScreen
              frameBorder={0}
            />
          ))}
      </Wrapper>
    </Section>
  )
}

const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  '.home-iframe': {
    margin: '3px',
    flex: '1 1 auto',
  },
}))

export default VideoView
