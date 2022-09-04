import Head from 'next/head'
import Script from 'next/script'
import React from 'react'
import { styled } from '@mui/material/styles'
import { NextSeo } from 'next-seo'
import useLocale from '../../locales/useLocale'
import Heading from '../../components/Heading'
import Section from '../../theme/Section'
import Background from '../../components/Background'

const Score = () => {
  const t = useLocale()

  return (
    <>
      <NextSeo title={`${t.seo.liveScorePage.title} | BetsLive`} description={'desc'} />
      <Head>
        {/* <meta name='keywords' content={'live score keywords...'} /> */}
        {/* <script type='module' src='https://widgets.api-sports.io/football/1.1.8/widget.js'></script> */}
        {/* <script type='text/javascript' src='https://tr.livescore.bz/jsd-bzwidget_v2.js' async></script> */}

        <Script src='https://tr.livescore.bz/jsd-bzwidget_v2.js' />
        <Script id='show-banner'>
          {`var bzVars={"c_bg":"#2b2b2b","c_clr":"#ffffff","l_bg":"#c7c7c7","l_fw":"bold","m_bg":"#e3e3e3","m_bg2":"#e3e3e3","score_bg":"#b6ece5","fa":"Arial, Helvetica, sans-serif"};
var bzCs={"list":"live","date":true,"flags":true};`}
        </Script>
      </Head>
      {/* <Script
        id='wg-api-football-livescore'
        src='https://widgets.api-sports.io/football/1.1.8/widget.js'
        strategy='beforeInteractive'
        onLoad={() => {
          console.log('loaded widget')
        }}
      /> */}
      <Section>
        <>
          <Heading title='Yakinda aktif olacaktir.1' />
          {/* <div
            id='wg-api-football-livescore'
            data-refresh='60'
            data-host='v3.football.api-sports.io'
            data-key='f1e96ba3eda1edb81b5e239517c3782e'
            data-theme='dark'
            data-show-errors='false'
            className='api_football_loader'
            style={{ marginTop: '20px' }}
          ></div> */}
          <a href='https://www.macskorlari.net/' data-w='' title='iddaa sonuçları'>
            {/* macskorlari.net */}
          </a>
        </>
      </Section>
      <Background
        url={
          'https://res.cloudinary.com/betslive/image/upload/v1642610568/photo_1626775238053_4315516eedc9_0bc2f397b8.jpg?updated_at=2022-01-19T16:42:51.643Z'
        }
      />
    </>
  )
}

const Widget = styled('div')({
  '.api_football_loader': {
    // background: 'red',
    // color: 'red',
  },
})

export default Score
