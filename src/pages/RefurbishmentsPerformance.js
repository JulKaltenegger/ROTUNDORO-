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
    const classes = useStyles()
    const {context, setContext} = useContext(AppContext)
  
// define RC values and define list as option for ControlledOpenSelect
    const [RCValueWall, setRCValueWall] = useState([{id:uuidv4(), name:"RC 1.7", value:1.7 }, {id:uuidv4(), name:"RC 4.0", value:4.0 }])
    const [RCValueRoof, setRCValueRoof] = useState([{id:uuidv4(), name:"RC 2.5", value:2.5 }, {id:uuidv4(), name:"RC 6.5", value:6.5 }])

//var for package 1, and package 2

    const [Package1, setPackage1] = useState({RCValueWall:0, RCValueRoof:0, Spaceheating:0, DHOW:0, Electricity:0, PrimaryEnergy:0, costSaving:0, gasSaving:0,})
    const [Package2, setPackage2] = useState({RCValueWall:0, RCValueRoof:0, Spaceheating:0, DHOW:0, Electricity:0, PrimaryEnergy:0, costSaving:0, gasSaving:0,})
    const [newPackages, setnewPackages] = useState([Package1, Package2])

//access current selected Project (myProject)
    const [myProjects, setmyProjects] = useState([]);
    const [currentSelectedProject, setcurrentSelectedProject] = useState({}) 

//Spaceheatin, DHOW, Electricity
    const [Spaceheating, setSpaceheating] = useState(0)
    const [DHOW, setDHOW] = useState(0)
    const [Electricity, setElectricity] = useState(0)

//Perform Primary Energy wit user input from above
    const [PrimaryEnergy, setPrimaryEnegery] = useState(0) 
    const [EnergyLabel, setEnergyLabel] = useState("")
    const [CO2op, setCO2op] = useState(0)

    const [ConversionFactorGas, setConversionFactorGas] = useState(35.17)
    const [ConversionFactorEle, setConversionFactorEle] = useState(3.6)
    const [TransfereeEle, setTransfereeEle] = useState(0.39)

//Gas Saving
    const [GasSaving, setGasSaving] = useState(0)
    
useEffect(() => {
//  const myProjects = localStorage.getItem('myProjects'[0])
    const storedProjects = JSON.parse(localStorage.getItem('myProjects'))
    setmyProjects (storedProjects)
    const storedProject = storedProjects[0]
  
    setcurrentSelectedProject (storedProject)

    },
    
    []);


//use effect to query db table from mysql -> 10.07.2021
    // useEffect(() => {
    //   dbconnect().then(function(con){
    //     runquery(con,"SELECT DISTINCT rcwall FROM refpackage.refpackge").then(function(rows){
    //       console.log (rows)
    //     })
    //   })
    // }, [])

    //
function selectData(value){
  console.log(value)
  
}

//Functions to P1 set wall, P1 set roof => Package 1
//Functions to P2 set wall, P2 set roof => Package 2
function selectPackage1wall(value) {
  const newPackage = Package1
  newPackage.RCValueWall = value
  newPackage.Spaceheating = selectSpaceheating(newPackage.RCValueWall,newPackage.RCValueRoof)
  console.log (newPackage.Spaceheating)

  newPackage.DHOW = currentSelectedProject.DHOW
  newPackage.Electricity = currentSelectedProject.Electricity

  newPackage.PrimaryEnergy = calculatePrimaryEnergy (newPackage.Spaceheating, newPackage.DHOW, newPackage.Electricity)
  console.log('primray energy', newPackage.PrimaryEnergy)
 
  newPackage.gasSaving = calculateGasSaving (newPackage.Spaceheating)
  console.log('GasSaving', newPackage.GasSaving )
  newPackage.costSaving = calculateCostSaving (newPackage.costSaving)

  setPackage1(newPackage => newPackage)
  saveDataToLocalStorage()
}

function selectPackage1roof(value ) {
  const newPackage = Package1
  newPackage.RCValueRoof = value
  newPackage.Spaceheating = selectSpaceheating(newPackage.RCValueWall,newPackage.RCValueRoof)
  console.log ('roof ' +newPackage.Spaceheating)
  console.log('value used '+ value)

  newPackage.DHOW = currentSelectedProject.DHOW
  newPackage.Electricity = currentSelectedProject.Electricity

  newPackage.PrimaryEnergy = calculatePrimaryEnergy (newPackage.Spaceheating, newPackage.DHOW, newPackage.Electricity)
  console.log('primray energy', newPackage.PrimaryEnergy)

  newPackage.gasSaving = calculateGasSaving (newPackage.Spaceheating)
  console.log('GasSaving', newPackage.GasSaving )
  newPackage.costSaving = calculateCostSaving (newPackage.costSaving)

  setPackage1(newPackage => newPackage)
  saveDataToLocalStorage()

}

