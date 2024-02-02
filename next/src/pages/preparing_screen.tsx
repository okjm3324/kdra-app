import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const PreparingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h6" sx={{ mt: 2 }}>
        準備中です...
      </Typography>
      <Typography variant="body1">しばらくお待ちください。</Typography>
    </Box>
  )
}

export default PreparingScreen
