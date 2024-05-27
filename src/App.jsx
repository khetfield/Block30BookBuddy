import { Route, Router, Routes } from "react-router-dom";
import React from "react";
import Nav from "./components/Nav";
import Account from "./Pages/Account"
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import SingleBook from "./Pages/SingleBook";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route index element={<Books/>} />
        <Route path="/myaccount" element={<Account/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="books/:id" element={<SingleBook/>} />
      </Routes>
    </>
  );
}