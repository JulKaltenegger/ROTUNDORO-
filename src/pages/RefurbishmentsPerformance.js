import React, { useState, useContext, useEffect } from 'react';
import {
    Grid,
    Button, 
    Typography,
    Box,
    TextField,
  } from "@material-ui/core";
import useStyles from "@styles";
import "../App.css";
import AppContext from '@context';
import { Link, Redirect } from 'react-router-dom';
import RefPackage from "../components/RefurbishmentPackage/RefPackage"
import NavbarMinRef from "../components/NavbarMin/NavbarMinRef";
import ControlledOpenSelect from '../components/ButtonSelect/ControlledOpenSelect';
import Divider from "@material-ui/core/Divider";
import { v4 as uuidv4 } from 'uuid';
// import {dbconnect, runquery, dbclosed} from "../plugins/PluginLCA/Components/mysql.refpack"

function RefurbishmentsPerformance() {
  const NEWPACKAGES_KEY = "newPackages"
    const classes = useStyles()
    const {context, setContext} = useContext(AppContext)
  
// define RC values and define list as option for ControlledOpenSelect
    const [RCValueWall, setRCValueWall] = useState([{id:uuidv4(), name:"RC 1.7", value:1.7 }, {id:uuidv4(), name:"RC 4.0", value:4.0 }])
    const [RCValueRoof, setRCValueRoof] = useState([{id:uuidv4(), name:"RC 2.5", value:2.5 }, {id:uuidv4(), name:"RC 6.5", value:6.5 }])

//var for package 1, and package 2
const [Package1, setPackage1] = useState({RCValueWall:0, RCValueRoof:0, Spaceheating:0, DHOW:0, Electricity:0, PrimaryEnergy:0, EnergyLabel:0, CO2op:0, costSaving:0, gasSaving:0, materialname:0})
const [Package2, setPackage2] = useState({RCValueWall:0, RCValueRoof:0, Spaceheating:0, DHOW:0, Electricity:0, PrimaryEnergy:0, EnergyLabel:0, CO2op:0, costSaving:0, gasSaving:0, materialname:0})
    // const [newPackages, setnewPackages] = useState([Package1, Package2]) for future purpose, it would be ideal to create an empty arry of package objects, adjustable by the users input. 

//access current selected Project (myProject)
    const [myProjects, setmyProjects] = useState([]);
    const [currentSelectedProject, setcurrentSelectedProject] = useState({}) 

    const [ConversionFactorGas, setConversionFactorGas] = useState(35.17)
    const [ConversionFactorEle, setConversionFactorEle] = useState(3.6)
    const [TransfereeEle, setTransfereeEle] = useState(0.39)

//Gas Saving
    const [GasSaving, setGasSaving] = useState(0)

//initialize, get values from local storage and update UI
useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('myProjects'))
    setmyProjects (storedProjects)
    const storedProject = storedProjects[0]
  
    setcurrentSelectedProject (storedProject)
    console.log('current CO2',currentSelectedProject.CO2op)

    const storedPackage = JSON.parse(localStorage.getItem(NEWPACKAGES_KEY))
    console.log(storedPackage)
    if (storedPackage && storedPackage.length > 1 ) {
      console.log(storedPackage[0])
      updatePackage1 (storedPackage[0])
      updatePackage2 (storedPackage[1])
    }
 }, []);

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


//Functions to P1 set wall, P1 set roof => Package 1
//Functions to P2 set wall, P2 set roof => Package 2

function selectPackage1wall(value) {
  let newPackage = Package1
  newPackage.RCValueWall = value
  newPackage.Spaceheating = selectSpaceheating(newPackage.RCValueWall,newPackage.RCValueRoof)

  newPackage.DHOW = currentSelectedProject.DHOW
  newPackage.Electricity = currentSelectedProject.Electricity

  newPackage = calculatePrimaryEnergy (newPackage.Spaceheating, newPackage.DHOW, newPackage.Electricity, newPackage)

  newPackage.gasSaving = calculateGasSaving (newPackage.Spaceheating)
  newPackage.costSaving = calculateCostSaving (newPackage.gasSaving)

  updatePackage1(newPackage)
  saveDataToLocalStorage()
}

