import React from "react";

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
    useTheme ,
    useMediaQuery
} from "@mui/material";

import { Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { Snackbar, SnackbarContent, Alert } from "@mui/material";

import FlexAround from "components/FlexAround";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addPost } from "state";
import CommentForm from "pages/CommentForm";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import  ReplyForm  from "pages/ReplyForm";
import ReplyList from "pages/ReplyList";
import ReplyWidget from "pages/ReplyWidget";
const CommentWidget = ({ 
        
        commentId,
        postId,
        postUserId,
        name,
        description,
        createdAt,
        likes,
        comments,
        isSingle
      
    }) => {

    const navigate = useNavigate();

    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const isLiked = Boolean(likes.includes(postUserId)); 

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [shareLink, setShareLink] = useState("");
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [copySuccessMessage, setCopySuccessMessage] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    
    const likeCount = Object.keys(likes).length; 
    const commentCount = Object.keys(comments).length;
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {

        const response = await fetch(`/api/posts/${postId}/${commentId}/like`,{
        
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({idx : postUserId}),
       
        });
        const updatedPost = await response.json();
        dispatch(addPost({ post: updatedPost }));
    };

 
    const handleShareClick = () => {
        const generatedShareLink = `${window.location.origin}/x/${postId}`;
        setShareLink(generatedShareLink);
        setIsDialogOpen(true);
      };

      const handleCloseDialog = () => {
        setIsDialogOpen(false);
      };


      const formatDate = (date) => {
        const now = new Date();
  const elapsedMilliseconds = now - date;

  // Define the time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

    if (elapsedMilliseconds < minute) {
        const seconds = Math.floor(elapsedMilliseconds / 1000);
        return `${seconds} sn`;
    } else if (elapsedMilliseconds < hour) {
        const minutes = Math.floor(elapsedMilliseconds / minute);
        return `${minutes} dk`;
    } else if (elapsedMilliseconds < day) {
        const hours = Math.floor(elapsedMilliseconds / hour);
        return `${hours} saat`;
    } else if (elapsedMilliseconds < month) {
        const days = Math.floor(elapsedMilliseconds / day);
        return `${days} gün`;
    } else if (elapsedMilliseconds < year) {
        const months = Math.floor(elapsedMilliseconds / month);
        return `${months} ay`;
    } else {
        const years = Math.floor(elapsedMilliseconds / year);
        return `${years} yıl`;
    }
        // Pad the day, month, and year with zeros if necessary.
       /*  const paddedDay = day < 10 ? `0${day}` : day;
        const paddedMonth = month < 10 ? `0${month}` : month;
        const paddedYear = year < 1000 ? `0${year}` : year;
      
        const paddedHours = hours < 10 ? `0${hours}` : hours;
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        // Format the date in the desired format.
        return `${paddedHours}:${paddedMinutes}:${paddedSeconds} ${paddedDay}-${paddedMonth}-${paddedYear}`; */
      }
       
       
 

    return (
        
            <div style={{ }}>
            <WidgetWrapper p="0.7rem 0.7rem 0rem 0.7rem !important" width= {isNonMobileScreen ? "40%": "80%"} m="0rem auto 0.2rem auto" style={{border:"1px dotted #00D5FA" }} >
            <Box>
            <Box>
            <FlexBetween style={{padding:"0.3rem 0.9rem",borderRadius:".5rem", backgroundColor: palette.neutral.light}}>
                    <Typography variant="h5" fontWeight="500" >{name}</Typography>
                    <Typography color={main} variant="h5">{formatDate(new Date(createdAt))}</Typography>
            </FlexBetween>
            </Box>

            <Box>
                <Typography  variant="h5" sx={{ mt: "1rem",wordWrap: "break-word"  }}>{description}</Typography>
            </Box>
            </Box>
            <Box mt="1rem" borderTop="0.001rem solid #00D5FA"></Box>
            
            <Box mt="0.25rem">
                <FlexAround gap="1rem">
                    <Box gap="0.3rem"  width="100%" display="flex" alignItems="center">
                        <IconButton onClick={patchLike}>
                        {isLiked ? (
                            <FavoriteOutlined sx={{ color: primary }} />
                        ) : (
                            <FavoriteBorderOutlined />
                        )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </Box>


                    <Box gap="0.3rem"  width="100%" display="flex" alignItems="center">
                    <Link>
                        <IconButton>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                   </Link>
                        <Typography>{commentCount}</Typography>
                    </Box>

                    <Box gap="0.3rem"  width="100%" display="flex" alignItems="center">
                        <IconButton onClick={handleShareClick}>
                            <ShareOutlined />
                        </IconButton>
                    </Box>

                </FlexAround>
            </Box>

            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle fontSize={"1.2rem"}>hemen iturafını paylaş! </DialogTitle>
            <DialogContent>
                <input
                type="text"
                value={shareLink}
                readOnly
                style={{ width: "100%", marginBottom: "1rem" }}
                backgroundColor="primary"
                />
                <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    navigator.clipboard.writeText(shareLink).then(() => {
                        console.log("Text copied to clipboard");
                    }).catch((error) => {
                        console.error("Failed to copy text clipboard", error);
                    });
                    handleCloseDialog();
                    setIsSnackbarOpen(true);
                   }}
                   sx ={{ borderRadius:"1rem",
                   backgroundColor:"primary"}}
                >
               Kopyala
                </Button>
            </DialogContent>
            </Dialog>

            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={1500} // Adjust the duration as needed (in milliseconds)
                onClose={() => setIsSnackbarOpen(false)}
                >
                <Alert
                    variant="filled"
                    severity="success"
                    onClick={() => setIsSnackbarOpen(false)}
                > Successfully copied link!
            </Alert>
            </Snackbar>

            <ReplyForm myVariable={postUserId} myId={postId} commentId={commentId}/>

            </WidgetWrapper>


            <ReplyList myVariable={postUserId} myId={postId} commentId={commentId}/>
            </div>
        );
    }

export default CommentWidget;