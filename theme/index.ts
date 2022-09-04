import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          WebkitTapHighlightColor: 'transparent',
          margin: 0,
          padding: 0,
        },
        '*::after, *::before': {
          boxSizing: 'border-box',
        },
        body: {
          lineHeight: 1,
          // background: '#1E1E1E',
          'ul, li': {
            listStyle: 'none',
          },
          'h1,h2,h3,h4,h5,h6': {
            margin: 0,
          },
          a: {
            textDecoration: 'none',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Ubuntu'].join(','),
    h3: {
      fontFamily: "'Ubuntu', sans-serif",
      // fontWeight: 600,
    },
  },
  palette: {
    // mode: 'dark',
    // #171717 gray
    primary: {
      light: '#FF1644',
      main: '#E61B20',
    },
    secondary: {
      main: '#000000', //rem
    },
    background: {
      default: '#141414', //body bg
      paper: '#1E1E1E',
      //1E1E1E
    },
  },
})
