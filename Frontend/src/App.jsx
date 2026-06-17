import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import GoogleSuccess from "./pages/GoogleSuccess";
import UpdateExpense from "./pages/UpdateExpense";
import AllExpenses from "./pages/AllExpenses";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/add-expense" element={<AddExpense />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/login/success" element={<GoogleSuccess />}></Route>
        <Route path="/update-expense/:id" element={<UpdateExpense />}></Route>
        <Route path="/all-expenses" element={<AllExpenses />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
