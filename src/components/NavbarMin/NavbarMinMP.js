import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../../App.css";

import { 
    Button,
    IconButton, 
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import NavbarMin from "./NavbarMin";


const NavbarMinMP = () => {
    const [navigationlink, setnavigationlink] =useState(["/myprojects/dashboard", "/myprojects/performance", "/myprojects/3D", "/myprojects/PIE"])
    
    return (
        <NavbarMin links={navigationlink}/>
    );
};

export default NavbarMinMP;
