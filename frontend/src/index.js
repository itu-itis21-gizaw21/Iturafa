import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import postReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = { 
  key: "root",
  storage,
  version: 1,
}
const persistedReducer = persistReducer(persistConfig,postReducer);


//const reducerx = combineReducers({posts: postReducer,})



const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

//<PersistGate persistor={persistStore(store)}>
//</PersistGate>
async function PfetchUserData(createdAt){

      const newUser ={
        "createdAt": createdAt
      };

      try{
      const response = await fetch("/api/user",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
      });
   
      const userData = await response.json();
      // console.log("userData",userData)
      return userData;
 
    } catch (error) {
      // console.error("Error fetching user:OutsideCatch", error);
      return null;
    }
}
async function GfetchUserData(createdX){
  
    try{
        const response = await fetch(`/api/user?createdAt=${createdX}`);
        const user = await response.json();
        return user;
  
    } catch (error) {
        // console.error("Error fetching posts:OutsideCatch", error);
        return null;
    }
}

let uniqueIdentifier = localStorage.getItem('uniqueIdentifier');

if (uniqueIdentifier) {
  const user = await GfetchUserData(uniqueIdentifier);
}
else{
  const createdAt = Date.now().toString();
  const user = await PfetchUserData(createdAt);
  localStorage.setItem('uniqueIdentifier', createdAt);
}

uniqueIdentifier = localStorage.getItem('uniqueIdentifier');
// console.log("uniqueIdentifier",uniqueIdentifier)

document.title = 'Ituraf';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)}>
            <App myVariable={uniqueIdentifier}/>
          </PersistGate>
    </Provider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

