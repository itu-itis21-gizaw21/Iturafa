import NavBar from 'pages/NavBar';
import NotificationList from 'pages/NotificationList';
import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import './index.css';

const Notification = (props) => {
  const { myVariable } = props;
  const [LikeNot, setLikeNot] = useState([]);
  const [ CommentNot, setCommentNot ] = useState([]);
  const [CommentLikeNot, setCommentLikeNot] = useState([]);
  const [CommentCommentNot, setCommentCommentNot] = useState([]);
  const [ReplyLikeNot, setReplyLikeNot] = useState([]);
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
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds} ${paddedDay}/${paddedMonth}-${paddedYear}`;
  }

  useEffect(() => {
    const getPostLikeNotification = async () => {
      const response = await fetch(`/api/posts/user/like/${myVariable}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const Xresponse = await response.json();
      setLikeNot(Xresponse);
    };

    const getPostCommentNotification = async () => {
      const response = await fetch(`/api/posts/user/comment/${myVariable}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const Xresponse = await response.json();
      setCommentNot(Xresponse);
    };

    const getCommentLikeNotification = async () => {
      const response = await fetch(`/api/posts/post/comment/${myVariable}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const Xresponse = await response.json();
      setCommentLikeNot(Xresponse);
    };

    const getCommentCommentNotification = async () => {
      const response = await fetch(`/api/posts/post/reply/${myVariable}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const Xresponse = await response.json();
      setCommentCommentNot(Xresponse);
    };

    const getReplyLikeNotification = async () => {
      const response = await fetch(`/api/posts/post/comment/replies/${myVariable}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const Xresponse = await response.json();
      setReplyLikeNot(Xresponse);
    };


    getPostLikeNotification();
    getPostCommentNotification();
    getCommentLikeNotification();
    getCommentCommentNotification();
    getReplyLikeNotification();
  }, [myVariable]);

  console.log(LikeNot);
  console.log(CommentNot);
  console.log(ReplyLikeNot);
  console.log(CommentCommentNot);
  
/*   if (LikeNot.length === 0) return;
  if (CommentNot.length === 0) return;
  if (CommentLikeNot.length === 0) return;
  if (CommentCommentNot.length === 0) return; */

 //LikeNot.sort((a, b) => new Date(b.likedAt) - new Date(a.likedAt));
 //CommentNot.sort((a, b) => new Date(b.commentedAt) - new Date(a.commentedAt));
  if(LikeNot == CommentNot == ReplyLikeNot == CommentCommentNot){
    console.log("Noooooooooooo");
    return (
      <>
        <NavBar myVariable={myVariable} not={true} />
        <div style={{margin: "2rem"}}>
        <h2>Yeni bildiriminiz yok. <br/> Bildirim almak için ituraf edin :) </h2>
        </div>
      </>
    );
  }

const myDic = new Map();
LikeNot.forEach((item, index) => {
  if (item.likesCount !== 0) {
    const message = new Map();
    message.set("type", "LIKE");
    message.set("parent", "POST");
    message.set("description", item.description);
    message.set("postId", item.postId);
    message.set("count", item.likesCount)
    message.set("time", formatDate(new Date(item.likedAt)));    
    myDic.set(item.likedAt, message);
  }
});

CommentNot.forEach((item, index) => {
  if (item.commentsCount !== 0) {
    const message = new Map();
    message.set("type", "COMMENT");
    message.set("parent", "POST");
    message.set("description", item.description);
    message.set("postId", item.postId);
    message.set("count", item.commentsCount)
    message.set("time", formatDate(new Date(item.commentedAt)));
    myDic.set(item.commentedAt, message);
  }
});

CommentLikeNot.forEach((postArray, postIndex) => {
  postArray.forEach((item, index) => {
    if (item.likesCount !== 0) {
      const message = new Map();
      message.set("type", "LIKE");
      message.set("parent", "COMMENT");
      message.set("description", item.description);
      message.set("postId", item.postId);
      message.set("count", item.likesCount)
      message.set("time", formatDate(new Date(item.likedAt)));     
      myDic.set(item.likedAt, message);
    }
  });
});

ReplyLikeNot.forEach((item, postIndex) => {
    if (item.likesCount !== 0) {
      const message = new Map();
      message.set("type", "LIKE");
      message.set("parent", "REPLY");
      message.set("description", item.description);
      message.set("postId", item.postId);
      message.set("count", item.likesCount)
      message.set("time", formatDate(new Date(item.likedAt)));     
      myDic.set(item.likedAt, message);
    }

});

CommentCommentNot.forEach((postArray, postIndex) => {
  postArray.forEach((item, index) => {
    if (item.commentsCount !== 0) {
     
      const message = new Map();
      message.set("type", "COMMENT");
      message.set("parent", "COMMENT");
      message.set("description", item.description);
      message.set("postId", item.postId);
      message.set("count", item.commentsCount)
      message.set("time", formatDate(new Date(item.commentedAt)));
      myDic.set(item.commentedAt, message);
     
    }
  });
});

//const sortedDic = new Map([...myDic.entries()].sort((a, b) => new Date(a[0]) - new Date(a[b])));
const sortedDic = new Map([...myDic.entries()].sort((a, b) => new Date(b[0]) - new Date(a[0])));

return (
  <>


  <div>
    <NavBar myVariable={myVariable} not={true} />
    <div style={{margin: "2rem"}}></div>
    <div className="animation-container">
    {Array.from(sortedDic.values()).map((message, index) => (
      <div key={index}  style={{ animationDelay: `${0.4 + index * 0.4}s` }}>
        <NotificationList 
          type={message.get("type")} 
          parent={message.get("parent")} 
          description={message.get("description")} 
          postId={message.get("postId")} 
          count={message.get("count")} 
          time={message.get("time")} 
        />
      </div>
    ))}
    </div>
    <Box sx={{ margin: "2rem"}} border="1px solid transparent" height="50%" ></Box>
      
  </div>
  </>
);
}

export default Notification;
