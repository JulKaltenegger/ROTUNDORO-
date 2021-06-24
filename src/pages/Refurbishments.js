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
                  <Grid item className={classes.formBoxS} >
                    <Box class="grid-container">    
                      <Typography class="grid-item grid-item-1"> Refurbishment Package </Typography>
                      <Typography class="grid-item grid-item-2"> Package 1</Typography>
                      <Typography class="grid-item grid-item-3"> Package 2</Typography>
                      <Typography class="grid-item grid-item-4"> Package 3</Typography>
                    </Box>                    
                  </Grid>
                 
                  <Grid item className={classes.formBoxL}>
                  <RefPackage/>
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
  );
  
    

}

export default Refurbishments;
