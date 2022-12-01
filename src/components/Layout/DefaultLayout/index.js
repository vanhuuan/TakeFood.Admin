import { Box, CssBaseline, Grid, Toolbar } from '@mui/material'
import React from 'react'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'

const DefaultLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', background: '#F9F9FB' }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar />
        {children}
      </Box>
      {/* <Grid container columns={10} spacing={2}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={8}>
          {children}
        </Grid>
      </Grid> */}

    </Box>
  )
}

export default DefaultLayout
