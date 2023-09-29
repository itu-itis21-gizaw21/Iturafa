import React from 'react';
import PostForm from '../PostForm';
import PostList from '../PostList';
import NavBar from '../NavBar';
import { useState } from 'react';
import { Divider } from '@mui/material';
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const HomePage = (props) => {

  const { myVariable } = props;
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const navigate = useNavigate();

  useEffect(() => {
        let path = window.location.pathname;

        if(path.includes("/x/")){
          let newPath = path.replace("/x/","/y/");
          navigate(newPath);
        }
      }, [navigate]);

  return (
    <div className="App">

      <NavBar myVariable={myVariable} newx={false}/>
      <PostForm myVariable={myVariable} pcheck={false} /> {/* Component for creating new posts */}
      <Box sx={{ margin: "1.5rem auto"}} border="1px solid #00D5FA" width= {isNonMobileScreen ? "55%": "95%"} he>
      <PostList myVariable={myVariable} /> {/* Component for displaying posts */}
      <Box sx={{ margin: "3rem"}} border="1px solid transparent" height="50%" ></Box>
    </div>
  );
}

export default HomePage;
