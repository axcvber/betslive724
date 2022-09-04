import React from 'react'
import { SwiperSlide } from 'swiper/react'
import { Box, Rating, Typography } from '@mui/material'
import CardSlider from '../CardSlider'
import useLocale from '../../locales/useLocale'
import Heading from '../Heading'
import Section from '../../theme/Section'
import Button from '../Button'
import dynamic from 'next/dynamic'
// import Card from '../Card'

const Card = dynamic(() => import('../Card'), {
  ssr: false,
})

const Hero: React.FC<any> = ({ casinos, title, subtitle }) => {
  const t = useLocale()

  return (
    <Section>
      <>
        <Heading title={title} subtitle={subtitle} />
        {casinos && (
          <CardSlider count={casinos.length}>
            <>
              {casinos.map(({ attributes }: any, inx: number) => (
                <SwiperSlide key={inx} className='cartSlide' tag='li'>
                  <Card
                    variant='secondary'
                    imageUrl={attributes.logo.data.attributes.url}
                    alt={attributes.logo.data.attributes.alternativeText}
                  >
                    <>
                      <Rating
                        sx={{ '.MuiRating-iconEmpty': { color: '#333333' } }}
                        name='half-rating-read'
                        value={attributes.rating}
                        precision={0.5}
                        readOnly
                      />
                      <Typography>{attributes.name}</Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          'a:last-child': {
                            marginLeft: '10px',
                          },
                        }}
                      >
                        {attributes.casino.data?.attributes.slug && (
                          <Button
                            variant='secondary'
                            type='rLink'
                            link={`/casinos/${attributes.casino.data?.attributes.slug}`}
                          >
                            {t.button.info}
                          </Button>
                        )}
                        <Button type='blank' link={attributes.referalLink}>
                          {t.button.play}
                        </Button>
                      </Box>
                    </>
                  </Card>
                </SwiperSlide>
              ))}
            </>
          </CardSlider>
        )}
      </>
    </Section>
  )
}

export default Hero
