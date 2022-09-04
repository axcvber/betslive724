import { Box } from '@mui/material'
import React from 'react'

const Section: React.FC<{ children: React.ReactChild }> = ({ children }) => {
  return (
    <Box mt={3} mb={3} component={'section'}>
      {children}
    </Box>
  )
}

export default Section
