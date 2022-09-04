import { ClickAwayListener, InputAdornment, Rating, TextField, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'
import Head from 'next/head'
import CardSlider from '../../components/CardSlider'
import { SwiperSlide } from 'swiper/react'
import Background from '../../components/Background'
import { NextPage } from 'next'
import Heading from '../../components/Heading'
import Section from '../../theme/Section'
import { client } from '../../graphgl'
import { gql } from '@apollo/client'
import Button from '../../components/Button'
import useLocale from '../../locales/useLocale'
import Card from '../../components/Card'
import { GoSearch } from 'react-icons/go'
import { NextSeo } from 'next-seo'

const Casinos: NextPage = ({ casinoPage, casinos, error }: any) => {
  const t = useLocale()
  const [value, setValue] = React.useState('')
  const [isOpen, setOpen] = React.useState(true)

  const filteredCasinos = casinos.filter((casino: any) => {
    return casino.attributes.name.toLowerCase().includes(value.toLowerCase())
  })

  const itemClickHandler = (value: any) => {
    setValue(value)
    setOpen(!isOpen)
  }

  return (
    <>
      <NextSeo title={`${t.seo.casinosPage.title} | BetsLive`} description={casinoPage?.seo.metaDescription} />
      <Head>
        <meta name='keywords' content={casinoPage?.seo.keywords} />
      </Head>
      <Section>
        <>
          <Heading title={casinoPage?.page.title} subtitle={casinoPage?.page.subtitle} />
          {casinos.length > 10 && (
            <SearchWrapper>
              <SearchField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GoSearch />
                    </InputAdornment>
                  ),
                }}
                placeholder={t.search.placeholder}
                hiddenLabel
                variant='filled'
                size='small'
                value={value}
                autoComplete='off'
                onChange={(e) => setValue(e.target.value)}
                onClick={() => setOpen(true)}
              />
              {value && isOpen ? (
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                  <Autocomplete>
                    {filteredCasinos.map(({ attributes }: any, inx: number) => (
                      <li key={inx} onClick={() => itemClickHandler(attributes.name)}>
                        <Typography color={'white'}>{attributes.name}</Typography>
                      </li>
                    ))}
                  </Autocomplete>
                </ClickAwayListener>
              ) : null}
            </SearchWrapper>
          )}
          <CardSlider count={filteredCasinos.length}>
            <>
              {filteredCasinos.length ? (
                filteredCasinos.map((item: any) => (
                  <SwiperSlide key={item.id} className='cartSlide' tag='li'>
                    <Card
                      imageUrl={item.attributes.logo.data.attributes.url}
                      alt={item.attributes.logo.data.attributes.alternativeText}
                    >
                      <>
                        <Rating
                          sx={{ '.MuiRating-iconEmpty': { color: 'gray' } }}
                          name='half-rating-read'
                          value={item.attributes.rating}
                          precision={0.5}
                          readOnly
                        />
                        <Typography variant='body1'>{item.attributes.name}</Typography>
                        <Button type='rLink' link={`/casinos/${item.attributes.slug}`}>
                          {t.button.info}
                        </Button>
                      </>
                    </Card>
                  </SwiperSlide>
                ))
              ) : (
                <Typography color='white'>{t.search.notFound}</Typography>
              )}
            </>
          </CardSlider>
        </>
      </Section>
      <Background url={casinoPage?.page.background.data.attributes.url} />
    </>
  )
}

export async function getStaticProps(context: any) {
  const { locale } = context
  const { data } = await client.query({
    query: gql`
    query {
      casinoPage(locale: "${locale}") {
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
                  }
                }
              }
            }
          }
        }
      }
    casinos(sort: "priority:desc", locale: "${locale}") {
      data {
        id
        attributes {
          name
          slug
          rating
          logo {
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
    `,
  })
  return { props: { casinoPage: data.casinoPage.data?.attributes || null, casinos: data.casinos.data } }
}

const Autocomplete = styled('ul')({
  width: '100%',
  position: 'absolute',
  top: '100%',
  left: 0,
  marginTop: '5px',
  background: '#333333',
  zIndex: 99,
  userSelect: 'none',
  maxHeight: '200px',
  height: 'auto',
  overflowY: 'auto',
  borderRadius: '3px',
  boxShadow: '0px 0px 8px 0px rgba(62, 62, 62, 0.79)',
  'li': {
    padding: '10px',
    cursor: 'pointer',
    '&:hover': {
      background: '#7A7A7A',
    },
  },
})

const SearchWrapper = styled('div')(({ theme }) => ({
  width: '250px',
  marginTop: '10px',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    width: '80%',
    margin: '10px auto 0 auto',
  },
}))

const SearchField = styled(TextField)(({ theme }) => ({
  'svg': {
    color: '#777676',
  },
  '.MuiFilledInput-root': {
    backgroundColor: 'rgba(255,255,255, 0.1) !important',
    color: '#fff',
    '&::before': {
      borderBottom: '2px solid #777676 !important',
    },
  },
}))

export default Casinos
