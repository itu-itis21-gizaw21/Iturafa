import React from 'react';
import PostForm from '../PostForm';
import PostList from '../PostList';
import NavBar from '../NavBar';


import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostWidget from 'pages/PostWidget';
import CommentList from 'pages/CommentList';
import CommentForm from 'pages/CommentForm';
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../state";

const SinglePost = (props) => {

  const { myVariable } = props;
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const [post, setPost] = useState(null);

  
  const { postId } = useParams();
  const [page, setPage] = useState(1);

  const getPage = async () => {

    const response = await fetch(`/api/postspage/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    });

    const data = await response.json();
    return data;
  }

   getPage().then((data) => {
      setPage(data); 
      }).catch((err) => {
        console.log(err);
      });
 
  const dispatch = useDispatch();
  
  useEffect(() => {
     
    const fetchData = async () => {
      try {
        await dispatch(fetchPosts(page));
      } finally {
      }
    };

    fetchData();
  }, [page, dispatch]);

  const posts = useSelector((state) => state.posts);
  const selectedPost = posts.find((post) => post._id === postId);
  if (!selectedPost) return null;
  return (
    <div className="App">
    
     <NavBar myVariable={myVariable}/> 
      
            
           <PostWidget
            
                key={selectedPost._id ||0}
                postId={selectedPost._id || 0}
                postUserId={myVariable}
                name={selectedPost.userName}
                description={selectedPost.description}
                createdAt={selectedPost.createdAt}
                likes={selectedPost.likes}
                dislikes={selectedPost?.dislikes || [{}]}
                comments={selectedPost.comments} 
                isSingle = {true}
                hidden={selectedPost.hidden || false}
                undeletable={selectedPost.undeletable || false}
            />
          
          <Box sx={{ margin: "1.5rem auto"}} border="1px solid #00D5FA" width="80%" height="50%">

          </Box>
    <CommentList myVariable={myVariable} myId={postId}/>
    <Box sx={{ margin: "2rem"}} border="1px solid transparent" height="50%" ></Box>
    </div>
  );
}

export default SinglePost;

