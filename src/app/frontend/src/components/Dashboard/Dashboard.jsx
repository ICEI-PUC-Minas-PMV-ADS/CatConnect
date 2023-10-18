import React from 'react';
import "../Dashboard/Dashboard.css";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const Dashboard = () => {
  return (
    <Box>
      <h1> Dashboard</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={8}>
          <div className="ResumoBox">
            <p>Grid1</p>
            </div>
          </Grid>

          <Grid item xs={8}>
          <p>Grid2</p>
          </Grid>

          <Grid item xs={8}>
          <p>Grid3</p>
          </Grid>

          <Grid item xs={4}>
          <p>Grid4</p>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
};

export default Dashboard;