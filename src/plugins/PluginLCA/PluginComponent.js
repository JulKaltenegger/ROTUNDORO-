import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Drawer, Typography } from "@material-ui/core";
import useStyles from "@styles";
import AppContext from "@context";


export default function MyPlugin() {
  const classes = useStyles();
  const { context, setContext } = useContext(AppContext);

  function setState(state) {
    setContext({...context, states: {...context.states, [context.plugin]: state}})
  }

  const state = context.states[context.plugin]

  return (
    <div className={classes.root}>
      {context.currentProject ? (
        <div>
          <Drawer
            className={classes.drawer}
            drawe with="20%"
            variant="permanent"
            anchor="left"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}></div>
            
            <div>
            <p><Button color="inherit" component={ Link } to="/myprojects"> My Projects </Button></p>
            <p><Button color="inherit" component={ Link } to="/refurbishments"> Refurbishments </Button></p>
            <p><Button color="inherit" component={ Link } to="/materials"> Materials </Button></p>
            <p><Button color="inherit" component={ Link } to="/lifecycleassessment"> Life Cycle Assessment </Button></p>
            <p><Button color="inherit" component={ Link } to="/costs"> Costs </Button></p>
            {/* <Typography>
                Current selection:
                {(context.selection.length > 0) ? (
                  context.selection.map(item => {
                    return <p> {item.guid}</p>
                  })
                ) : (
                  <> nothing selected</>
                )}

              </Typography> */}
            </div>
          </Drawer>{" "}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
