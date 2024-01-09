import React, { useState } from "react";
 
import "./App.css";
import { Route, Routes } from "react-router-dom";
// import { Layout } from "./components/layout";
import HomePage from "./pages/HomePage";
import { UserContextProvider } from "./UserContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { CreatePost } from "./pages/CreatePost";
import { PostPage } from "./pages/PostPage";
import { EditPost } from "./pages/EditPost";
function App() {
   

  return (
    <UserContextProvider>

    <Routes>
      {/* <Route path="/" element={<Layout/>}> */}
        <Route index element={<HomePage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage/>} />
        <Route path ={"/create"}  element={<CreatePost/>}/>
        <Route path={"/post/:id"} element={< PostPage />}/>
        <Route path="/edit/:id" element={<EditPost/>}/> 
      {/* </Route> */}
    </Routes>

    </UserContextProvider>
  );
}

export default App;
