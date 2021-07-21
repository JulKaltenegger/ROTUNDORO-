import React, { useState, useContext, useRef, useEffect, useReducer} from "react";
import useStyles from "@styles";
import AppContext from '@context';
import "../App.css";
import {
  Grid,
  Button, 
  Typography,
  TextField,
  Paper,
  Box
} from "@material-ui/core";
import { Link, Redirect } from 'react-router-dom';
import NavbarMinMP from '../components/NavbarMin/NavbarMinMP';
import { render } from "react-dom";
import Divider from "@material-ui/core/Divider";
import MyProjects from "./MyProjects";
import { isTemplateExpression } from "typescript";


function MyProjectsPerformance() {
 
  const classes = useStyles()
  const {context, setContext} = useContext(AppContext)


//Read data from browser cash and write in variables  //add global contaxt variable {MyProject}
   const [myProjects, setmyProjects] = useState([]);
   const [currentSelectedProject, setcurrentSelectedProject] = useState({}) 

//Define User input for energy calculaiton
    const [Spaceheating, setSpaceHeating] = useState(0)
    const [DHOW, setDHOW] = useState(0)
    const [Electricity, setElectricity] = useState(0)

//Perform Primary Energy wit user input from above
    const [PrimaryEnergy, setPrimaryEnegery] = useState(0) 
    const [EnergyLabel, setEnergyLabel] = useState("")
    const [CO2op, setCO2op] = useState(0)

    const [ConversionFactorGas, setConversionFactorGas] = useState(35.17)
    const [ConversionFactorEle, setConversionFactorEle] = useState(3.6)
    const [TransfereeEle, setTransfereeEle] = useState(0.39)

//Refurbishment time
    const [constructionYear, setconstructionYear] = useState(0)
    const [refurbishmentYear, setrefurbishmentYear] = useState(0)
    const [refurbishmentLife, setrefurbishmentLife] = useState(0)


//Store ProjectS in one arry, and select first project as current project & store other variables to it.
   useEffect(() => {
    //  const myProjects = localStorage.getItem('myProjects'[0])
    const storedProjects = JSON.parse(localStorage.getItem('myProjects'))
    setmyProjects (storedProjects)
    const storedProject = storedProjects[0]

    setcurrentSelectedProject (storedProject) 
    setSpaceHeating (storedProject.spaceHeating)
    setDHOW (storedProject.DHOW)
    setElectricity (storedProject.Electricity)
    setPrimaryEnegery (storedProject.PrimaryEnergy)
    setEnergyLabel (storedProject.EnergyLabel)
    setCO2op (storedProject.CO2op)
    setconstructionYear (storedProject.constructionYear)
    setrefurbishmentYear (storedProject.refurbishmentYear)
    setrefurbishmentLife (storedProject.refurbishmentLife)
    },
    
    []);

  useEffect(() => {
     localStorage.setItem('myProjects', JSON.stringify(myProjects));
   }, [myProjects]);
    



//After initializing the value, we can useEffect to store value on local storage

useEffect(() => {
    localStorage.setItem('Spaceheating', JSON.stringify(Spaceheating));
  }, [Spaceheating]);


  useEffect(() => {
    localStorage.setItem('DHOW', JSON.stringify(DHOW))
  }, [DHOW]);

  useEffect(() => {
    localStorage.setItem('Electricity', JSON.stringify(Electricity))
  }, [Electricity]);



//Get user input (+ means translate to numbers) On change handerle
//calculatePrimarEnergy: +value... updates the user imput of all 3 value sat them same time

  function getSpaceHeating(val) 
  {
    setSpaceHeating(+val.target.value)
    // copy created new project to the current selected project, as first element of the list.
    const newProject = currentSelectedProject
    // current selected project, we update the entered spaceheating by user.
    newProject.spaceHeating = +val.target.value
    //save the use state to the setState of new project
    setcurrentSelectedProject (newProject)
    //create a copy of the stored list of projects (React)
    const newMyProject = [...myProjects]
    //update the first element in the list
    newMyProject [0] = newProject
    //store it to the use state, that triggers the user effect on the my projects, which saves it to the local storage,
    setmyProjects (newMyProject)

    console.log(val.target.value)
    calculatePrimaryEnergy(+val.target.value, DHOW, Electricity)
  }

  function getDHOW(val) 
  {
    setDHOW(parseFloat(val.target.value))

    const newProject = currentSelectedProject
    newProject.DHOW = +val.target.value
    setcurrentSelectedProject (newProject)
    const newMyProject = [...myProjects]
    newMyProject [0] = newProject
    setmyProjects (newMyProject)

    console.log(val.target.value)
    calculatePrimaryEnergy(Spaceheating, +val.target.value, Electricity)
  }

  function getElectricity(val) 
  {
    setElectricity(parseFloat(val.target.value))

    const newProject = currentSelectedProject
    newProject.Electricity = +val.target.value
    setcurrentSelectedProject (newProject)
    const newMyProject = [...myProjects]
    newMyProject [0] = newProject
    setmyProjects (newMyProject)
    
    console.log(val.target.value)
    calculatePrimaryEnergy(Spaceheating, DHOW, +val.target.value)
  }

 
 
  //After initializing the value, we can useEffect to store value on local stoareg
  useEffect(() => {
    localStorage.setItem('PrimaryEnergy', JSON.stringify(PrimaryEnergy))
  }, [PrimaryEnergy]);


  useEffect(() => {
    localStorage.setItem('CO2op', JSON.stringify(CO2op))
  }, [CO2op]);

  //when Primary energy is calculated, render Energy lable and CO2op (based on primary energy)
  function calculatePrimaryEnergy(SpaceHeating, Dhow, electricity) {
    
    const PrimaryEnergyValue = Math.round((((((SpaceHeating + Dhow) * ConversionFactorGas) + ((electricity * ConversionFactorEle) / TransfereeEle))*0.277777) + Number.EPSILON) * 100) / 100
    localStorage.setItem('PrimaryEnergy', PrimaryEnergy)

    setPrimaryEnegery (PrimaryEnergyValue)
    calculateEnergyLabel(PrimaryEnergyValue)
    calculateCO2op (PrimaryEnergyValue)

    //redo line 89 to 99
    // assign the PrimaryEnergyValue towrds the fisrt project in the record.
    const newProject = currentSelectedProject
    newProject.PrimaryEnergy = PrimaryEnergyValue
    newProject.EnergyLabel = EnergyLabel
    newProject.CO2op =CO2op
    setcurrentSelectedProject (newProject)
    const newMyProject = [...myProjects]
    newMyProject [0] = newProject
    setmyProjects (newMyProject)



  }

  // Energy Lable calc. define value, then translate to alph.num. value
  const [buildingArea, setbuildingArea] = useState(100)
  
  function calculateEnergyLabel(PrimaryEnergyValue) {
    const EnergyLabelValue = PrimaryEnergyValue/buildingArea
      switch (true) {
        case (EnergyLabelValue <= 138.84):
          setEnergyLabel ("A")
          break;
        case (EnergyLabelValue <= 162.08):
          setEnergyLabel ("B")
          break;
        case (EnergyLabelValue <= 174.27):
          setEnergyLabel ("C")
          break;
        case (EnergyLabelValue <= 195.60):
          setEnergyLabel ("D")
          break;  
        case (EnergyLabelValue <= 211.55):
          setEnergyLabel ("E")
          break;
        case (EnergyLabelValue <= 223.83):
          setEnergyLabel ("F")
          break;
        case (EnergyLabelValue <= 232.10):
          setEnergyLabel ("G")
          break;  
        default:
          setEnergyLabel ("need to improve")
          break;
      }
  }


  //CO2 operational 
  const [CO2coef, setCO2coef] = useState(0.2019)

  function calculateCO2op(PrimaryEnergyValue) {
    const CO2opValue = Math.round((PrimaryEnergyValue * CO2coef + Number.EPSILON) * 100) / 100 
    setCO2op (CO2opValue)
  }


  //Construction time
  function getconstructionYear(val) {
    
    setconstructionYear(parseFloat(val.target.value))

    const newProject = currentSelectedProject
    newProject.constructionYear = +val.target.value
    setcurrentSelectedProject (newProject)
    const newMyProject = [...myProjects]
    newMyProject [0] = newProject
    setmyProjects (newMyProject)

    console.log(val.target.value)
  }

  function getrefurbishmentYear(val) {

    setrefurbishmentYear(parseFloat(val.target.value))

    const newProject = currentSelectedProject
    newProject.refurbishmentYear = +val.target.value
    setcurrentSelectedProject (newProject)
    const newMyProject = [...myProjects]
    newMyProject [0] = newProject
    setmyProjects (newMyProject)

    console.log(val.target.value)

  }

  function getrefurbishmentLife(val) {

    setrefurbishmentLife(parseFloat(val.target.value))

    const newProject = currentSelectedProject
    newProject.refurbishmentLife = +val.target.value
    setcurrentSelectedProject (newProject)
    const newMyProject = [...myProjects]
    newMyProject [0] = newProject
    setmyProjects (newMyProject)

    console.log(val.target.value)

  }


    return ( 
      <div className={classes.root}>
      {context.currentProject ? (
          <Grid container className={classes.form} xs={12} spacing={4} >
            <Grid xs={12} container spacing={2} >
              <Grid item xs={3}> here is the menue</Grid>                          
                  <Grid xs={9} container className={classes.form}>                    
                    <Grid item className={classes.formBoxS} >
                        <NavbarMinMP/>                
                    </Grid>                               
                    <Grid item className={classes.formBoxL}>
                      <Box class="blocktitleMP">
                        <div className="leftSide">
                          {/* //Project related information to enter by user XOR from MyProjects/dashboard page */}
                          <p>  
                          <Typography class="headertext">Information</Typography>
                          <Typography class="simpletext">Project Name</Typography>
                          <Typography class="simpletext">Client Name</Typography>
                          <Typography class="simpletext">Building Type </Typography>
                          </p>
                          {/* //building characteristics to enter by user */}
                          <p>
                          <Typography class="headertext">Building Characteristics</Typography>
                          <Typography class="simpletext">Construction Year</Typography>
                          <Typography class="simpletext">Refurbishment Year</Typography>
                          <Typography class="simpletext">Refurbishment Lifespan</Typography>
                          </p>
                          {/* //energy and carbon input as-built to enter by user */}
                          <p>
                          <Typography class="headertext">Energy and Carbon </Typography>
                          <Typography class="simpletext">Space heating Gas (m³/a)</Typography>
                          <Typography class="simpletext">DHW Gas (m³/a)</Typography>
                          <Typography class="simpletext">Electricity (kWh/a)</Typography>
                          </p>
                          {/* //show the computed results for */}
                          <p>
                          <Typography class="headertext">As-Is Performance </Typography>
                          <Typography class="simpletext">Primary Energy (kWh/a)</Typography>
                          <Typography class="simpletext">Energy Label (A-G)</Typography>
                          <Typography class="simpletext">CO2 (kgCO2/a)</Typography>
                          </p>
                        </div>
                        <div className="rightSide">
                          <p>
                            <Typography class="computedtext">{currentSelectedProject.projectName}</Typography>
                            <Typography class="computedtext">{currentSelectedProject.clientName}</Typography> 
                            <Typography class="computedtext">{currentSelectedProject.buildingType}</Typography>
                          </p>
                          <p>
                            <p>.</p>
                            <p><TextField onChange={getconstructionYear} value={constructionYear}/></p>
                            <p><TextField onChange={getrefurbishmentYear} value={refurbishmentYear}/></p> 
                            <p><TextField onChange={getrefurbishmentLife} value={refurbishmentLife} /></p>
                          </p>
                          <p>
                             <p>.</p>
                            <p><TextField type="text" onChange={getSpaceHeating} value={Spaceheating}/></p>
                            <p><TextField type="text" onChange={getDHOW} value={DHOW}/></p> 
                            <p><TextField type="text" onChange={getElectricity} value={Electricity}/></p>
                          </p>        
                          <p>
                            <p>.</p>
                            <Typography class="computedtext">{PrimaryEnergy}</Typography>
                            <Typography class="computedtext">{EnergyLabel}</Typography> 
                            <Typography class="computedtext">{CO2op}</Typography>
                          </p>
                        </div>
                      </Box>  
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

export default MyProjectsPerformance
