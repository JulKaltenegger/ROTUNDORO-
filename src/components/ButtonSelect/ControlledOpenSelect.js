import React, {useContext, useState, useEffect } from 'react';
import {
  Typography,
  Box,
  FormGroup,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
}));

export default function ControlledOpenSelect({options, selectvaluechange}) {

  // const [options, setoption] = useState([]);
  // added Julia 07.07.2021
  // let RC = {
  //   id: 1,
  //   name: "RC 1.7",
  // }

  // const allRC = [
  //   {
  //     id: 1,
  //   name: "RC 1.7"
  //   },
  //   {
  //     id: 2,
  //   name: "RC 2.5"
  //   },
  //   {
  //     id: 3,
  //   name: "RC 4.0"
  //   },
  //   {
  //     id: 4,
  //   name: "RC 6.5"
  //   },
  // ]
//..............

  const classes = useStyles();
  const [RC, setRC] = React.useState({value:''});
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    // setRC({value: event.target.value});
    selectvaluechange (event.target.value)
    console.log(event.target.value)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  
  return (
    <FormGroup row>
      {/* <Button className={classes.button} onClick={handleOpen}>
        Open the select
      </Button> */}
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Select</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          // open={open}
          // onClose={handleClose}
          // onOpen={handleOpen}
          // value={RC.value}
          onChange={handleChange}
          class="dropdowntext"
        >
        <MenuItem value={0}>
          <em>None</em>
        </MenuItem>
            {
              options && options.map((option) => {
                return (<MenuItem key={option.id} value={option.value}>{option.name}</MenuItem>)
              })
            }
          
  {/* //tried by Julia 07.07.21 */}
          {/* {allRC.map(RC => {
            return(
              <MenuItem key={RC.id} value={RC}>{RC.name} </MenuItem>
            )
          })} */}
        </Select>
      </FormControl>
    </FormGroup>
  );
}