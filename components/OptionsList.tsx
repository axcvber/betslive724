import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import MarkdownIt from 'markdown-it'
import { styled } from '@mui/material/styles'
import { Grid, Typography } from '@mui/material'
import Accordion from './Accordion'

interface IOptionsList {
  options: any
}

const OptionsList: React.FC<IOptionsList> = ({ options }) => {
  const matches = useMediaQuery('(min-width:900px)')
  const md = new MarkdownIt({
    html: true,
  })

  return (
    <>
      {options &&
        options.map((item: any) => (
          <React.Fragment key={item.id}>
            {matches ? (
              <BodyInfoItem key={item.id}>
                <Grid container>
                  <Grid item xs={2}>
                    <Typography variant='body1' color={'white'} alignItems={'flex-start'}>
                      {item.title}:
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Marked dangerouslySetInnerHTML={{ __html: md.render(item.description) }} />
                  </Grid>
                </Grid>
              </BodyInfoItem>
            ) : (
              <Accordion key={item.id} title={item.title}>
                <Marked dangerouslySetInnerHTML={{ __html: md.render(item.description) }} />
              </Accordion>
            )}
          </React.Fragment>
        ))}
    </>
  )
}

const Marked = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  marginLeft: '50px',
  color: '#fff',
  fontSize: '15px',
  lineHeight: 1.8,
  'a': {
    color: theme.palette.primary.light,
    borderBottom: '1px solid transparent',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: theme.palette.primary.light,
    },
  },
  'ul li': {
    marginBottom: '10px',
    position: 'relative',
    paddingLeft: '20px',
    '&:last-child': {
      marginBottom: 0,
    },
  },

  'ul li::before': {
    content: '""',
    width: '8px',
    height: '8px',
    backgroundColor: theme.palette.primary.light,
    fontWeight: 'bold',
    display: 'flex',
    marginRight: '10px',
    borderRadius: '50px',
    position: 'absolute',
    top: 10,
    left: 0,
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}))

const BodyInfoItem = styled('div')({
  display: 'flex',
  padding: '15px',
  margin: '15px 0',
  background: '#333333',
  borderRadius: '5px',
})

export default OptionsList
