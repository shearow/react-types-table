import { NavLink } from "react-router-dom";

export const Error404 = () => {
    return (
        <div className="container">
            <h2>Error 404.</h2>
            <h2>This url not exist, return to Home Page</h2>
            <button><NavLink to="/">Home Page</NavLink></button>
        </div>
    )
}