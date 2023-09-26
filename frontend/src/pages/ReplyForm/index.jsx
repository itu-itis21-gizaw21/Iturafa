import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
    Height,
} from "@mui/icons-material";

import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
    TextField,
    Radio,
    RadioGroup
} from "@mui/material";

import React from "react";
import { addPost } from "../../state";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import FlexAround from "../../components/FlexAround";
import WidgetWrapper from "../../components/WidgetWrapper";
import { fetchPosts } from "../../state";
import { useEffect } from "react";
import { setPost } from "../../state";
import { useNavigate } from "react-router-dom";

const ReplyForm = (props) => {
    const { myVariable, myId,commentId} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const { palette } = useTheme();
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const [commentArea, setCommentArea] = useState(false);

    const handleTextAreaFocus = () => {
        setCommentArea(true);
      };
    
      const handleTextAreaBlur = () => {
        setCommentArea(false);
      };
 
    const patchComment = async () => {

        if (description.trim() === "" || username.trim() === "" || username.trim().length < 2 || description.trim().length < 2) return;
        

        const newComment ={
            "replyId": Date.now().toString(),
            "idx": myVariable,
            "userName": username,
            "description": description,
            "createdAt": new Date().toISOString(),
            "likes": [],
            "likedAt": new Date(),
            "commentedAt": new Date(),
            "postId": myId,
           
        };
        const response = await fetch(`/api/posts/${myId}/${commentId}/reply`,{
        
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
       
        });

        const updatedPost = await response.json();
        console.log(updatedPost);
        dispatch(addPost({ post: updatedPost }));
        navigate(`/x/${myId}`);
        setUsername("");
        setDescription("");



    };


    return (
        <>
        <WidgetWrapper p="0.6rem 0.5rem 0.1rem 0.2rem !important" m="0rem auto 0.5rem auto" width= {isNonMobileScreen ? "80%": "80%"}  onClick={handleTextAreaFocus} 
        >
            <FlexBetween>
             <InputBase
                placeholder="hemen yanitinizi yazin ..."
                multiline={true}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
               
                sx = {{
                    width:  '100%',
                    backgroundColor: palette.neutral.light,
                    borderRadius: "0.5rem",
                    padding: "0.4rem 1rem",
                }}
            />
            </FlexBetween>

            <Box 
                mt="0.5rem" 
                borderBottom="1px solid #29D5FA" 
                width=  '100%'
                margin="0.5rem auto"
            ></Box>
             { commentArea &&(
            <FlexBetween width=  {isNonMobileScreen ? '100%': '100%'} margin="1rem auto">
            <FlexBetween gap="0.25rem">
                <InputBase
                    placeholder="ad"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    padding="1rem"
                    sx = {{
                        outline: "none",
                        borderBottom :"1px solid #29D5FA",
                        width: "85%",
                        size: "small",
                        padding: "0.25rem 0.5rem",
                        backgroundColor: palette.neutral.light,

                    }}
                />
            </FlexBetween>
           
           <FlexBetween gap="0.25rem">
            <Button onClick={patchComment}
        
                sx={{
                    whiteSpace : "nowrap",
                    color: palette.background.alt,
                    backgroundColor: palette.primary.main,
                    borderRadius: "30rem",
                    textTransform: "none",
                    overflow: "hidden",
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.9rem",
                    "&:hover": {
                        backgroundColor: palette.primary.dark,
                    }
                    }}>   
            yanit ver
            </Button>
            </FlexBetween>
            
            </FlexBetween>
           ) }
        </WidgetWrapper>
        
        </>
    )
}

export default ReplyForm;

  
