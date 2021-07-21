import React, { useState, useContext } from 'react'
import useStyles from "@styles";
import AppContext from '@context';
import "../App.css";
import {
    Grid,
    Button, 
    Typography,
    Box,
  } from "@material-ui/core";
  import NavbarMinRef from "../components/NavbarMin/NavbarMinRef";
  import { Link, Redirect } from 'react-router-dom';
  import RefPackage from "../components/RefurbishmentPackage/RefPackage"

function RefurbishmentsDashboard() {
    const classes = useStyles()
    const {context, setContext} = useContext(AppContext)

    return (
        <div className={classes.root}>
        {context.currentProject ? (
            <Grid container className={classes.form} xs={12} spacing={4} >
              <Grid xs={12} container spacing={2} >
                <Grid item xs={3}> here is the menue</Grid>              
                
                <Grid xs={9} container className={classes.form}>                    
                        <Grid item className={classes.formBoxS} >
                            <NavbarMinRef/>                
                        </Grid>                               
                        <Grid item className={classes.formBoxL}>
                           <input type="text"></input>
                           <input type="text"></input>  
                           <input type="text"></input>  
                           <input type="text"></input>                  
                        </Grid>                  
                    <Grid>                 
                    </Grid>
                </Grid>
              </Grid>
            </Grid>       
        ) : (
        <Redirect to="/refurbishments/dashboard" />
        )}
      
        </div>
    )
}

export default RefurbishmentsDashboard
