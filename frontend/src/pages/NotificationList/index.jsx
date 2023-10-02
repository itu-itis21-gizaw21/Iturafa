import React from 'react';
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import {TextsmsOutlined, FavoriteBorderOutlined, FavoriteOutlined, ChatBubbleOutlineOutlined, ChatBubbleOutline, ChatBubble } from "@mui/icons-material";
import { useTheme } from '@mui/material';

const NotificationList = ({
  type,
  parent,
  description,
  count,
  time,
  postId
}) => {

  const { palette } = useTheme();
  const neutralLight = palette.neutral.light;
  const dark = palette.neutral.dark;
  const background = palette.background.default;
  const primaryLight = palette.primary.light;
  const alt = palette.background.alt;
  const primary = palette.primary.main;

  return (
    <Box
      border="0.01rem dashed #00D5FA"
      p="1rem"
      mb="1rem"
      mx="auto"
      width="80%"
      display="flex"
      alignItems= "left"
      justifyContent="space-between"
      borderRadius="1rem"
      backgroundColor = {neutralLight}
    >
      <Link
        to={`/y/${postId}`}
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        {type === "LIKE" && parent === "POST" && (
          <Typography variant="h4" > <span style={{color : primary}}> {count} </span>
          <FavoriteOutlined sx={{
              position: "relative",
              top: "0.25rem",  
              color: primary
            }}/> &nbsp;iturafcı   
            
            "{description.slice(0, 15)} . . . " gonderini beğendi  - {time.slice(0, 8)}<small>&nbsp;{ time.slice(9, 14)}</small>
          </Typography>
        )}
        
        {type === "COMMENT" && parent === "POST" && (
         <Typography variant="h4" >
         {count}  <ChatBubble sx={{
           position: "relative",
           top: "0.25rem",  
           color: primary
         }}/> &nbsp;iturafcı   
         
         "{description.slice(0, 15)} . . . " gonderini yorumlandı - {time.slice(0, 8)}<small>&nbsp;{ time.slice(9, 14)}</small>
       </Typography>
     )}
     
        {type === "LIKE" && parent === "COMMENT" && (
          <Typography variant="h4" >
          {count}  <FavoriteOutlined sx={{
            position: "relative",
            top: "0.25rem",  
            color: primary
          }}/> &nbsp;iturafcı   
          
          "{description.slice(0, 15)} . . . " yorumunu beğendi -  {time.slice(0, 8)}<small>&nbsp;{ time.slice(9, 14)}</small>
        </Typography>
        )}
        {type === "COMMENT" && parent === "COMMENT" && (
           <Typography variant="h4" >
           {count}  <TextsmsOutlined sx={{
             position: "relative",
             top: "0.25rem",  
             color: primary
           }}/> &nbsp;iturafcı   
           
           "{description.slice(0, 15)} . . . " yorumunu yanıtladı  - {time.slice(0, 8)}<small>&nbsp;{ time.slice(9, 14)}</small>
         </Typography>
        )}

      {type === "LIKE" && parent === "REPLY" && (
           <Typography variant="h4" >
           {count}  <FavoriteOutlined sx={{
             position: "relative",
             top: "0.25rem",  
             color: primary
           }}/> &nbsp;iturafcı   
           
           "{description.slice(0, 15)} . . . "  yanıtını beğendi  - {time.slice(0, 8)}<small>&nbsp; {time.slice(9, 14)}</small>
         </Typography>
        )}  
      </Link>

    </Box>
  );
}

export default NotificationList;
