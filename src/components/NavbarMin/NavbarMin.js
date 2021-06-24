import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

const NavbarMin = () => {
    return (
    <>
    <NavMin>
        <NavLink to="/">
            <h1>Logo</h1>
        </NavLink>
        <Bars />
        <NavMinMenu>
            <NavLink to="/dashboard" activeStyle>
                Dashboard
            </NavLink>
            <NavLink to="/dashboard" activeStyle>
                Performance
            </NavLink>
            <NavLink to="/dashboard" activeStyle>
                Pie Chart
            </NavLink>
            <NavLink to="/dashboard" activeStyle>
                3D View
            </NavLink>
        </NavMinMenu>

    </NavMin>
    </>
    );
};

export default NavbarMin;
