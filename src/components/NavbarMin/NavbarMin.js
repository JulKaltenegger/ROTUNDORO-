import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../../App.css";

import { 
    Button,
    IconButton, 
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";



const NavbarMin = ({links}) => {
    
    const [color, setColor] = useState("red")
    
    // function customMe() {
    //     setColor('primary')
    // }  

    const customMe = (color)=> {
        setColor('primary')
    }  


    return (
    <div className="NavbarMin">
        <div className="leftSide"></div>
        <div className="rightSide">
            <IconButton component={Link} to={links[0]} >
                <HomeIcon color={color} onClick={()=>customMe()}/>            
            </IconButton>
            <IconButton component={Link} to={links[1]} >
                <MenuIcon color={color} onClick={()=>customMe()}/>
            </IconButton>
            <Button disabled={true} href={links[2]}>3D</Button>
            <Button disabled={true} href={links[3]}>Pie</Button>
        </div>

    </div>
    );
};

export default NavbarMin;
