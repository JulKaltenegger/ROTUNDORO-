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
import { Link, Redirect } from 'react-router-dom';
import NavbarMinMP from '../components/NavbarMin/NavbarMinMP';

function MyProjectsDashboard() {
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
                            <NavbarMinMP />                
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
        <Redirect to="/" />
        )}
      
        </div>
    )
        }

export default MyProjectsDashboard
