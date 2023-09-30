import React from 'react';
import PostForm from '../PostForm';
import PostListY from '../PostListX';
import NavBar from '../NavBar';
import { useState } from 'react';
import { Divider } from '@mui/material';
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Hidden = (props) => {

  const { myVariable } = props;
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  return (
    <div className="App">
    
      <NavBar myVariable={myVariable} newx={true}/> 
      <Box sx={{ margin: "1.5rem auto"}} borderBottom="2px solid #00D5FA" width= {isNonMobileScreen ? "55%": "95%"} height="50%" ></Box>
      <PostListY myVariable={myVariable} /> {/* Component for displaying posts */}
      <Box sx={{ margin: "3rem"}} border="1px solid transparent" height="50%" ></Box>
    </div>
  );
}

export default Hidden;