function selectPackage1roof(value ) {
  let newPackage = Package1
  newPackage.RCValueRoof = value
  newPackage.Spaceheating = selectSpaceheating(newPackage.RCValueWall,newPackage.RCValueRoof)

  newPackage.DHOW = currentSelectedProject.DHOW
  newPackage.Electricity = currentSelectedProject.Electricity

  newPackage = calculatePrimaryEnergy (newPackage.Spaceheating, newPackage.DHOW, newPackage.Electricity, newPackage)

  newPackage.gasSaving = calculateGasSaving (newPackage.Spaceheating)
  newPackage.costSaving = calculateCostSaving (newPackage.gasSaving)

  updatePackage1(newPackage)
  saveDataToLocalStorage()
}

function selectPackage2wall(value) {
  let newPackage = Package2
  newPackage.RCValueWall = value
  newPackage.Spaceheating = selectSpaceheating(newPackage.RCValueWall,newPackage.RCValueRoof)
 
  newPackage.DHOW = currentSelectedProject.DHOW
  newPackage.Electricity = currentSelectedProject.Electricity

  newPackage = calculatePrimaryEnergy (newPackage.Spaceheating, newPackage.DHOW, newPackage.Electricity, newPackage)

  newPackage.gasSaving = calculateGasSaving (newPackage.Spaceheating)
  newPackage.costSaving = calculateCostSaving (newPackage.gasSaving)

  updatePackage2(newPackage)
  saveDataToLocalStorage()
}

function selectPackage2roof(value) {
  let newPackage = Package2
  newPackage.RCValueRoof = value
  newPackage.Spaceheating = selectSpaceheating(newPackage.RCValueWall,newPackage.RCValueRoof)

  newPackage.DHOW = currentSelectedProject.DHOW
  newPackage.Electricity = currentSelectedProject.Electricity

  newPackage = calculatePrimaryEnergy (newPackage.Spaceheating, newPackage.DHOW, newPackage.Electricity, newPackage)

  newPackage.gasSaving = calculateGasSaving (newPackage.Spaceheating)
  newPackage.costSaving = calculateCostSaving (newPackage.gasSaving)

  updatePackage2(newPackage)
  saveDataToLocalStorage()
}


//function spaceheating look up space heating reduciton in m³ when insolation 
//with RC value for Wall and Roof
 function selectSpaceheating(wall, roof){
   console.log (wall)
   console.log (roof)
  
   if (wall == 1.7) {
     if (roof == 2.5) {
       return 849.36
     } else if (roof == 6.5){
       return 772.00
     } else {
       return 0
     }
   } else if (wall == 4.0) {
     if (roof == 2.5) {
       return 791.00
     } else if (roof == 6.5){
       return 726.79
     } else {
       return 0
     }
   } else {return 0}
 }


//Perform further calculations Primary Energy and Gas reduction
function calculatePrimaryEnergy(Spaceheating, DHOW, Electricity, Package) {
  const PrimaryEnergyValue = Math.round((((((Spaceheating + DHOW) * ConversionFactorGas) + ((Electricity * ConversionFactorEle) / TransfereeEle))*0.277777) + Number.EPSILON) * 100) / 100

  Package.PrimaryEnergy = PrimaryEnergyValue
  Package.CO2op = calculateCO2op (PrimaryEnergyValue)
  Package.EnergyLabel = calculateEnergyLabel (PrimaryEnergyValue)

  // return PrimaryEnergyValue
  return Package
}

// Energy Lable calc. define value, then translate to alph.num. value
const [buildingArea, setbuildingArea] = useState(100)
  
