import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Box,
  Button, 
  Typography,
} from "@material-ui/core";
import useStyles from "@styles";
import AppContext from '@context';
import { Link, Redirect} from 'react-router-dom';
import {lifecycleassessment} from "lbd-server";
import NavbarMinRef from "../components/NavbarMin/NavbarMinRef";


function LifeCycleAssessment() {
    const classes = useStyles()
    const {context, setContext} = useContext(AppContext)

    const [windowWidth, setwindowWidth] = useState(window.innerWidth)

    // function setState(state) {
    //   setContext({...context, states: {...context.states, [context.plugin]: state}})
    // }
  
    const handleResize = () => {
      setwindowWidth(window.innerWidth)
    }

    useEffect(()=> {
      window.addEventListener('resize', handleResize)
    }, [])

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
                  <Box Class="blocktitleRP">
                      <Typography  variante="h1" class="headertext"> 
                        Refurbishment Measure
                      </Typography>
                      <div className="column" > 
                      {windowWidth}
                      </div> 
                  </Box>
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

export default LifeCycleAssessment;
