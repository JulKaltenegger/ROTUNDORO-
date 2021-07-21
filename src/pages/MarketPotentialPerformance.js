import React, { useContext, useState, useEffect } from 'react';
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

import Injection from "../image/Injection.PNG";
import InsideLayer from "../image/InsideLayer.PNG";

function MarketPotentialPerformance() {
    const classes = useStyles()
    const {context, setContext} = useContext(AppContext)
    // const [RCValueWall, setRCValueWall] = useState([{id:uuidv4(), name:"RC 1.7", value:1.7 }, {id:uuidv4(), name:"RC 4.0", value:4.0 }])

//Selectoin possibilities for drop down
    const [materialInject, setmaterialInject] = useState([{id:uuidv4(), name:"EPS", value:0}, {id:uuidv4(), name:"Glass wool", value:0}])
    const [materialInside, setmaterialInside] = useState([{id:uuidv4(), name:"Rock wool", value:0}, {id:uuidv4(), name:"Wood Fiber", value:0}])

    const [Installation, setInstallation] = useState([{id:uuidv4(), name:"Cavity Injection", value:0}, {id:uuidv4(), name:"Inside Layer", value:-1.14537}])
 

//If wall RC 1.7 && roof RC 2.5 => 
const EPS = {
  name : "EPS",
  installation : "Cavity Injection",
  investment : 2700,
  CO2saving : 330,
  Noise : 25,
  Comfort : "no",
}
console.log ('EPS', EPS)

const GlassWool ={
  name : "Glass Wool",
  installation : "Cavity Injection",
  investment : 2630,
  CO2saving : 440,
  Noise : 50,
  Comfort : "no",
}
console.log ('Glass Wool', GlassWool)

//If wall RC 4.0 && roof RC 6.5 => 
const WoodFiber = {
  name : "Wood Fiber",
  installation : "Inside Layer",
  investment : 3730,
  CO2saving : 605,
  Noise : 75,
  Comfort : "yes",
}
console.log ('WoodFiber', WoodFiber)

const RockWool = {
  name : "Rock Wool",
  installation : "Inside Layer",
  investment : 3500,
  CO2saving : 530,
  Noise : 50,
  Comfort : "yes",
}
console.log ('RockWool', RockWool)



//Local storage set and get materialInjection 

const [MaterialInj, setmaterialInj] = useState ([EPS, GlassWool])
const [MaterialIns, setmaterialIns] = useState ([WoodFiber, RockWool])

const [investment, setinvestment] = useState([])
const [CO2saving, setCO2saving] = useState([])
const [Noise, setNoise] = useState([])
const [Comfort, setComfort] = useState([])

useEffect(() => {
  const storedMaterialInj = JSON.parse(localStorage.getItem('MaterialInj')) || [];
  setmaterialInj (storedMaterialInj)
  const storedMaterialInj1 = storedMaterialInj[0]

  setinvestment (storedMaterialInj1.investment)
  setCO2saving (storedMaterialInj1.CO2saving)
  setNoise (storedMaterialInj1.Noise)
  setComfort (storedMaterialInj1.Comfort)
},

[]);
console.log ('investment', investment)
console.log ('CO2saving', CO2saving)
console.log ('Noise', Noise)
console.log ('Comfort', Comfort)

useEffect(() => {
  localStorage.setItem('MaterialInj', JSON.stringify(MaterialInj));
}, []);

console.log ('MaterialInj', MaterialInj)

useEffect(() => {
  localStorage.setItem('MaterialIns', JSON.stringify(MaterialIns));
}, []);



//call material properties when user selection, if mateiralInject = EPS then render const EPS, else otherwise

const [Package1, setPackage1] = useState([])

// function selectMaterialPackage1(valu){
//    const newMaterial = Package1
//    newMaterial.materialInject.name = value
//    setPackage1 = newMaterial
//    console.log ('value', value)
//  }




//access current selected Project (myProject)
    const [myProjects, setmyProjects] = useState([]);
    const [currentSelectedProject, setcurrentSelectedProject] = useState({}) 

useEffect(() => {
//  const myProjects = localStorage.getItem('myProjects'[0])
    const storedProjects = JSON.parse(localStorage.getItem('myProjects'))
    setmyProjects (storedProjects)
    const storedProject = storedProjects[0]
  
    setcurrentSelectedProject (storedProject)

    },
    
    []);


// function selectMaterial(value){
//   newMaterial.material = value
// }
  

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
                          <Box Class="blocktitleRP">
                              <Typography  variante="h1" class="headertext"> Refurbishment summary </Typography>
                              <Typography className="column"> Unit </Typography> 
                              <Typography className="column"> Base Model </Typography> 
                              <Typography className="column"> Package 1 </Typography>
                              <Typography className="column"> Package 2 </Typography>                 
                          </Box> 
                          <Box class="blocktitleRP">
                              <Typography className="column"> Measures selected </Typography>
                              <Typography className="column"> (Rc Value) </Typography>
                              <Typography className="columncomputed"> Wall 0.68, Roof 1.12 </Typography>
                              <Typography className="columncomputed"> Wall 1.7, Roof 2.5 </Typography>
                              <Typography className="columncomputed"> Wall 4.0, Roof 6.5 </Typography>
                          </Box>
                          <Box class="blocktitleRP">
                              <Typography className="column"> Primary Energy </Typography>
                              <Typography className="column"> (kWh/a)</Typography>
                              <Typography className="columncomputed">{currentSelectedProject.PrimaryEnergy}</Typography>
                              <Typography className="columncomputed"></Typography>
                              <Typography className="columncomputed"></Typography>       
                          </Box>
                          <Box class="blocktitleRP">
                              <Typography className="column"> Gas reduction </Typography>
                              <Typography className="column"> (m³/a) </Typography>
                              <Typography className="column"> </Typography>
                              <Typography className="column"> </Typography>
                              <Typography className="column"></Typography>             
                          </Box>
                          <Box class="blocktitleRP">
                              <Typography className="column"> Cost saving </Typography>
                              <Typography className="column"> (€/a) </Typography>
                              <Typography className="column"> </Typography>
                              <Typography className="column"> </Typography>
                              <Typography className="column"> </Typography>               
                          </Box>
                        <p></p>
                          <Divider/>
                        <p></p>  
                           <Box Class="blocktitleRP">
                              <Typography  variante="h1" class="headertext"> Material Application </Typography>
                              <Typography className="column">  </Typography> 
                              <Typography className="column">  </Typography> 
                            </Box> 
                            <Box class="blocktitleRP">
                              <Typography className="column">Insulation material</Typography>
                              <Typography className="column"> </Typography>
                              <Typography className="column">None</Typography>
                              <ControlledOpenSelect options={materialInject} className="column"> </ControlledOpenSelect>
                              {/* selectvaluechange={selectMaterialPackage1}  */}
                              <ControlledOpenSelect options={materialInside} className="column"> </ControlledOpenSelect>                
                            </Box>
                            <Box class="blocktitleRP">
                              <Typography className="column"> Installation Method </Typography>
                              <Typography className="column">  </Typography>
                              <Typography className="column"> None </Typography>
                              <ControlledOpenSelect options={Installation} className="column"> </ControlledOpenSelect>
                              <ControlledOpenSelect options={Installation} className="column"> </ControlledOpenSelect>
                            </Box>
                            <Box Class="blocktitleRP">
                              <div>
                                  <img src={Injection} width="100px" height="100px" alt="Injection"/>
                              </div>
                              <div> 
                                  <img src={InsideLayer} width="100px" height="100px" alt="InsideLayer"/>
                              </div> 

                            </Box>

                        <p></p> 
                          <Divider/>
                        <p></p>          
                          <Box Class="blocktitleRP">
                              <Typography  variante="h1" class="headertext"> Refurbishment criteria </Typography>
                              <Typography className="column"> Unit </Typography> 
                              <Typography className="column"> Base Model </Typography> 
                              <Typography className="column"> Package 1 </Typography>
                              <Typography className="column"> Package 2 </Typography>                 
                          </Box> 
                          <Box class="blocktitleRP">
                              <Typography className="column"> Investment Cost</Typography>
                              <Typography className="column"> (€) </Typography>
                              <Typography className="column"> 0 </Typography>
                              <Typography className="column"> {investment} </Typography>
                              <Typography className="column"> P2 3730 </Typography>         
                          </Box>
                          <Box class="blocktitleRP">
                              <Typography className="column"> Carbon Reduction</Typography>
                              <Typography className="column"> (kgCO2/a) </Typography>
                              <Typography className="column"> 0 </Typography>
                              <Typography className="column"> {CO2saving} </Typography>
                              <Typography className="column"> P2 605 </Typography>         
                          </Box>
                          <Box class="blocktitleRP">
                              <Typography className="column"> Noise Reduction</Typography>
                              <Typography className="column"> (%) </Typography>
                              <Typography className="column"> 0 </Typography>
                              <Typography className="column"> {Noise} </Typography>
                              <Typography className="column"> P2 75 </Typography>         
                          </Box>
                          <Box class="blocktitleRP">
                              <Typography className="column"> Indoor Comfort</Typography>
                              <Typography className="column">  </Typography>
                              <Typography className="column"> 0 </Typography>
                              <Typography className="column"> {Comfort} </Typography>
                              <Typography className="column"> P2 medium improvement </Typography>         
                          </Box>
                            <Box class="blocktitleRP">
                              <Typography class="headertext">Probability of acceptance</Typography>
                              <Typography className="column"> (%) </Typography>
                              <Typography placeholder="10" className="columnheader">25%</Typography>
                              <Typography placeholder="22.05" className="columnheader">45%</Typography>
                              <Typography placeholder="28.78" className="columnheader">25%</Typography>            
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


export default MarketPotentialPerformance
