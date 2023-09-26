import { useState } from 'react';

import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    TextField,
    Badge,
} from "@mui/material";

import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close,
    FiberNewOutlined,
    CircleOutlined
} from "@mui/icons-material"


import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../state";
import { Link, useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import FlexAround from "../../components/FlexAround";

const NavBar = (props) => {
    const { myVariable, not, newx } = props;
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
    const mode = useSelector((state) => state.posts.mode);


    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const notificationCount = ""; // Example count

    return (
        <FlexBetween padding="1rem 4%"  backgroundColor = {alt}>
        <FlexAround gap = "1.75rem">     
            <Typography 
                fontWeight="bold"
                fontSize= "clamp(1rem, 2rem, 2.25rem)"
                color="primary"
                onClick={() => navigate("/")}
                sx = {{

                    "&:hover": {
                    cursor: "pointer",
                    },
                }}
                >
                ITUraf
            </Typography>
        </FlexAround>
       {isNonMobileScreen &&
        <FlexAround
            backgroundColor = {neutralLight}
            borderRadius = "9px"
            
            padding = "0.2rem 0rem"
            m="1rem"
            color="primary"
            fontSize="1.5rem"
            width = "clamp(16rem, 26rem, 36rem)"
        > {newx ? "ITU'ye hos geldiniz": "Itiraf değil, Ituraf!"}
            {/*
            <TextField 
                id="outlined-search" 
                placeholder='Search ...'
                type="search" 
                display="hidden !important"
                
                border = "1px solid red"
                sx = {{
                    border : "1px solid red",
                    width: "clamp(20rem, 30rem, 40rem)",
                }}
                />

            <IconButton>
                <Search />
            </IconButton>
            */}
        </FlexAround>
}
        <FlexAround gap="1rem">
            <FlexBetween gap="1rem" ml="1rem" sx={{backgroundColor:!newx ? "#33b249":"red",borderRadius: "0.5rem"}}>
            
            <Link to={!newx ? `/new`: `` } 
                state={{
                    textDecoration: 'none',
                    color: 'inherit'
            }}>
            <Typography 
                sx={{
                whiteSpace: 'nowrap',
                color: "#fff",
                fontWeight: "bold",
                padding: "0.4rem 0.5rem",
                textDecoration: "none !important",
                fontSize: "1rem",
               
                '&:hover': {
                    cursor: "pointer", // Corrected the cursor property
                },
                }}>
                {!newx ? "Yeni '23":"Trending"}
            </Typography>
           

            </Link>

            </FlexBetween>
            <FlexBetween>
            <IconButton onClick={() => {
                dispatch(setMode());
             }}>
                { theme.palette.mode === "light" ? (
                 <LightMode sx = {{ fontSize: "25px" }} /> 
                 ) : (
                 <DarkMode sx= {{ color: dark, fontSize:"25px"}}  />)}
            </IconButton>
           </FlexBetween>
        
            <FlexBetween gap="1rem" style={{position: "relative"}}>
                <Link to= {`/notification/user/${myVariable}`}>
                
                {!not && <Badge badgeContent={notificationCount} color="error" sx={{
                    position: "absolute",
                    top: "0.65rem",
                    right: "0.7rem",
                    transform: "scale(.85)",
                    zIndex: "1", 
                }}>
                 </Badge>}
                 <IconButton>
                    <Notifications sx={{ fontSize: "25px" }} />
                </IconButton>
                </Link>
            </FlexBetween>

           
        </FlexAround>

        </FlexBetween>
    )
}
export default NavBar;