function calculateEnergyLabel(PrimaryEnergyValue) {
  const EnergyLabelValue = PrimaryEnergyValue/buildingArea
    switch (true) {
      case (EnergyLabelValue <= 138.84):
        return "A"
      case (EnergyLabelValue <= 162.08):
        return "B"
      case (EnergyLabelValue <= 174.27):
        return "C"
      case (EnergyLabelValue <= 195.60):
        return "D"
      case (EnergyLabelValue <= 211.55):
        return "E"
      case (EnergyLabelValue <= 223.83):
        return "F"
      case (EnergyLabelValue <= 232.10):
        return "G"  
      default:
        return "need to improve"
    }
}

//CO2 operational 
  const [CO2conv, setCO2conv] = useState(0.2019)

  function calculateCO2op(PrimaryEnergyValue) {
  const CO2opValue = Math.round(PrimaryEnergyValue * CO2conv + Number.EPSILON)
  return CO2opValue
 }

//Calculate Gas Saving
function calculateGasSaving (Spaceheating){
  const currentSpaceheating = currentSelectedProject.spaceHeating
  const gasSavingValue = Math.round((currentSpaceheating - Spaceheating))
  console.log(gasSavingValue)
  return gasSavingValue
}

//Calculate Cost Saving
const [gasPrice, setgasPrice] = useState(0.814)

