import React from 'react'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Head from 'next/head'
import { CssBaseline } from '@mui/material'
import { theme } from '../theme'
import { ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import { client } from '../graphgl'
import { gql } from '@apollo/client'
import { useRouter } from 'next/router'
import LineLoading from '../components/LinearDeterminate'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../theme/createEmotionCache'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()
interface MyAppProps extends AppProps {
  cmsData: any
  emotionCache?: EmotionCache
}

let cmsDataCache: any
function MyApp(props: MyAppProps) {
  const { Component, cmsData, emotionCache = clientSideEmotionCache, pageProps } = props

  const router = useRouter()
  const rTheme = responsiveFontSizes(theme)
  const [state, setState] = React.useState({
    isRouteChanging: false,
    loadingKey: 0,
  })

  React.useEffect(() => {
    cmsDataCache = cmsData
  }, [])

  React.useEffect(() => {
    const handleRouteChangeStart = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }))
    }

    const handleRouteChangeEnd = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }))
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeEnd)
    router.events.on('routeChangeError', handleRouteChangeEnd)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeEnd)
      router.events.off('routeChangeError', handleRouteChangeEnd)
    }
  }, [router.events])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='google' content='notranslate' />
      </Head>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={rTheme}>
        <CssBaseline />
        <LineLoading isRouteChanging={state.isRouteChanging} key={state.loadingKey} />
        <Layout cmsData={cmsData}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  )
}

MyApp.getInitialProps = async () => {
  if (cmsDataCache) {
    return { cmsData: cmsDataCache }
  }
  const { data } = await client.query({
    query: gql`
      query {
        theme {
          data {
            attributes {
              navLogo {
                data {
                  attributes {
                    url
                    formats
                  }
                }
              }
              footerLogo {
                data {
                  attributes {
                    url
                    formats
                  }
                }
              }
              socialIcons {
                id
                icon {
                  data {
                    attributes {
                      url
                      alternativeText
                    }
                  }
                }
                link
              }
              liveTvLink
            }
          }
        }
      }
    `,
  })
  cmsDataCache = data.theme.data?.attributes
  return { cmsData: data.theme.data?.attributes }
}

export default MyApp
