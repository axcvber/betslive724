import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LocaleSwitch from './LocaleSwitch'
import useLocale from '../locales/useLocale'

const MobileMenu: React.FC<{ liveTvLink: string }> = ({ liveTvLink }) => {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const t = useLocale()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton color='inherit' size='small' aria-label='open drawer' edge='end' onClick={handleDrawerOpen}>
        <MenuIcon sx={{ fontSize: '30px' }} />
      </IconButton>
      <StyledDrawer
        transitionDuration={{
          enter: 250,
          exit: 250,
        }}
        variant='temporary'
        anchor='right'
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton color='inherit' size='small' onClick={handleDrawerClose}>
            <ChevronRightIcon sx={{ fontSize: '30px' }} />
          </IconButton>
          <ul style={{ display: 'flex' }}>
            <LocaleSwitch />
          </ul>
        </DrawerHeader>
        <Divider />

        <Box component='nav'>
          <List sx={{ padding: '10px' }}>
            {t.navLinks.map((page) => (
              <NavLink key={page.path} isActive={router.pathname === page.path}>
                <Link href={page.path} passHref>
                  <a onClick={handleDrawerClose}>{page.title}</a>
                </Link>
              </NavLink>
            ))}
            <NavLink>
              <a href={liveTvLink} target='_blank' rel='noreferrer'>
                {router.locale === 'en' ? 'Live Tv' : 'Canlı Tv'}
              </a>
            </NavLink>
          </List>
        </Box>
      </StyledDrawer>
    </>
  )
}

export default MobileMenu

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  justifyContent: 'space-between',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 200,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 200,
    color: theme.palette.common.white,
    height: 'auto',
    background: theme.palette.secondary.main,
    borderLeft: `1px solid ${theme.palette.background.paper}`,
    borderBottom: `1px solid ${theme.palette.background.paper}`,
    borderBottomLeftRadius: '10px',
  },
  '& .MuiDivider-root': {
    background: theme.palette.primary.main,
  },
}))

const NavLink = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  userSelect: 'none',
  padding: '8px 15px',
  fontFamily: "'Ubuntu', sans-serif",
  margin: '5px 0',
  'a': {
    width: '100%',
    color: theme.palette.common.white,
  },
  '&:hover': {
    background: theme.palette.primary.main,
    borderRadius: '3px',
    '&::before': {
      background: theme.palette.common.white,
    },
  },
  ...(isActive && {
    '&::before': {
      content: "''",
      position: 'absolute',
      left: 2,
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'block',
      width: '6px',
      height: '5px',
      background: theme.palette.primary.main,
      marginRight: '15px',
      borderRadius: '50px',
    },
  }),
}))
