import { styled } from '@mui/material/styles'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo: React.FC<{ url: string }> = ({ url }) => {
  return (
    <Link href='/' passHref>
      <StyledLogo>
        <Image alt='logo' src={url} priority layout='fill' objectFit='cover' />
      </StyledLogo>
    </Link>
  )
}

const StyledLogo = styled('a')(({ theme }) => ({
  width: 150,
  height: 50,
  position: 'relative',
  textAlign: 'center',
  zIndex: 9,
  [theme.breakpoints.down('sm')]: {
    width: 160,
  },
}))

export default Logo
