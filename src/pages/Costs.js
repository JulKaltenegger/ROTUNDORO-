import React, { useState, useContext } from "react";
import {
  Grid,
  Button, 
  Typography,
} from "@material-ui/core";
import useStyles from "@styles";
import AppContext from '@context';
import { Link } from 'react-router-dom';
import {costs} from "lbd-server";


function Costs() {
    // const classes = useStyles()
    // const {context, setContext} = useContext(AppContext)

    // function setState(state) {
    //   setContext({...context, states: {...context.states, [context.plugin]: state}})
    // }

    return (
        <div>
        <Typography>
        <p><h1>Costs</h1></p>
        </Typography>
        <Typography>
        <p><h1>Costs</h1></p>
        </Typography>
        <Typography>
        <p><h1>Costs</h1></p>
        </Typography>
        <Typography>
        <p><h1>Costs</h1></p>
        </Typography>
        <Typography>
        <p><h1>Costs</h1></p>
        </Typography>
         </div>
    )
}

export default Costs;