function calculateCostSaving (gasSavingValue) {
  const costSavingValue = Math.round(gasSavingValue*gasPrice)
  return costSavingValue
}


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
                        <Typography className="column" > 
                        Unit
                        </Typography> 
                        <Typography className="column" > 
                        Base Model
                        </Typography> 
                        <Typography className="column">
                        Package 1
                        </Typography>
                        <Typography className="column">
                        Package 2
                        </Typography>                 
                    </Box>
                    <Box class="blocktitleRP">
                        <Typography className="column"> 
                        Wall
                        </Typography>
                        <Typography className="column"> 
                        Rc (K⋅m²)/W
                        </Typography>
                        <div className="columncomputed" > 
                        <Typography> 0.68</Typography>
                        </div> 
                        <div className="column">
                        <ControlledOpenSelect options={RCValueWall} selectvaluechange={selectPackage1wall} defaultValue={Package1.RCValueWall}></ControlledOpenSelect>
                        </div>
                        <div className="column">
                        <ControlledOpenSelect options={RCValueWall} selectvaluechange={selectPackage2wall} defaultValue={Package2.RCValueWall}></ControlledOpenSelect>
                        </div>                  
                    </Box>
                    <Box class="blocktitleRP">
                        <Typography className="column"> 
                        Roof
                        </Typography>
                        <Typography className="column"> 
                        Rc (K⋅m²)/W
                        </Typography>
                        <div className="columncomputed" > 
                        <Typography> 1.12</Typography>
                        </div> 
                        <div className="column">
                        <ControlledOpenSelect options={RCValueRoof} selectvaluechange={selectPackage1roof} defaultValue={Package1.RCValueRoof}></ControlledOpenSelect>
                        </div>
                        <div className="column">
                        <ControlledOpenSelect options={RCValueRoof} selectvaluechange={selectPackage2roof} defaultValue={Package2.RCValueRoof}></ControlledOpenSelect>
                        </div>                  
                    </Box>
                    <p></p>
                  <Divider /> 
                    <p></p>
                    <Box Class="blocktitleRP">
                        <Typography  class="headertext"> 
                          Operational Performance
                        </Typography>
                        <Typography className="column" > 
                          Unit
                        </Typography>
                        <Typography className="column" > 
                          Base Model
                        </Typography> 
                        <Typography className="column">
                          Package 1
                        </Typography>
                        <Typography className="column">
                          Package 2
                        </Typography>                 
                    </Box>
                    <Box class="blocktitleRP">
                        <Typography className="column"> 
                          Space heating Gas
                        </Typography>
                        <Typography className="column"> 
                          (m³/a)
                        </Typography>
                        <Typography className="columncomputed">{currentSelectedProject.spaceHeating}</Typography>
                        <Typography className="column">{Package1.Spaceheating}</Typography>
                        <Typography className="column">{Package2.Spaceheating}</Typography>
                    </Box>
                    <Box class="blocktitleRP"> 
                        <Typography className="column"> 
                          DHOW Gas
                        </Typography>
                        <Typography className="column"> 
                         (m³/a)
                        </Typography>
                        <Typography className="columncomputed">{currentSelectedProject.DHOW}</Typography>
                        <Typography className="column">{Package1.DHOW}</Typography>
                        <Typography className="column">{Package2.DHOW}</Typography>
                    </Box>
                    <Box class="blocktitleRP">
                        <Typography className="column"> 
                          Electricity
                        </Typography>
                        <Typography className="column"> 
                          (kWh/a)
                        </Typography>
                        <Typography className="columncomputed">{currentSelectedProject.Electricity}</Typography>
                        <Typography className="column">{Package1.Electricity}</Typography>
                        <Typography className="column">{Package2.Electricity}</Typography>
                    </Box>
                    <Box class="blocktitleRP">
                        <Typography className="column" > 
                          Primary Energy
                        </Typography>
                        <Typography className="column"> 
                          (kWh/a)
                        </Typography>
                        {/* <Typography className="columncomputed">{currentSelectedProject.PrimaryEnergy}</Typography> */}
                        <Typography className="columncomputed">23504.91</Typography>
                        <Typography className="column">{Package1.PrimaryEnergy}</Typography>
                        <Typography className="column">{Package2.PrimaryEnergy}</Typography>
                    </Box>
                    <Box class="blocktitleRP">
                        <Typography className="column" > 
                          Energy Label
                        </Typography>
                        <Typography className="column"> 
                         (A-G)
                        </Typography>
                        {/* <Typography className="columncomputed">{currentSelectedProject.EnergyLabel}</Typography> */}
                        <Typography className="columncomputed">need to improve</Typography> 
                        <Typography placeholder="C" className="column">{Package1.EnergyLabel}</Typography>
                        <Typography placeholder="B" className="column">{Package2.EnergyLabel}</Typography>
                    </Box>
                    <Box class="blocktitleRP">
                        <Typography className="column" > 
                          CO2
                        </Typography>
                        <Typography className="column"> 
                         (kgCO2/a)
                        </Typography>
                        {/* <Typography className="columncomputed">{currentSelectedProject.CO2op}</Typography> */}
                        <Typography className="columncomputed">4746</Typography>                        
                        <Typography placeholder="C" className="column">{Package1.CO2op}</Typography>
                        <Typography placeholder="B" className="column">{Package2.CO2op}</Typography>
                    </Box>
                    <p></p>
                    <Divider /> 
                    <p></p>
                    <Box Class="blocktitleRP">
                        <Typography class="headertext"> 
                          Operational Savings
                        </Typography>
                        <Typography className="column" > 
                         Unit
                        </Typography>
                        <Typography className="column" > 
                          Base Model
                        </Typography> 
                        <Typography className="column">
                          Package 1
                        </Typography>
                        <Typography className="column">
                          Package 2
                        </Typography>                 
                    </Box>
                    <Box class="blocktitleRP">
                        <Typography className="column" > 
                          Gas savings
                        </Typography>
                        <Typography className="column"> 
                         (m³/a)
                        </Typography>
                        <Typography className="columncomputed">0.00</Typography>
                        <Typography placeholder="235.44" className="column">{Package1.gasSaving}</Typography>
                        <Typography placeholder="358.28" className="column">{Package2.gasSaving}</Typography>
                    </Box>
                    <Box class="blocktitleRP">
                        <Typography className="column" > 
                          Cost savings
                        </Typography>
                        <Typography className="column"> 
                          (€/a)
                        </Typography>
                        <Typography className="columncomputed">0.00</Typography>
                        <Typography className="column">{Package1.costSaving}</Typography>
                        <Typography className="column">{Package2.costSaving}</Typography>
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

export default RefurbishmentsPerformance
