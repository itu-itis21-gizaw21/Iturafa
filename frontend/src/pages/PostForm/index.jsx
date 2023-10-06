import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
    Height,
    CheckOutlined,
    
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
    Checkbox,
    Circle,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Radio,
    RadioGroup,
    FormControlLabel
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
const PostForm = (props) => {
    const { myVariable, pcheck } = props;   

    {/*            */}
    
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true);
      };

      const handleCloseDialog = (isStudent) => {
        setOpenDialog(false);
      
        if (isStudent) {
          // Handle the case where the user is a student
        } else {
          // Handle the case where the user is not a student
        }
      };
      
      
     {/*            */}

    const postx = useSelector((state) => state.posts);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [gender, setGender] = useState("");
    const[checkx, setCheckx] = useState(pcheck);
    const { palette } = useTheme();
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const radioGroupStyles = {
        display: "flex",
        flexDirection: "row",
      };
   
    const handlePost = async () => {


        if (description.trim() === "" || username.trim() === "" || username.trim().length < 2 || description.trim().length < 10) return;
        const amharicPattern = /[\u1200-\u137F\u1000-\u109F]/; // This regex matches Amharic characters
        if (amharicPattern.test(description)) {
            // If the description contains Amharic letters, don't post
            console.log("Post contains Amharic letters. Not posting.");
            return;
        }

         if (amharicPattern.test(username)) {
            // If the description contains Amharic letters, don't post
            console.log("Post contains Amharic letters. Not posting.");
            return;
        }

        const otPattern = / ot /i; // The "i" flag makes the search case-insensitive
        if (otPattern.test(description)) {
        // If the description contains " ot " with one space before and after, don't post
        return;
        }

          if (otPattern.test(username)) {
        // If the description contains " ot " with one space before and after, don't post
        return;
        }

         const otPattern1 = / 0t /i; // The "i" flag makes the search case-insensitive
        if (otPattern1.test(description)) {
        // If the description contains " ot " with one space before and after, don't post
        return;
        }

          if (otPattern1.test(username)) {
        // If the description contains " ot " with one space before and after, don't post
        return;
        }

       const newPost ={
            "postUserId": myVariable,
            "userName": username,
            "description": description,
            "createdAt": new Date().toString(),
            "likes": [],
            "comments": [],
            "yeni": checkx,
            "gender": gender,
        };
        const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        })
    

        
        const updatedPost = await response.json();
        //console.log(updatedPost);
        dispatch(addPost({ post: updatedPost }));
        dispatch(fetchPosts());
        setUsername("");
        setDescription(""); 
        setCheckx(false);

    }

    
        // Fetch posts when the component mounts
    
     

    return (
        <WidgetWrapper m="1rem auto"  width= {isNonMobileScreen ? "50%": "90%"} border="1px solid #00D5FA">
            <FlexBetween  gap="1.5rem"  >
             <InputBase
                placeholder="aklında bir şey mi var ..."
                multiline={true}
                value={description}
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                sx = {{
                    width:  '100%',
                    backgroundColor: palette.neutral.light,
                    borderRadius: "0.5rem",
                    padding: "1rem 1rem",
                }}
            />
            </FlexBetween>

            <Box 
                mt="0.5rem" 
                borderBottom="1px solid #29D5FA" 
                width=  '100%'
                margin="0.5rem auto"
            ></Box>

            <FlexAround width=  {isNonMobileScreen ? '100%': '105%'} margin="1rem auto">
            <FlexBetween >
                <InputBase
                    placeholder="ad"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    padding="1rem"

                    sx = {{
                        outline: "none",
                        borderBottom :"1px solid #29D5FA",
                    
                        size: "small",
                        padding: "0.25rem 0.5rem",
                        backgroundColor: palette.neutral.light,

                    }}
                />
            </FlexBetween>

            <FlexBetween sx={{ marginRight: "0rem !important"}}>
            <Checkbox
                disabled={pcheck}
                checked={checkx}
                onChange={() => { setCheckx(!checkx); }}
                sx={{
                    color: "#33b249",                           
                    textTransform: "none",
                    overflow: "hidden",
                    ml:"0rem !important",
                    fontSize: "2rem",
                    transform: "scale(1.1)",
                    "&.Mui-checked": {
                        color: "#33b249",
                    },
                }}
                // Set the disabled prop based on pcheck
            />

                    <Typography fontWeight="bold" color="#33B249" sx={{padding:"0rem !important", marginRight: "0.5rem"}}>
                    {isNonMobileScreen ? "Yeni '23" : "Y"}
                    </Typography>
            </FlexBetween>
            
            <FlexBetween >
        {/* Add the RadioGroup for "Kız" and "Erkek" options */}
        <RadioGroup
            aria-label="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            margin="0rem !important"
            padding="0rem !important"
          
            sx= {{
                display: "flex",
                flexDirection: "row",
            }}

        >
            <FormControlLabel
                
                color="pink"
                value="kiz"
                control={<Radio sx={{color:"purple"}} />}
                label=  {isNonMobileScreen ? "Kiz" : "K"}
            />
            <FormControlLabel
               
                value="erkek"
                control={<Radio sx={{color:"red"}} />}
                label= {isNonMobileScreen ? "Erkek" : "E"}
               
            />
        </RadioGroup>

    </FlexBetween>

           <FlexBetween>
            <Button
                onClick={handlePost}
                sx={{
                    whiteSpace : "nowrap",
                    color: palette.background.alt,
                    backgroundColor: palette.primary.main,
                    borderRadius: "3rem",
                    textTransform: "none",
                    overflow: "hidden",
                    padding: "0.25rem 0.5rem",
                    fontSize: "1.1rem",
                    "&:hover": {
                        backgroundColor: palette.primary.dark,
                    }
                    }}>   
            ituraf et
            </Button>
            </FlexBetween>
            </FlexAround>

            <Dialog
    open={openDialog}
    onClose={() => handleCloseDialog(false)}
    PaperProps={{
        style: {
            borderRadius: '0.5rem',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        },
    }}
>
    <DialogTitle
        style={{
            backgroundColor: '#33B249',
            color: 'white',
            borderTopLeftRadius: '0.5rem',
            borderTopRightRadius: '0.5rem',
            fontSize: "1rem"
        }}
    >   
        Verify you are ITU student ? <hr/>
        Itu'de mantikli bir sey ..
    </DialogTitle>
    <DialogContent>
    </DialogContent>
    <DialogActions>
    <FlexBetween gap="0rem 3rem" padding="0.5rem" margin=".5rem auto">
        <Button
              onClick={() => handleCloseDialog(true)}
            style={{
                color: '#33B249',
                border: '1px solid #33B249',
                borderRadius: '0.5rem',
            }}
        >
            Olur
        </Button>
        <Button
            onClick={() => {
                handleCloseDialog(true);
                handlePost(); 
            }}
            style={{
                color: '#33B249',
                border: '1px solid #33B249',
                borderRadius: '0.5rem',
            }}
        >
            Olmaz
        </Button>
    </FlexBetween>
</DialogActions>
</Dialog>


            
        </WidgetWrapper>
    )
}

export default PostForm;

  