function selectPackage2wall(value) {
  const newPackage = Package2
  newPackage.RCValueWall = value
  newPackage.Spaceheating = selectSpaceheating(newPackage.RCValueWall,newPackage.RCValueRoof)
  console.log ('Spaceheating P2',newPackage.Spaceheating)
 
  newPackage.DHOW = currentSelectedProject.DHOW
  newPackage.Electricity = currentSelectedProject.Electricity

  newPackage.PrimaryEnergy = calculatePrimaryEnergy (newPackage.Spaceheating, newPackage.DHOW, newPackage.Electricity)
  console.log('primray energy', newPackage.PrimaryEnergy)


  newPackage.gasSaving = calculateGasSaving (newPackage.Spaceheating)
  newPackage.costSaving = calculateCostSaving (newPackage.costSaving)

  setPackage2(newPackage)
  saveDataToLocalStorage()

}

function selectPackage2roof(value) {
  const newPackage = Package2
  newPackage.RCValueRoof = value
  newPackage.Spaceheating = selectSpaceheating(newPackage.RCValueWall,newPackage.RCValueRoof)
  console.log ('Spaceheating P2',newPackage.Spaceheating)
 
  newPackage.DHOW = currentSelectedProject.DHOW
  newPackage.Electricity = currentSelectedProject.Electricity

  newPackage.PrimaryEnergy = calculatePrimaryEnergy (newPackage.Spaceheating, newPackage.DHOW, newPackage.Electricity)
  console.log('primray energy', newPackage.PrimaryEnergy)

  newPackage.gasSaving = calculateGasSaving (newPackage.Spaceheating)
  newPackage.costSaving = calculateCostSaving (newPackage.costSaving)

  setPackage2(newPackage)
  saveDataToLocalStorage()

}


useEffect(()=> {
  const storedPackage = JSON.parse(localStorage.getItem('newPackage'));
  setPackage1 (storedPackage[0])
  setPackage2 (storedPackage[1])
}
)

function saveDataToLocalStorage(){
  localStorage.setItem('newPackage', JSON.stringify([Package1, Package2]));
  
}


//TRY OUT WITH USE EFFECT (Instead i use the function saveDataToLocalStorage)
 //save package information in array and show results only when RC was selected

// useEffect(() => {
//   const newPackages = [Package1, Package2]
//   const storedPackage = JSON.parse(localStorage.getItem('newPackage'))
//   setnewPackages (storedPackage)
//   const storedPackage1 = storedPackage[0]

//   setSpaceheating (storedPackage1.Spaceheating)
//   // setRCValueRoof (storedPackage.RCValueRoof)
//   // setPackage1 (storedPackage.RCValueWall)
//   // setPackage1(storedPackage.newPackage)
//   // setPackage2(storedPackage.newPackage)

// }, []);


// useEffect(() => {
//   localStorage.setItem('newPackage', JSON.stringify([Package1, Package2]));
  
//   console.log ('Package1', Package1)
//   console.log ('Package2', Package2)

// });





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
function calculatePrimaryEnergy(Spaceheating, DHOW, Electricity) {
  const PrimaryEnergyValue = Math.round((((((Spaceheating + DHOW) * ConversionFactorGas) + ((Electricity * ConversionFactorEle) / TransfereeEle))*0.277777) + Number.EPSILON) * 100) / 100
  return PrimaryEnergyValue
}


//Calculate Gas Saving
function calculateGasSaving (){
  const newPackageSpaceheating = [Package1.Spaceheating, Package2.Spaceheating] 
  const currentSpaceheating = currentSelectedProject.Spaceheating
  const gasSavingValue = Math.round(currentSpaceheating - newPackageSpaceheating)
  console.log('spaceheating current', newPackageSpaceheating[0])

  return gasSavingValue
}

const [costSaving, setcostSaving] = useState()
const [gasPrice, setgasPrice] = useState(0.814)

//Calculate Cost Saving
function calculateCostSaving (Spaceheating) {
  const costSavingValue = (Spaceheating*gasPrice)
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
                        <ControlledOpenSelect options={RCValueWall} selectvaluechange={selectPackage1wall}></ControlledOpenSelect>
                        </div>
                        <div className="column">
                        <ControlledOpenSelect options={RCValueWall} selectvaluechange={selectPackage2wall}></ControlledOpenSelect>
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
                        <ControlledOpenSelect options={RCValueRoof} selectvaluechange={selectPackage1roof}></ControlledOpenSelect>
                        </div>
                        <div className="column">
                        <ControlledOpenSelect options={RCValueRoof} selectvaluechange={selectPackage2roof}></ControlledOpenSelect>
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
                        <Typography className="columncomputed">{currentSelectedProject.PrimaryEnergy}</Typography>
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
                        <Typography className="columncomputed">{currentSelectedProject.EnergyLabel}</Typography>
                        <Typography placeholder="C" className="column">ei</Typography>
                        <Typography placeholder="B" className="column">ei</Typography>
                    </Box>
                    <Box class="blocktitleRP">
                        <Typography className="column" > 
                          CO2
                        </Typography>
                        <Typography className="column"> 
                         (kgCO2/a)
                        </Typography>
                        <Typography className="columncomputed">{currentSelectedProject.CO2op}</Typography>
                        <Typography placeholder="C" className="column">ei</Typography>
                        <Typography placeholder="B" className="column">ei</Typography>
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
