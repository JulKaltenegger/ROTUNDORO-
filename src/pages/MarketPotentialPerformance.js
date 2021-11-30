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
import BM from "../image/BM.PNG";

function MarketPotentialPerformance() {
  const NEWPACKAGES_KEY = "newPackages"
    const classes = useStyles()
    const {context, setContext} = useContext(AppContext)
    // const [RCValueWall, setRCValueWall] = useState([{id:uuidv4(), name:"RC 1.7", value:1.7 }, {id:uuidv4(), name:"RC 4.0", value:4.0 }])

//access current selected Project (myProject)
const [myProjects, setmyProjects] = useState([])
const [currentSelectedProject, setcurrentSelectedProject] = useState({}) 

//var for package 1, and package 2
const [Package1, setPackage1] = useState({RCValueWall:0, RCValueRoof:0, Spaceheating:0, DHOW:0, Electricity:0, PrimaryEnergy:0, EnergyLabel:0, CO2op:0, costSaving:0, gasSaving:0, materialname:0})
const [Package2, setPackage2] = useState({RCValueWall:0, RCValueRoof:0, Spaceheating:0, DHOW:0, Electricity:0, PrimaryEnergy:0, EnergyLabel:0, CO2op:0, costSaving:0, gasSaving:0, materialname:0})

const [newPackage, setnewPackage] = useState([Package1, Package2])

//Selectoin possibilities for drop down
const [materialInject, setmaterialInject] = useState([{id:uuidv4(), name:"EPS", value:1}, {id:uuidv4(), name:"Glass Wool", value:2}])
const [materialInside, setmaterialInside] = useState([{id:uuidv4(), name:"Rock Wool", value:3}, {id:uuidv4(), name:"Wood Fiber", value:4}])

const [p1Utility, setp1Utility] = useState(0)
const [p2Utility, setp2Utility] = useState(0)

const [ProbabilityNoren, setProbabilityNoren] = useState(0)
const [Probability1, setProbability1] = useState(0)
const [Probability2, setProbability2] = useState(0)


//Selection of material scenarios for package 1 and 2 
const [selectedP1Material, setSelectedP1Material] = useState({
  name : "",
  installation : "",
  investment : 0,
  CO2saving : 0,
  Noise : 0,
  Comfort : "",
})

const [selectedP2Material, setSelectedP2Material] = useState({
  name : "",
  installation : "",
  investment : 0,
  CO2saving : 0,
  Noise : 0,
  Comfort : "",
})


//call My store project, packag1 and package2 from local storage
useEffect(() => {
  //  const myProjects = localStorage.getItem('myProjects'[0])
      const storedProjects = JSON.parse(localStorage.getItem('myProjects'))
      setmyProjects (storedProjects)
      const storedProject = storedProjects[0]
    
      setcurrentSelectedProject (storedProject)
  
      const storedPackage = JSON.parse(localStorage.getItem(NEWPACKAGES_KEY))
      console.log(storedPackage)
      if (storedPackage && storedPackage.length > 1 ) {
        console.log(storedPackage[0])
        updatePackage1 (storedPackage[0])
        updatePackage2 (storedPackage[1])
        if (storedPackage[0].materialname){
          updateP1Values(storedPackage[0].materialname)
        }
        if (storedPackage[1].materialname){
          updateP2Values(storedPackage[1].materialname)
        }
      }
},[]);
  
//update of complete package, by calling ...Package1, and overwrite, all values, as listed next to it.
  function updatePackage1(updatedPackage){
    setPackage1({...Package1, RCValueWall:updatedPackage.RCValueWall, RCValueRoof:updatedPackage.RCValueRoof, Spaceheating: updatedPackage.Spaceheating, DHOW:updatedPackage.DHOW, Electricity:updatedPackage.Electricity, PrimaryEnergy:updatedPackage.PrimaryEnergy, EnergyLabel:updatedPackage.EnergyLabel, CO2op:updatedPackage.CO2op, costSaving:updatedPackage.costSaving, gasSaving:updatedPackage.gasSaving, materialname:updatedPackage.materialname})   
  }
  function updatePackage2(updatedPackage){
    setPackage2({...Package2, RCValueWall: updatedPackage.RCValueWall, RCValueRoof:updatedPackage.RCValueRoof, Spaceheating: updatedPackage.Spaceheating, DHOW:updatedPackage.DHOW, Electricity:updatedPackage.Electricity, PrimaryEnergy:updatedPackage.PrimaryEnergy, EnergyLabel:updatedPackage.EnergyLabel, CO2op:updatedPackage.CO2op, costSaving:updatedPackage.costSaving, gasSaving:updatedPackage.gasSaving, materialname:updatedPackage.materialname})
  }

// save packages to local storage, which is calledn in earlier functions
function saveDataToLocalStorage(){
  localStorage.setItem(NEWPACKAGES_KEY, JSON.stringify([Package1, Package2]));
  
}

//If wall RC 1.7 && roof RC 2.5 => 
const EPS = {
  name : "EPS",
  installation : "Cavity Injection",
  investment : 2700,
  CO2saving : 330,
  Noise : 25,
  Comfort : "no",
}

const GlassWool ={
  name : "Glass Wool",
  installation : "Cavity Injection",
  investment : 2630,
  CO2saving : 440,
  Noise : 50,
  Comfort : "no",
}


//If wall RC 4.0 && roof RC 6.5 => 
const WoodFiber = {
  name : "Wood Fiber",
  installation : "Inside Layer",
  investment : 3730,
  CO2saving : 605,
  Noise : 75,
  Comfort : "yes",
}


const RockWool = {
  name : "Rock Wool",
  installation : "Inside Layer",
  investment : 3500,
  CO2saving : 530,
  Noise : 50,
  Comfort : "yes",
}





// //make user seletion function from selection drop down
// function selectMaterialPackage1(value){
//   console.log('dsd', value)
//   const newPackage = Package1
//   newPackage.materialname = value

//   if (Package1.RCValueWall == 1.7 && Package1.RCValueRoof==2.5)
//    { console.log ('Package1RC WALL', Package1.RCValueWall)
//     updatePackage1(newPackage)
//     updateP1Values(value)
//     saveDataToLocalStorage()
//   }
//   else {
//     return 0
//   }



//make user seletion function from selection drop down
function selectMaterialPackage1(value){
  console.log('dsd', value)
  const newPackage = Package1
  newPackage.materialname = value

    updatePackage1(newPackage)
    updateP1Values(value)
    saveDataToLocalStorage()
  }

function selectMaterialPackage2(value){
  console.log('dsdsdsd', value)
  const newPackage = Package2
  newPackage.materialname = value

  updatePackage2(newPackage)
  updateP2Values(value)
  saveDataToLocalStorage()

}


//function to update all values, called in useEffect, and in selection drop down functions
function updateP1Values (value) {
  const copyP1 = Package1
  if (value == 1) {
    setp1Utility(calcUtility(EPS, copyP1))
    calcProb()
    setSelectedP1Material({...selectMaterialPackage1, 
    name: EPS.name,
    installation: EPS.installation,
    investment: EPS.investment,
    CO2saving: EPS.CO2saving,
    Noise: EPS.Noise,
    Comfort: EPS.Comfort})
  } else if(value == 2){
    setp1Utility(calcUtility(GlassWool, copyP1))
    calcProb()
    setSelectedP1Material({...selectMaterialPackage1, 
      name: GlassWool.name,
      installation: GlassWool.installation,
      investment: GlassWool.investment,
      CO2saving: GlassWool.CO2saving,
      Noise: GlassWool.Noise,
      Comfort: GlassWool.Comfort})
  }
  else {
    setSelectedP1Material({...selectMaterialPackage1, 
      name : "",
      installation : "",
      investment : 0,
      CO2saving : 0,
      Noise : 0,
      Comfort : ""})
  }
}

function updateP2Values (value) {
  const copyP2 = Package2
  if (value == 3) {
//select rockwool, calc utility exp for rockwool base don copyP2, it saves in usestate setp2utility, and that recalls the calcutilityp2 (so calculated exponent for P2), is used to calcProb which inclues
//all three probabilities. (220, 221)
    setp2Utility(calcUtility(RockWool, copyP2))
    calcProb()
//select all the vairbale of rockwool towards the generic p2 definiotn. 
    setSelectedP2Material({...selectMaterialPackage2, 
    name: RockWool.name,
    installation: RockWool.installation,
    investment: RockWool.investment,
    CO2saving: RockWool.CO2saving,
    Noise: RockWool.Noise,
    Comfort: RockWool.Comfort})
  } else if(value == 4){
    setp2Utility(calcUtility(WoodFiber, copyP2))
    calcProb()
    setSelectedP2Material({...selectMaterialPackage2, 
      name: WoodFiber.name,
      installation: WoodFiber.installation,
      investment: WoodFiber.investment,
      CO2saving: WoodFiber.CO2saving,
      Noise: WoodFiber.Noise,
      Comfort: WoodFiber.Comfort})
  }
  else {
    setSelectedP2Material({...selectMaterialPackage2, 
      name : "",
      installation : "",
      investment : 0,
      CO2saving : 0,
      Noise : 0,
      Comfort : ""})
  }
}


// set coefficents
//constant value for no renovation => exponent value taken
const [norenovation, setnorenovation] = useState(0.606625286) 
//installation coef: is using only two levels. Injection=0, SecondLayer=-1.142734
const [installationcoef, setinstallationcoef] =useState({L0:0, L1:-1.142734})
//(IC value-L0)*slope in Euro
const [investmentCostcoef, setinvestmentCostcoef] =useState({L0:2500, slope: -0.000229626})
//energy reduciton in Euro
const [energycoef, setEenergycoef] = useState({L0:300, slope: 0.002647525})
//CO2 saving in kgCO2
 const [CO2coef, setCO2coef] = useState({L0:400, slope: 0.00080229})
 //Noise reduction coef
 const [noisecoef, setnoisecoef] = useState({L0:25, slope: 0.01362224 })
 //comfort coef: is using only two levels. yes:0, no: -0.345102
 const [comfortcoef, setcomfortcoef] = useState ({L0:0, L1: -0.345102})


//let = initialize first to 0 the overwrite
function calcUtility(material, p){
  let installationUtility = 0
  let comfortUtility = 0

  if (material.installation == 'Cavity Injection'){
    installationUtility = (installationcoef.L0)
  }
  if (material.installation == 'Inside Layer'){
    installationUtility = (installationcoef.L1)
  }
  const investmentUtility = ((material.investment-investmentCostcoef.L0)*investmentCostcoef.slope)
  const energyUtility = ((p.costSaving-energycoef.L0)*energycoef.slope)
  console.log(p.costSaving)
  const CO2Utility = ((material.CO2saving-CO2coef.L0)*CO2coef.slope)
  const noiseUtility = ((material.Noise-noisecoef.L0)*noisecoef.slope)
  if (material.Comfort == 'yes'){
    comfortUtility = (comfortcoef.L0)
  }
  if (material.Comfort == 'no'){
    comfortUtility = (comfortcoef.L1)
  }
  console.log('installation',installationUtility)
  console.log('investment', investmentUtility)
  console.log('energy',energyUtility)
  console.log('CO2', CO2Utility)
  console.log('noise',noiseUtility)
  console.log('comfort', comfortUtility)
  const sumUtility = (installationUtility+investmentUtility+energyUtility+CO2Utility+noiseUtility+comfortUtility)

  console.log('sumUtility', sumUtility)
  return Math.exp(sumUtility)
}

//calculate based on the sum sof the exponants the probability percentage
function calcProb (){
  console.log('utility', norenovation)
  console.log('utility1', p1Utility)
  console.log('utility2', p2Utility)
  const SumExp = (p1Utility + p2Utility + norenovation)
  console.log('sumExp', SumExp)

  setProbabilityNoren(Math.round((norenovation/SumExp)*100)) 
  setProbability1(Math.round((p1Utility/SumExp)*100)) 
  setProbability2(Math.round((p2Utility/SumExp)*100))
}


//set state hasn't finished yet before calcprob is called, thus after initializing all values, and performing the calcprob
//we must call useEffect.
useEffect (() => {
  calcProb()

 }, [norenovation, p1Utility, p2Utility])



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
                              <Typography className="columncomputed"> Wall {Package1.RCValueWall}, Roof {Package1.RCValueRoof} </Typography>
                              <Typography className="columncomputed"> Wall {Package2.RCValueWall}, Roof {Package2.RCValueRoof} </Typography>
                          </Box>
                          <Box class="blocktitleRP">
                              <Typography className="column"> Primary Energy </Typography>
                              <Typography className="column"> (kWh/a)</Typography>
                              <Typography className="columncomputed">{currentSelectedProject.PrimaryEnergy}</Typography>
                              <Typography className="columncomputed">{Package1.PrimaryEnergy}</Typography>
                              <Typography className="columncomputed">{Package2.PrimaryEnergy}</Typography>       
                          </Box>
                          <Box class="blocktitleRP">
                              <Typography className="column"> Gas reduction </Typography>
                              <Typography className="column"> (m³/a) </Typography>
                              <Typography className="columncomputed">0</Typography>
                              <Typography className="column">{Package1.gasSaving}</Typography>
                              <Typography className="column">{Package2.gasSaving}</Typography>             
                          </Box>
                          <Box class="blocktitleRP">
                              <Typography className="column"> Cost saving </Typography>
                              <Typography className="column"> (€/a) </Typography>
                              <Typography className="columncomputed">0</Typography>
                              <Typography className="column">{Package1.costSaving}</Typography>
                              <Typography className="column">{Package2.costSaving}</Typography>               
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
                              <ControlledOpenSelect options={materialInject} selectvaluechange={selectMaterialPackage1} defaultValue={Package1.materialname} className="column"> </ControlledOpenSelect>
                              {/* selectvaluechange={selectMaterialPackage1}  */}
                              <ControlledOpenSelect options={materialInside} selectvaluechange={selectMaterialPackage2} defaultValue={Package2.materialname} className="column"> </ControlledOpenSelect>                
                            </Box>
                            <Box Class="blocktitleRP">
                              <div className="column"></div>
                              <div className="column"></div>
                              <div className="column">
                                  <img src={BM}  alt="BM"/>
                              </div>
                              <div className="column">
                                  <img src={Injection} alt="Injection"/>
                              </div>
                              <div className="column">  
                                  <img src={InsideLayer} alt="InsideLayer"/>
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
                              <Typography className="column"> Installation</Typography>
                              <Typography className="column"> (applicatoin) </Typography>
                              <Typography className="column"> 0 </Typography>
                              <Typography className="column"> {selectedP1Material.installation} </Typography>
                              <Typography className="column"> {selectedP2Material.installation} </Typography>         
                          </Box>
                          <Box class="blocktitleRP">
                              <Typography className="column"> Investment Cost</Typography>
                              <Typography className="column"> (€) </Typography>
                              <Typography className="column"> 0 </Typography>
                              <Typography className="column"> {selectedP1Material.investment} </Typography>
                              <Typography className="column"> {selectedP2Material.investment} </Typography>         
                          </Box>
                          <Box class="blocktitleRP">
                              <Typography className="column"> Carbon Reduction</Typography>
                              <Typography className="column"> (kgCO2/a) </Typography>
                              <Typography className="column"> 0 </Typography>
                              <Typography className="column"> {selectedP1Material.CO2saving} </Typography>
                              <Typography className="column"> {selectedP2Material.CO2saving} </Typography>         
                          </Box>
                          <Box class="blocktitleRP">
                              <Typography className="column"> Noise Reduction</Typography>
                              <Typography className="column"> (%) </Typography>
                              <Typography className="column"> 0 </Typography>
                              <Typography className="column"> {selectedP1Material.Noise} </Typography>
                              <Typography className="column"> {selectedP2Material.Noise}  </Typography>         
                          </Box>
                          <Box class="blocktitleRP">
                              <Typography className="column"> Indoor Comfort</Typography>
                              <Typography className="column"> (yes/no) </Typography>
                              <Typography className="column"> 0 </Typography>
                              <Typography className="column"> {selectedP1Material.Comfort} </Typography>
                              <Typography className="column"> {selectedP2Material.Comfort} </Typography>         
                          </Box>
                            <Box class="blocktitleRP">
                              <Typography class="headertext">Probability of acceptance</Typography>
                              <Typography className="column"> (%) </Typography>
                              <Typography placeholder="10" className="columnheader">{ProbabilityNoren}%</Typography>
                              <Typography placeholder="22.05" className="columnheader">{Probability1}%</Typography>
                              <Typography placeholder="28.78" className="columnheader">{Probability2}%</Typography>            
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
