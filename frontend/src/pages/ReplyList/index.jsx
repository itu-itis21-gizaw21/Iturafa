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
import ReplyWidget from "pages/ReplyWidget";

const ReplyList = (props) => {
  const { myVariable, myId, commentId } = props;
  const dispatch = useDispatch();


  const posts = useSelector((state) => state.posts.find(post => post._id === myId));
 
  const replie = posts.comments.map(commentArray => {
    if (commentArray[commentId] && commentArray[commentId]["comments"]) {
      return commentArray[commentId]["comments"];
    } else {
      return [];
    }
  });
  const replies = replie.reverse();
  //console.log(replies)
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);  

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;


  
  if(!replies) return;
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
  return (
    <>
      {replies.map((replyArray, commentIndex) => {
        return replyArray.map((replyObj) => {
          const replyId = Object.keys(replyObj)[0];
          const replyData = replyObj[replyId];
          const { userName, description, createdAt, likes } = replyData;

          return (
            <ReplyWidget
              key={replyId || 0}
              replyId={replyId}
              postId={myId || 0}
              commentId={commentId}
              postUserId={myVariable}
              name={userName}
              description={description}
              createdAt={createdAt}
              likes={likes}
            />
          );
        });
      })}
    </>
  );
    }  
export default ReplyList;

