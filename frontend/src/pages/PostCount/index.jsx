import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../state";
import { useEffect } from "react";
import { useState } from "react";
const PostCount = ({ count }) => {
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const page = 1;
      const response = await fetch(`/api/posts?page=${page}`);
      const post = await response.json();
      setPosts(post);
    
    } finally {
      
    }
  };
  fetchData();

  }, []);

  const sx = posts[0];
  console.log(sx?.numbers)
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={1}
      backgroundColor="background.default"
      borderRadius="0.5rem"
      border = "1px solid #238636"
      width= "30%"
      ml = "0%"
      mb = "0px !important"
      fontSize = "2rem"
    >
      <Typography variant="h6" color="textSecondary">
        {`itüraflar (${sx?.numbers})`}
      </Typography>
      
    </Box>
  );
};

export default PostCount;
