import { Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import Head from 'next/head'
import CardSlider from '../../components/CardSlider'
import { SwiperSlide } from 'swiper/react'
import Link from 'next/link'
import Background from '../../components/Background'
import { NextPage } from 'next'
import Heading from '../../components/Heading'
import Section from '../../theme/Section'
import { gql } from '@apollo/client'
import { client } from '../../graphgl'
import Button from '../../components/Button'
import useLocale from '../../locales/useLocale'
import Card from '../../components/Card'
import { shortString } from '../../utils/shortString'
import { NextSeo } from 'next-seo'

const Bonuses: NextPage = ({ bonusPage, bonuses }: any) => {
  const t = useLocale()

  return (
    <>
      <NextSeo title={`${t.seo.bonusesPage.title} | BetsLive`} description={bonusPage?.seo.metaDescription} />
      <Head>
        <meta name='keywords' content={bonusPage?.seo.keywords} />
      </Head>
      <Section>
        <>
          <Heading title={bonusPage?.page.title} subtitle={bonusPage?.page.subtitle} />
          <CardSlider count={bonuses.length}>
            <>
              {bonuses &&
                bonuses.map((item: any) => (
                  <SwiperSlide key={item.id} className='cartSlide' tag='li'>
                    <Card
                      variant='bonus'
                      imageUrl={item.attributes.bonusImage.data?.attributes.url}
                      alt={item.attributes.bonusImage.data?.attributes.alternativeText}
                    >
                      <>
                        <Typography variant='body1' sx={{ textAlign: 'center' }}>
                          {item.attributes.casino.data?.attributes.name} - {shortString(item.attributes.title)}
                        </Typography>

                        <Button type='rLink' link={`/bonuses/${item.attributes.casino.data?.attributes.slug}`}>
                          {t.button.details}
                        </Button>
                      </>
                    </Card>
                  </SwiperSlide>
                ))}
            </>
          </CardSlider>
        </>
      </Section>
      <Background url={bonusPage?.page.background.data.attributes.url} />
    </>
  )
}

export async function getStaticProps(context: any) {
  const { locale } = context

  const { data } = await client.query({
    query: gql`
      query {
        bonusPage(locale: "${locale}") {
          data {
            attributes {
              seo {
                metaDescription
                keywords
              }
              page {
                title
                subtitle
                background {
                  data {
                    attributes {
                      url
                      alternativeText
                    }
                  }
                }
              }
            }
          }
        }
        bonuses(filters: { casino: { slug: { ne: "null" } } }, locale: "${locale}") {
          data {
            id
            attributes {
              title
              casino {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
              bonusImage {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
            }
          }
        }
      }
    `,
  })

  return {
    props: {
      bonusPage: data.bonusPage.data?.attributes || null,
      bonuses: data.bonuses.data,
    },
  }
}

export default Bonuses
