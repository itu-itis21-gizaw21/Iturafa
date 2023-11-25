// TwitterFollowButton.jsx

import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';

const Socials = () => {
  const containerStyle = {
    textAlign: 'center',
    marginTop: '1rem',
  };

  const buttonStyle = {
    backgroundColor: '#00ACEE', // Twitter blue color
    color: 'white',
    borderRadius: '1rem',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#007BB5', // Darker shade on hover
    },
  };

  const iconStyle = {
    marginRight: '0.5rem',
  };

  return (
    <Box style={containerStyle}>
      <Button
        variant="contained"
        style={buttonStyle}
       
        href=""
        
      >
        {/* <TwitterIcon style={iconStyle} />*/}
        <Typography>Lutfen itirafınızı birbirinize saygı duyarak yazın aq!</Typography>
      </Button>
    </Box>
  );
};

export default Socials;
