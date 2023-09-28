import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SinglePost from './pages/SinglePost';
import postReducer from "./state";
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import Notification from './pages/Notification';
import New from './pages/New';
function App(props) {
  const { myVariable } = props;
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));


  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Routes>
      <Route path="/" element={<HomePage myVariable={myVariable}/>} />
      <Route path="/new/trending" element={<HomePage myVariable={myVariable}/>} />
      <Route path="/x/:postId" element={<HomePage myVariable={myVariable}/>} />
      <Route path="/y/:postId" element={<SinglePost myVariable={myVariable}/>} />
      <Route path="/notification/user/:postUserId" element={<Notification myVariable={myVariable}/>} />
      <Route path="/new" element={<New myVariable={myVariable}/>} />

    </Routes>
    </ThemeProvider>
  </BrowserRouter>
  );
}


export default App;
