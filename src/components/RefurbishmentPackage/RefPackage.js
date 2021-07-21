import React, { useState, useContext } from "react";
import {
  Typography,
  Box,
  Grid,
} from "@material-ui/core";
import useStyles from "@styles";
import AppContext from '@context';
import "../../App.css";
import ControlledOpenSelect from "../ButtonSelect/ControlledOpenSelect";


export default function RefPackage() {


    return (
      <Grid>
        <div class="table">  
        <div className="tr">
            <Typography className="th"> Refurbishment Measure </Typography>
            <Typography className="th"> Package 1</Typography>
            <Typography className="th"> Package 2</Typography>
            <Typography className="th"> Package 3</Typography>
        </div>
        {/* <div className="tr">
            <ControlledOpenSelect className="th"/>
            <ControlledOpenSelect className="th"/>
            <ControlledOpenSelect className="th"/>
            <ControlledOpenSelect className="th"/>
        </div> */}
        </div>
      </Grid>
    


    )
}
