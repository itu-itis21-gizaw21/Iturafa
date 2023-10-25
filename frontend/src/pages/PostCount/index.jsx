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
      const response = await fetch(`http://localhost:3001/api/posts?page=${page}`);
      const post = await response.json();
      setPosts(post);
    
    } finally {
      
    }
  };
  fetchData();

}, []);

  const sx = posts[0];
  console.log(sx?.likedAt)
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={1}
      backgroundColor="background.default"
      borderRadius="0.5rem"
      border = "1px solid red"
      width= "30%"
      ml = "10%"
      fontSize = "2rem"
    >
      <Typography variant="h6" color="textSecondary">
        {`Posts (${sx?.likedAt})`}
      </Typography>
      
    </Box>
  );
};

export default PostCount;
