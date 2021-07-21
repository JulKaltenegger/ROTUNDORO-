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


const NavbarMinMarket = () => {
    const [navigationlink, setnavigationlink] =useState(["/marketpotential/dashboard", "/marketpotential/performance", "/marketpotential/3D", "/marketpotential/PIE"])
    
    return (
        <NavbarMin links={navigationlink}/>
    );
};

export default NavbarMinMarket;


