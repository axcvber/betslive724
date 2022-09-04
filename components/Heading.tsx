import { Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'

interface IHeading {
  title: string
  subtitle?: string
  secondary?: boolean
}

const Heading: React.FC<IHeading> = ({ title, subtitle, secondary }) => {
  return (
    <Wrapper>
      <Typography component={secondary ? 'h2' : 'h1'} variant='h3' color={'white'} sx={{ textAlign: 'center' }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography
          paragraph
          variant='subtitle1'
          color={'white'}
          sx={{
            position: 'relative',
            margin: 0,
            textAlign: 'center',
            '&::before': {
              content: '""',
              width: '100px',
              display: 'block',
              height: '2px',
              background: '#E61B20',
              margin: '10px auto',
            },
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Wrapper>
  )
}

const Wrapper = styled('div')(({ theme }) => ({
  maxWidth: '75%',
  wordBreak: 'break-word',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    maxWidth: '90%',
  },
}))

export default Heading
