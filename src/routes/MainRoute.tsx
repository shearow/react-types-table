import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { MainRoute2 } from "./MainRoute2";

export const MainRoute = () => {
    return (
        <>
        <Routes>            
            <Route path="/login" element={ <LoginPage/> }></Route>
            <Route path="/register" element={ <RegisterPage/> }></Route>
            <Route path="/*" element={ <MainRoute2/>}></Route>
        </Routes>
        </>
    )
}