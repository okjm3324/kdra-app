import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ed9fa0',
    },
    secondary: {
      main: '#6173a5',
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
