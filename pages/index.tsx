import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Background from '../components/Background'
import Hero from '../components/HomeSection/Hero'
// import VideoView from '../components/HomeSection/VideoView'
import { client } from '../graphgl'
import { gql } from '@apollo/client'
import { NextSeo } from 'next-seo'
import useLocale from '../locales/useLocale'
import dynamic from 'next/dynamic'

const VideoView = dynamic(() => import('../components/HomeSection/VideoView'), { ssr: false })
const Banner = dynamic(() => import('../components/HomeSection/Banner'), { ssr: false })
const AboutUs = dynamic(() => import('../components/HomeSection/AboutUs'), { ssr: false })

const Home: NextPage = ({ homePage, casinos }: any) => {
  const t = useLocale()

  return (
    <>
      <NextSeo title={`${t.seo.homePage.title} | BetsLive`} description={homePage?.seo.metaDescription} />
      <Head>
        <meta name='keywords' content={homePage?.seo.keywords} />
      </Head>
      <Background url={homePage?.page.background.data?.attributes.formats.large.url} />
      <Hero title={homePage?.page.title} subtitle={homePage?.page.subtitle} casinos={casinos} />
      <VideoView links={homePage?.videos} />
      <Banner banners={homePage?.bannerImages} />
      <AboutUs content={homePage?.aboutUs} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context
  const { data } = await client.query({
    query: gql`
    query {
      homePage(locale: "${locale}") {
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
                    alternativeText
                    url
                    formats
                  }
                }
              }
            }
            videos {
              id
              iframeLink
            }
            bannerImages {
              id
              images {
                data {
                  attributes {
                    url
                    alternativeText
                    width
                    height
                    formats
                  }
                }
              }
              link
            }
            aboutUs {
              title
              description
            }
          }
        }
      }
      heroCasinos(sort: "priority:desc") {
        data {
          id
          attributes {
            name
            rating
            referalLink
            logo {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
            casino {
              data {
                attributes {
                  slug
                }
              }
            }
          }
        }
      }
    }
    `,
  })

  return { props: { homePage: data.homePage.data?.attributes || null, casinos: data.heroCasinos.data } }
}

export default Home
