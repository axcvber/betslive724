import { styled } from '@mui/material/styles'
import { Container, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import Logo from './Logo'

const Footer = ({ socialIcons, logoUrl }: any) => {
  const [hostname, setHostname] = React.useState<string | undefined>('')

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setHostname(window?.location.hostname)
    }
  }, [])

  return (
    <StyledFooter>
      <FooterNav>
        <Logo url={logoUrl?.data.attributes.formats.thumbnail.url} />
        <Typography sx={{ order: 3 }} variant='caption'>
          &copy; 2006-{new Date().getFullYear()} {hostname}
        </Typography>
        <SocialNetworks>
          {socialIcons &&
            socialIcons.map((item: any) => (
              <a key={item.id} target={'_blank'} href={item.link}>
                <Image
                  src={item.icon.data.attributes.url}
                  width={22}
                  height={22}
                  alt={item.icon.data.attributes.alternativeText}
                />
              </a>
            ))}
        </SocialNetworks>
      </FooterNav>
    </StyledFooter>
  )
}

const FooterNav = styled(Container)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}))

const SocialNetworks = styled('div')(({ theme }) => ({
  display: 'flex',
  order: 3,
  'a': {
    margin: '0 6px',
    display: 'flex',
  },
  [theme.breakpoints.down('sm')]: {
    order: 2,
    margin: '15px 0',
    'a': {
      margin: '0 10px',
    },
  },
}))

const StyledFooter = styled('footer')(({ theme }) => ({
  marginTop: 'auto',
  width: '100%',
  padding: '10px 0',
  borderTop: `1px solid ${theme.palette.background.paper}`,
  color: '#7a7a7a',
  background: '#000',
  [theme.breakpoints.down('sm')]: {
    padding: '20px 0',
  },
}))

export default Footer
