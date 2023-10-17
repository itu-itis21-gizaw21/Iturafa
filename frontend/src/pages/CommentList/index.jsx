import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchPosts } from "../../state";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import FlexBetween from "components/FlexBetween";
import FlexAround from "components/FlexAround";
import PostWidget from "pages/PostWidget";
import CommentWidget from "pages/CommentWidget";
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined
} from "@mui/icons-material";

import { 
    Box, 
    IconButton,
    Typography, 
    Divider, 
    useTheme 
} from "@mui/material";

const CommentList = (props) => {
  const { myVariable, myId } = props;
  const dispatch = useDispatch();
  //const posts = useSelector((state) => state.posts);

  //const posts = useSelector((state) => state.posts.find(post => post._id === myId));
  const postsx = useSelector((state) => state.posts);
  const posts = postsx.find((post) => post._id === myId);
 //console.log(posts);
 const commentPost = posts ? posts.comments : [];

 //console.log(commentPost);
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);  

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  //useEffect(() => {
  //  dispatch(fetchPosts());
  //}, [dispatch]);
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    // Pad the day, month, and year with zeros if necessary.
    const paddedDay = day < 10 ? `0${day}` : day;
    const paddedMonth = month < 10 ? `0${month}` : month;
    const paddedYear = year < 1000 ? `0${year}` : year;
  
    const paddedHours = hours < 10 ? `0${hours}` : hours;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    // Format the date in the desired format.
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds} ${paddedDay}-${paddedMonth}-${paddedYear}`;
  }

  if (!commentPost) return null;
  //commentPost.map((comment, index) => console.log(comment.index));
  //console.log(commentPost);
  const comx = commentPost.map(commentObj => commentObj[Object.keys(commentObj)[0]]);



  return(
    <>
    {comx.map((comment, index) => (
      <CommentWidget
        key={index}
        commentId= {comment?.commentId}
        postId={myId}
        postUserId={myVariable}
        name={comment.userName}
        description={comment.description}
        createdAt={comment.createdAt}
        likes={comment.likes}
        comments={comment.comments}
        isSingle = {false}
        
    />)
    )}
 
    </>
  );
};

export default CommentList;

{/*}

  
  
  */}

{/* 


      

    commentPost.map((comment, index) => (
  <PostWidget
    key={index}
    userName={comment.userName}
    description={comment.description}
    createdAt={comment.createdAt}
    likes={comment.likes}
    comments={comment.comments}
  />
))



export default PostList;

*/}
