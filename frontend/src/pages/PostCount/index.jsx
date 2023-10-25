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
      
      fontWeight="bold"
      margin = "auto !important"
     
    >
      <Typography variant="h3" color="red" fontWeight="500" border="1px solid green" borderRadius="0.5rem" p={1}>
        {`itüraflar (${sx?.numbers})`}
      </Typography>
      
    </Box>
  );
};

export default PostCount;
