import { gql } from '@apollo/client'
import { GetStaticPaths } from 'next'
import React from 'react'
import ImageHeading from '../../components/ImageHeading'
import OptionsList from '../../components/OptionsList'
import { Typography } from '@mui/material'
import Link from 'next/link'
import { client } from '../../graphgl'
import Section from '../../theme/Section'
import { NextSeo } from 'next-seo'
import Head from 'next/head'

const BonusPage = ({ bonus, background }: any) => {
  return (
    <>
      <NextSeo title={`${bonus.casino.data.attributes.name} | BetsLive`} description={bonus.seo.metaDescription} />
      <Head>
        <meta name='keywords' content={bonus.seo.keywords} />
      </Head>

      <ImageHeading
        title={bonus.casino.data.attributes.name}
        subtitle={bonus.title}
        link={`/casinos/${bonus.casino.data.attributes.slug}`}
        imageUrl={bonus.casino.data.attributes.logo.data?.attributes.url}
        imageAlt={bonus.casino.data.attributes.logo.data?.attributes.alternativeText}
        backgroundUrl={background.url}
        backgroundAlt={background.alternativeText}
      />
      <Section>
        <>
          <div style={{ display: 'flex', marginBottom: '20px', flexWrap: 'wrap' }}>
            <Link href={`/casinos/${bonus.casino.data.attributes.slug}`} passHref>
              <a>
                <Typography
                  variant='h5'
                  color={'#FF1644'}
                  sx={{ marginRight: '10px', fontWeight: 500, textDecoration: 'underline' }}
                >
                  {bonus.casino.data.attributes.name}
                </Typography>
              </a>
            </Link>
            <Typography
              variant='h5'
              align='left'
              sx={{
                maxWidth: '100%',
                wordBreak: 'break-word',
                textTransform: 'uppercase',
                fontFamily: "'Ubuntu', sans-serif", //refactor
                fontWeight: 500,
              }}
              color={'white'}
            >
              {'BONUS DETAYLARI:'}
            </Typography>
          </div>
          <OptionsList options={bonus.options} />
        </>
      </Section>
    </>
  )
}

export const getStaticProps = async (context: any) => {
  const { params, locale } = context
  try {
    const { data, error } = await client.query({
      query: gql`
      query {
        bonusPage {
          data {
            attributes {
              page {
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
        bonuses(filters: { casino: {slug: {eq: "${params.slug}"}}}, locale: "${locale}") {
           data{
            attributes {
              seo {
                metaDescription
                keywords
              }
              title
              options {
                id
                title
                description
              }
              casino {
                data {
                  attributes {
                    name 
                    slug
                    logo {
                      data {
                        attributes {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
    }
      `,
    })
    if (error || !data) {
      return { notFound: true }
    }
    return {
      props: {
        bonus: data.bonuses.data[0].attributes,
        background: data.bonusPage.data.attributes.page.background.data.attributes,
      },
    }
  } catch (error) {
    return { notFound: true }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        bonuses(filters: { casino: { slug: { ne: "null" } } }, locale: "all") {
          data {
            attributes {
              casino {
                data {
                  attributes {
                    slug
                    locale
                  }
                }
              }
            }
          }
        }
      }
    `,
  })

  const paths =
    data.bonuses.data.map(({ attributes }: any) => ({
      params: { slug: attributes.casino.data.attributes.slug },
      locale: attributes.casino.data.attributes.locale,
    })) || []

  return { paths, fallback: false }
}

export default BonusPage
