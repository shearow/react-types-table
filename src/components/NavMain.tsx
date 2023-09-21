import logoImg from "../assets/imgs/tigre.jpg";
import { NavLink, Link } from "react-router-dom";
import "../styles/navMain.css";

export const NavMain = () => {
    return (
        <div className="main-nav">
            <div className="logo-image">
                <Link to="/">
                    <img src={logoImg} alt="main logo with tigger in the image" />
                </Link>
            </div>

            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}