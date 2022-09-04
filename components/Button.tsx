import React from 'react'
import { styled } from '@mui/material/styles'
import Link from 'next/link'

interface IButton {
  link: string
  type: 'rLink' | 'blank'
  children: React.ReactChild
  variant?: 'primary' | 'secondary'
}

const Button: React.FC<IButton> = ({ type, children, link, variant = 'primary' }) => {
  switch (type) {
    case 'rLink':
      return (
        <Link href={link} passHref>
          <StyledBtn variant={variant}>{children}</StyledBtn>
        </Link>
      )
    case 'blank':
      return (
        <StyledBtn variant={variant} href={link} target='_blank' rel='noreferrer'>
          {children}
        </StyledBtn>
      )

    default:
      return null
  }
}

const StyledBtn = styled('a', {
  shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant: 'primary' | 'secondary' }>(({ theme, variant }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: '10px 25px',
  borderRadius: '3px',
  fontSize: '15px',
  lineHeight: 0.8,
  transition: 'all 0.3s ease',
  border: '1px solid transparent',

  '&:hover': {
    boxShadow: '0px 0px 17px 3px rgba(230, 27, 32, 0.56)',
  },
  ...(variant === 'secondary' && {
    background: 'transparent',
    borderColor: theme.palette.primary.main,
  }),
}))

export default Button
