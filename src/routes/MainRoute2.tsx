import { Routes, Route } from "react-router-dom";
import { NavMain } from "../components/NavMain";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { Error404 } from "../pages/Error404";


export const MainRoute2 = () => {
    return (
        <>
        <NavMain/>

        <Routes>
            <Route path="/" element={ <HomePage/> }></Route>
            <Route path="/about" element={ <AboutPage/> }></Route>
            <Route path="/*" element={ <Error404/> }></Route>
        </Routes>
        </>
    )
}