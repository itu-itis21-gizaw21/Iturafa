import React from 'react';
import PostForm from '../PostForm';
import PostList from '../PostList';
import NavBar from '../NavBar';
import { useState } from 'react';
import { Divider } from '@mui/material';
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Socials from '../Socials';
import PostCount from '../PostCount';

const HomePage = (props) => {

  const { myVariable } = props;
  
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const [shouldReload, setShouldReload] = useState(true);

  const navigate = useNavigate();

  const mounted = useRef(false);
  if ((localStorage.getItem('reloadx')) == "1"){
     localStorage.setItem('reloadx','2');
     window.location.reload(true);
  }
  // window.location.reload(true);
/*
  useEffect(() => {
    const componentDidMount = () => {
    const reloadCount = sessionStorage.getItem('reloadCount');
    if(reloadCount < 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }
    componentDidMount();
  },[]);*/
/*
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      window.location.reload();
    }
  }, []);*/
/*
  useEffect(() => {
  if (shouldReload) {
      setShouldReload(false);
      window.location.reload();
    }
  }, [shouldReload]); */

  return (
    <div className="App">

      <NavBar myVariable={myVariable} newx={false}/>
      <PostForm myVariable={myVariable} pcheck={false} /> {/* Component for creating new posts */}
      <Socials/>
      <Box sx={{ margin: "1.5rem auto"}} border="1px solid #00D5FA" width= {isNonMobileScreen ? "55%": "95%"} />
      <PostCount count={10} />
      <PostList myVariable={myVariable} /> {/* Component for displaying posts */}
      <Box sx={{ margin: "3rem"}} border="1px solid transparent" height="50%" ></Box>
    </div>
  );
}

export default HomePage;
