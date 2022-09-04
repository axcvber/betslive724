import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LocaleSwitch from './LocaleSwitch'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled } from '@mui/material/styles'
import useLocale from '../locales/useLocale'

const Navbar: React.FC<{ logoUrl: any; liveTvLink: string }> = ({ logoUrl, liveTvLink }) => {
  const router = useRouter()
  const t = useLocale()
  const matches = useMediaQuery('(max-width:899px)')

  return (
    <NavBarWrapper position='sticky' color='secondary'>
      <Container maxWidth='lg'>
        <NavBar disableGutters>
          <Logo url={logoUrl?.data.attributes.formats.thumbnail.url} />
          <Navigation>
            <ul>
              {t.navLinks.map((page) => (
                <li key={page.path}>
                  <Link href={page.path} passHref>
                    <NavLink className={router.pathname === page.path ? 'active' : ''}>{page.title}</NavLink>
                  </Link>
                </li>
              ))}
              <li>
                <NavLink href={liveTvLink} target='_blank' rel='noreferrer'>
                  {router.locale === 'en' ? 'Live Tv' : 'Canlı Tv'}
                </NavLink>
              </li>
              <LocaleSwitch />
            </ul>
          </Navigation>
          {matches && <MobileMenu liveTvLink={liveTvLink} />}
        </NavBar>
      </Container>
    </NavBarWrapper>
  )
}

const NavLink = styled('a')(({ theme }) => ({
  userSelect: 'none',
  backgroundColor: 'transparent',
  color: theme.palette.common.white,
  borderRadius: '5px',
  padding: '8px 10px',
  fontFamily: "'Ubuntu', sans-serif", //add font in theme as default
  transition: 'all 0.1s ease',
  fontSize: '15px',
  cursor: 'pointer',
  '&:hover': {
    background: theme.palette.primary.main,
  },
  '&.active': {
    background: theme.palette.primary.main,
  },
}))

const Navigation = styled('nav')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  width: '100%',
  justifyContent: 'center',
  [theme.breakpoints.down('lg')]: {
    position: 'static',
    justifyContent: 'flex-end',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  'ul': {
    display: 'flex',
    alignItems: 'center',
  },
  'li': {
    margin: '0 5px',
    '&:last-child': {
      marginRight: 0,
    },
  },
}))

const NavBar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
}))

const NavBarWrapper = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderBottom: `1px solid ${theme.palette.background.paper}`,
  boxShadow: 'none !important',
}))

export default Navbar
