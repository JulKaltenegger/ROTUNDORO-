import React, { useState, useContext, useRef, useEffect} from "react";

import {
  Grid,
  Button, 
  Typography,
  TextField,
  Paper,
  Box
} from "@material-ui/core";
import useStyles from "@styles";
import AppContext from '@context';
import { Link, Redirect } from 'react-router-dom';
import Plugins from "../plugins";
import theme from "../util/theme";
import Menu from "@components/Menu/MainMenu";
import { palette } from '@material-ui/system';
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";
import MyProjectTable from "../components/Tables/MPTable"


// MAIN function to create a new project -> const [array of myProjects setmyProjects]

function MyProjects(props) {
  var myProjectsTableKey = 0
    const classes = useStyles()
    const { context, setContext } = useContext(AppContext);
    const [collapse, setCollapse] = useState(true);
    const [myProjects, setmyProjects] = useState([]) 
    // const [myProjects, setmyProjects] = useState([projectName, clientName, buildingType])

//adding the myProject constant elements and referencing it to the textfield input
const projectNameTextFieldRef = useRef()
const clientNameTextFieldRef = useRef()
const buildingTypeTextFieldRef = useRef()

//Click on Save and add the values into a new project
//complex variable: .current.firstChild ... -> go to consol and redirect where to find the value
function onSaveClicked() {
  console.log('projectname', projectNameTextFieldRef.current.firstChild.firstChild.value)
  console.log('clientname', clientNameTextFieldRef.current.firstChild.firstChild.value)
  console.log('buildingtype', buildingTypeTextFieldRef.current.firstChild.firstChild.value)

//set the complex variable equal to easy var
  var typedInProjectName = projectNameTextFieldRef.current.firstChild.firstChild.value
  var typedInClientName = clientNameTextFieldRef.current.firstChild.firstChild.value
  var typedInBuildingType = buildingTypeTextFieldRef.current.firstChild.firstChild.value

 // create newProject when all three elements are entered.  
 //return: is used to return the value of the function that returns the new projects
  var newProject  = { projectName : typedInProjectName, clientName: typedInClientName, buildingType : typedInBuildingType }
  // rerender only added projects (see ToDoList tutorial)
  setmyProjects(prevProject => {
    return [...prevProject, newProject] 
  })
  //adds a new key for each project -> not for each value added
  myProjectsTableKey++
  console.log('myProjects', myProjects)

}

// useEffect(() => {
// console.log('helpup')
// })

    return (      
      <div className={classes.root}> 
          {context.currentProject ? (
            <div>
              <Grid container className={classes.form} xs={12} spacing={4}>
                <Grid xs={12} container spacing={2} >
                <Grid item xs={3}> here is the menue</Grid>                 
              
                <Grid xs={9} container className={classes.form} >                    
                    <Grid item spacing className={classes.formBoxS} >
                     <Box class="grid-container" >    
                        <Typography class="grid-item grid-item-1" > Project Name</Typography>
                        <Typography class="grid-item grid-item-2"> Client Name</Typography>
                        <Typography class="grid-item grid-item-3"> Building Type</Typography>
                        <Typography class="grid-item grid-item-4"> Edit</Typography>
                        <Typography class="grid-item grid-item-5"> Save</Typography>
                        {/* <Button variant="contained" color="primary" size="small" > Edit </Button>
                        <Button variant="contained" color="primary" size="small" > Save </Button> */}
                      </Box>                    
                    </Grid>                   
                    <Grid item spacing={2} className={classes.formBoxS}>
                      <Box class="grid-container" >
                        <TextField ref={projectNameTextFieldRef} type="text"></TextField>
                        <TextField ref={clientNameTextFieldRef} type="text"></TextField>
                        <TextField ref={buildingTypeTextFieldRef} type="text"></TextField>
                        <Button variant="contained" color="primary" size="small" > Edit </Button>
                        <Button onClick={onSaveClicked}  variant="contained" color="primary" size="small" > Add </Button>
                      </Box>
                    </Grid>
                  {/* Add the MyProjectTable in here, and identfy the table key, as well as tell that each row needs to be filled with the user input myProjects */}
                    <Grid item spacing={2} className={classes.formBoxL}>
                      <MyProjectTable key={myProjectsTableKey} rows={myProjects} />
                    </Grid>
                   <Grid item spacing className={classes.formBoxS}>
                      <Box class="grid-container">  
                      {/* {JSON.stringify(myProjects)}                      */}
                        {/* <Button variant="contained" color="primary" size="small" > Add Project </Button> */}
                      </Box>                  
                  </Grid>
                </Grid>
                </Grid>
              </Grid>
                          </div>           
          ) : (
            <Redirect to="/" />
          )}
      </div>
    );
    
      
  
  }
  
  export default MyProjects;

 