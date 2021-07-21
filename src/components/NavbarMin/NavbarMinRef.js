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


const NavbarMinRef = () => {
    const [navigationlink, setnavigationlink] =useState(["/refurbishments/dashboard", "/refurbishments/performance", "/refurbishments/3D", "/refurbishments/PIE"])
    
    return (
        <NavbarMin links={navigationlink}/>
    );
};

export default NavbarMinRef;


