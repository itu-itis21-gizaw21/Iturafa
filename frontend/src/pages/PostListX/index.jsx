import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchPosts } from "../../state";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import FlexBetween from "components/FlexBetween";
import FlexAround from "components/FlexAround";
import PostWidget from "pages/PostWidget";
import { fetchPostsN } from "../../state";
import { CircularProgress } from "@mui/material";
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

const PostListX = (props) => {
    const { myVariable } = props;
   // console.log(props); 
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);

    const [liked, setLiked] = useState(false);
    const [commented, setCommented] = useState(false);  

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

   
      const [loading, setLoading] = useState(false);
      const [page, setPage] = useState(1);

        const handleScroll = () => {

            if (window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight) {
                    setPage((prev) => prev + 1);
            }
        }


        
        useEffect(() => {
        const fetchData = async () => {
            try {
            setLoading(true);
            await dispatch(fetchPostsN(page));
            } finally {
            setLoading(false);
            }
        };
    
        fetchData();
    
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
        }, [page, dispatch]);

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

      if ( !Array.isArray(posts)) {
        console.log(posts);
        return <div>No posts available.</div>;
      }
    

      return(
        <>
        {
            Array?.from(posts)?.map(
                ({
                    _id,
                    userName,
                    description,
                    createdAt,
                    likes,
                    dislikes,
                    comments,
                    yeni,
                    gender,
                    hidden,
                    undeletable,
                    views
        })=> (<PostWidget
        
            key={_id ||0}
            postId={_id || 0}
            postUserId={myVariable}
            name={userName}
            description={description}
            createdAt={createdAt}
            likes={likes}
            dislikes={dislikes || []}
            comments={comments} 
            isSingle={false}
            hidden={hidden || false}
            undeletable={undeletable || false}
            yeni={yeni || false}
            gender={gender || ""}
            views={views || []}
        />)
        )}

        {loading && (
        <Box display="flex" justifyContent="center" my={3}>
          <CircularProgress />
        </Box>
        )}
        </>
  );
}



export default PostListX;
