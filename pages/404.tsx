import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Background from '../components/Background'
import Button from '../components/Button'
import useLocale from '../locales/useLocale'
import bg from '../public/bg.jpg'

export default function Custom404() {
  const t = useLocale()
  return (
    <Wrapper>
      <HeadingTitle>
        <StatusCode>404</StatusCode>
        <Typography
          variant='h4'
          color='white'
          sx={{ margin: '20px 0', fontWeight: 'light', textShadow: '#212121 1px 0 15px' }}
        >
          {t.page404.title}
        </Typography>
        <Button type='rLink' link={'/'}>
          {t.page404.btn}
        </Button>
      </HeadingTitle>
      <Background path={bg} />
    </Wrapper>
  )
}

const StatusCode = styled('h1')(({ theme }) => ({
  fontSize: '200px',
  color: '#fff',
  textShadow: '#212121 1px 0 15px',
  lineHeight: 0.75,
  [theme.breakpoints.down('sm')]: {
    fontSize: '120px',
  },
}))

const HeadingTitle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
})

const Wrapper = styled('div')({
  width: '100%',
  height: 'calc(100vh - 140px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
