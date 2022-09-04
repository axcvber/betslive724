import React from 'react'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import Section from '../../theme/Section'

type IBannerPayload = {
  id: number
  attributes: any
}

interface IBanner {
  // images: Array<IBannerPayload>
  banners: any
}

const Banner: React.FC<IBanner> = ({ banners }) => {
  return (
    <Section>
      <BannerList>
        {banners &&
          banners.map((item: any, inx: number) => (
            <BannerListItem key={`${item.id + inx}`}>
              <a href={item.link} target='_blank' rel='noreferrer'>
                <Image
                  title='Banner Image'
                  src={item.images.data.attributes.formats.small.url}
                  layout='fill'
                  // height={item.images.data.attributes.height}
                  // width={item.images.data.attributes.width}
                  objectFit='cover'
                  placeholder='blur'
                  blurDataURL={item.images.data.attributes.formats.small.url}
                  alt={item?.images.data.attributes.alternativeText}
                  priority
                />
              </a>
            </BannerListItem>
          ))}
      </BannerList>
    </Section>
  )
}

const BannerListItem = styled('li')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    gridColumn: 'span 2',
  },
  '&:nth-of-type(1)': {
    gridColumn: 'span 2',
    gridRow: 'span 2',
    [theme.breakpoints.down('md')]: {
      gridColumn: 'span 4',
    },
    [theme.breakpoints.down('sm')]: {
      gridColumn: 'span 4',
      gridRow: 'span 1',
    },
  },
}))

const BannerList = styled('ul')(({ theme }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridAutoRows: '200px',
  gridGap: '10px',
}))

export default Banner
