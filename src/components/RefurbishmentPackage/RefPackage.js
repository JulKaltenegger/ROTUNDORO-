import React, { useState, useContext } from "react";
import {
  Typography,
  Box,
} from "@material-ui/core";
import useStyles from "@styles";
import AppContext from '@context';
import "../../App.css";


export default function RefPackage() {
    return (
        <div>
          <Box class="grid-container">    
            <Typography class="grid-item grid-item-1"> Refurbishment Package </Typography>
            <Typography class="grid-item grid-item-2"> Package 1</Typography>
            <Typography class="grid-item grid-item-3"> Package 2</Typography>
            <Typography class="grid-item grid-item-4"> Package 3</Typography>
          </Box> 
        </div>
    )
}
