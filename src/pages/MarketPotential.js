import React, { useContext, useState } from 'react';
import useStyles from "@styles";
import AppContext from '@context';
import "../App.css";
import {
    Grid,
    Button, 
    Typography,
    Box,
  } from "@material-ui/core";

// import all relevant libs for selection button
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Link, Redirect } from 'react-router-dom';
import NavbarMinMarket from '../components/NavbarMin/NavbarMinMarket';
import NavbarMinMP from '../components/NavbarMin/NavbarMinMP'
import ControlledOpenSelect from '../components/ButtonSelect/ControlledOpenSelect';
import Divider from "@material-ui/core/Divider";
import { v4 as uuidv4 } from 'uuid';

function MarketPotential() {
    const classes = useStyles()
    const {context, setContext} = useContext(AppContext)
    // const [RCValueWall, setRCValueWall] = useState([{id:uuidv4(), name:"RC 1.7", value:1.7 }, {id:uuidv4(), name:"RC 4.0", value:4.0 }])

     return (
        <div className={classes.root}>
        {context.currentProject ? (
            <Grid container className={classes.form} xs={12} spacing={4} >
              <Grid xs={12} container spacing={2} >
                <Grid item xs={3}> here is the menue</Grid>              
                
                <Grid xs={9} container className={classes.form}>                    
                        <Grid item className={classes.formBoxS} >
                            <NavbarMinMarket/>                                         
                        </Grid>                               
                        <Grid item className={classes.formBoxL}>
                         Please select ...
                              
                        </Grid>                  
                    <Grid>                 
                    </Grid>
                </Grid>
              </Grid>
            </Grid>       
        ) : (
        <Redirect to="/" />
        )}
      
        </div>
    )
        }


export default MarketPotential
