import React from 'react'
import {Grid, Paper, ThemeProvider, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import CandlesChart from '../CandlesChart/CandlesChart'

const Home = () => {
  var theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
    <Grid container spacing={1} width="100%" sx={{mt:2,ml:1}}   >
      
      <Grid item xs={2} >
        <Paper sx={{minHeight:"83svh"}} >
          list of stocks
        </Paper>
      </Grid>

      <Grid item container xs={10} rowSpacing={1} columnSpacing={1}>
  <Grid item xs={9} sx={{}}>
    <Paper>
      <CandlesChart></CandlesChart>
    </Paper>
  </Grid>

  <Grid item xs={3}>
    <Paper sx={{minHeight:"49svh"}}>
    <Typography>2</Typography></Paper>
  </Grid>

  <Grid item xs={9}>
    <Paper sx={{minHeight:"32svh"}}>
    <Typography>3</Typography></Paper>
  </Grid>

  <Grid item xs={3}>
    <Paper sx={{minHeight:"32svh"}}>
    <Typography>4</Typography></Paper>
  </Grid>
</Grid>  

    </Grid></ThemeProvider>
  )
}

export default Home
