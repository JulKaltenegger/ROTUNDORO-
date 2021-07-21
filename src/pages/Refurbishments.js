import React, { useState, useContext } from "react";
import {
  Grid,
  Button, 
  Typography,
  Box,
} from "@material-ui/core";
import useStyles from "@styles";
import AppContext from '@context';
import "../App.css";
import { Link, Redirect } from 'react-router-dom';
import {refurbishments} from "lbd-server";
import { Navbar } from "@components";
import RefPackage from "../components/RefurbishmentPackage/RefPackage"
import NavbarMinRef from "../components/NavbarMin/NavbarMinRef";


function Refurbishments() {
  const classes = useStyles()
  const {context, setContext} = useContext(AppContext)

  return (      
    <div className={classes.root}> 
        {context.currentProject ? (
              <Grid container className={classes.form} xs={12} spacing={4} >
              <Grid xs={12} container spacing={2} >
                <Grid item xs={3}> here is the menue</Grid>              
                <Grid xs={9} container className={classes.form}>                    
                    <Grid item className={classes.formBoxL} >
                      <NavbarMinRef/>
                      <div>
                        <p>
                        Welcome to your refurbishment tool
                        </p>
                        <p>
                        In this section of the tool you will be introduced to the consultancy tool for energy collectives
                        and to the refurbishment package creation for engineers
                        </p>
                      </div>                
                    </Grid>
                </Grid>
              </Grid>
            </Grid>
        ) : (
          <Redirect to="/" />
        )}
    </div>
  );
  
    

}

export default Refurbishments;
