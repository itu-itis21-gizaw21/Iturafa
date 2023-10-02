import React from "react";
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ThumbDownOutlined,
    ShareOutlined,
    ArrowBackOutlined
} from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { Snackbar, SnackbarContent, Alert } from "@mui/material";

import { 
    Box, 
    IconButton,
    Typography, 
    Divider, 
    useTheme ,
    useMediaQuery
} from "@mui/material";
import FlexAround from "components/FlexAround";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addPost } from "state";
import { addPostL } from "state";
import CommentForm from "pages/CommentForm";
import { Navigate, useNavigate, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { fetchPosts, fetchPostsN } from "state";

const PostWidget = ({ 
        postId,
        postUserId,
        name,
        description,
        createdAt,
        likes,  
        dislikes,
        comments,
        isSingle,
        yeni,
        gender,
        hidden,
        undeletable,
    }) => {  

    const navigate = useNavigate();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [shareLink, setShareLink] = useState("");
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [repCount, setRepCount] = useState(0);    
        
        
    const dispatch = useDispatch();
        
    const isLiked = Boolean(likes.includes(postUserId)); 
    const likeCount = Object.keys(likes).length; 

    const isDisLiked = dislikes ? Boolean(dislikes?.includes(postUserId)) : false;
    const dislikeCount = dislikes ? Object?.keys(dislikes)?.length : 0;

    let commentCount = Object.keys(comments).length;
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const response = await fetch(`/api/posts/${postId}/like`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({idx : postUserId}),
       
        });
        const updatedPost = await response.json();
        dispatch(addPostL({ post: updatedPost }));
    };
    

    const patchDisLike = async () => {

        
        if(dislikeCount+1 > 10 && dislikeCount + 1 >= likeCount * 2){
            patchHidden();
        }
        const response = await fetch(`/api/posts/${postId}/dislike`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({idx : postUserId}),
       
        });
        const updatedPost = await response.json();
        dispatch(addPostL({ post: updatedPost }));
    };

    const patchHidden = async () => {
        const response = await fetch(`/api/posts/${postId}/hidden`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({idx : postUserId}),
       
        });
        const updatedPost = await response.json();
        dispatch(addPost({ post: updatedPost }));
        
        {!yeni ?
        dispatch(fetchPosts()) :
        dispatch(fetchPostsN())
    }};
    

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
            <WidgetWrapper p="0.7rem 0.7rem 0rem 0.7rem !important" width= {isNonMobileScreen ? "50%": "90%"} m="0rem auto 0.2rem auto" style={{border:"0.1px dotted #00D5FA", borderBottom:"0.1px dotted #00D5FA" }} >
            <Box>
              <Box>
                {/*isSingle &&
               <IconButton onClick={() => navigate(-2)} display="block" color="primary" padding='2rem' >
                        <ArrowBackOutlined style={{ transform: 'scale(1.3)', borderRadius:"50%",border:"1px solid yellow"}} />
                </IconButton>*/}
                <FlexBetween style={{padding:"0.4rem 0.9rem", borderRadius:"0.5rem", backgroundColor: palette.neutral.light}}>
                    
                   
                    <Typography variant="h5" fontWeight="500" >{yeni && "🟢 "} {gender == "kiz" && "🟣"}{gender == "erkek" && "🔴"} { name}</Typography>
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
               
                <Box gap="0.5rem"  width="100%" display="flex" alignItems="center">
                    <FlexBetween width={isNonMobileScreen?"40% !important":"45% !important"} margin="0em auto 0rem 0rem">
                        
                    <Box   display="flex" alignItems="center">
                        <IconButton onClick={patchLike}>
                        {isLiked ? (
                            <FavoriteOutlined sx={{ color: primary }} />
                        ) : (
                            <FavoriteBorderOutlined />
                        )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </Box>

                    <Box  display="flex" alignItems="center">
                        <IconButton onClick={patchDisLike}>
                        {isDisLiked ? (
                            <ThumbDownIcon sx={{ color: primary }} />
                        ) : (
                            <ThumbDownOutlined />
                        )}
                        </IconButton>
                        <Typography>{dislikeCount}</Typography>
                    </Box>

                    </FlexBetween>
                    </Box>


                    <Box gap="0.3rem"  width="100%" display="flex" alignItems="center">
                    <Link to={`/y/${postId}`}>
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
               
                sx ={{ borderRadius:"1rem",
                backgroundColor:"primary"}}
                />
                <Button
                variant="contained"
                color="primary"
                sx ={{ borderRadius:"1rem"}}
                
                onClick={() => {
                    navigator.clipboard.writeText(shareLink).then(() => {
                        console.log("Text copied to clipboard");
                    }).catch((error) => {
                        console.error("Failed to copy text clipboard", error);
                    });
                    handleCloseDialog();
                    setIsSnackbarOpen(true);
                   }}
                >
               Kopyala
                </Button>
            </DialogContent>
            </Dialog>

            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={1500} // Adjust the duration as needed (in milliseconds)
                onClose={() => setIsSnackbarOpen(false)}
                position="absolute"
                bottom="1px"
                >
                <Alert
                    variant="filled"
                    severity="success"
                    onClick={() => setIsSnackbarOpen(false)}
                > Successfully copied link!
            </Alert>
            </Snackbar>
            <CommentForm myVariable={postUserId} myId={postId}/>
            </WidgetWrapper>
            
        );
    }

export default PostWidget;
