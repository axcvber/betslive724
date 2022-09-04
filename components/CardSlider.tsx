import React, { ReactChild } from 'react'
import { Grid, Autoplay, Pagination, Lazy } from 'swiper'
import { Swiper } from 'swiper/react'
import { styled } from '@mui/material/styles'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

interface ICardSlider {
  children: ReactChild
  count: number
}

const CardSlider: React.FC<ICardSlider> = ({ children, count }) => {
  return (
    <StyledSwiper
      lazy={{
        loadPrevNext: true,
        loadingClass: 'swiper-lazy-loading',
      }}
      modules={[Grid, Autoplay, Pagination, Lazy]}
      slidesPerView={5}
      spaceBetween={20}
      wrapperTag='ul'
      pagination={{
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 5,
      }}
      grid={{
        rows: 2,
        fill: 'row',
      }}
      autoplay={{
        delay: 5000,
      }}
      longSwipes={false}
      breakpoints={{
        0: {
          slidesPerView: count > 1 ? 1.2 : 1,
          pagination: {
            dynamicMainBullets: 3,
          },
          grid: {
            rows: 1,
          },
        },
        600: {
          slidesPerView: 2.2,
          grid: {
            rows: 1,
          },
        },
        700: {
          slidesPerView: 3.2,
          grid: {
            rows: 1,
          },
        },
        900: {
          slidesPerView: 4,
          grid: {
            rows: 2,
          },
          pagination: {
            dynamicMainBullets: 5,
          },
        },
        1200: {
          slidesPerView: 5,
        },
      }}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {children}
    </StyledSwiper>
  )
}

const StyledSwiper = styled(Swiper)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(2),
  padding: '5px !important',
  paddingBottom: '35px !important',
  [theme.breakpoints.down('sm')]: {
    width: '80%',
  },

  '.cartSlide': {
    // maxHeight: '400px',
    // borderRadius: '10px',
    // boxShadow: '0px 0px 14px -4px rgba(255, 0, 0, 0.6)',
  },
  '.swiper-pagination': {
    bottom: '0 !important',
    '.swiper-pagination-bullet': {
      width: '30px',
      height: '5px',
      borderRadius: 0,
      opacity: 0.5,
      backgroundColor: '#545454',
    },
    '.swiper-pagination-bullet-active': {
      backgroundColor: theme.palette.primary.main,
      opacity: 1,
    },
  },
}))

export default CardSlider
