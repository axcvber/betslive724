import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { client } from '../../graphgl'
import { gql } from '@apollo/client'
import OptionsList from '../../components/OptionsList'
import ImageHeading from '../../components/ImageHeading'
import Section from '../../theme/Section'
import Head from 'next/head'
import { NextSeo } from 'next-seo'

const CasinoPage = ({ casino, background }: any) => {
  console.log('oneCasino', casino)

  return (
    <>
      <NextSeo title={`${casino.name} | BetsLive`} description={casino.seo.metaDescription} />
      <Head>
        <meta name='keywords' content={casino.seo.keywords} />
      </Head>

      <ImageHeading
        imageUrl={casino.logo.data.attributes.url}
        imageAlt={casino.logo.data.attributes.alternativeText}
        title={casino.name}
        backgroundUrl={background.url}
        backgroundAlt={background.alternativeText}
      />
      <Section>
        <OptionsList options={casino.options} />
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
        casinoPage {
          data {
            attributes {
              page {
                background {
                  data {
                    attributes {
                      alternativeText
                      url
                    }
                  }
                }
              }
            }
          }
        }
        casinos(filters: { slug:{eq: "${params.slug}"}},  locale: "${locale}") {
            data {
              attributes {
                seo {
                  metaDescription
                  keywords
                }
                name
                slug
                logo {
                  data {
                    attributes{
                      alternativeText
                      url
                    }
                  }
                }
                options {
                  id 
                  title
                  description
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
        casino: data.casinos.data[0].attributes,
        background: data.casinoPage.data.attributes.page.background.data.attributes,
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
        casinos(locale: "all") {
          data {
            attributes {
              slug
              locale
            }
          }
        }
      }
    `,
  })

  const paths =
    data.casinos.data.map(({ attributes }: any) => ({
      params: { slug: attributes.slug },
      locale: attributes.locale,
    })) || []

  return { paths, fallback: false }
}

export default CasinoPage
