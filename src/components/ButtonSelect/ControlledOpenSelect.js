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

//input variable passed where component is called,
export default function ControlledOpenSelect({options, selectvaluechange, defaultValue}) {
  const classes = useStyles();
  const [value, setvalue] = React.useState(defaultValue);

  //handle change, calling the function to notify that there is an update of the value.  
  const handleChange = (event) => {
    selectvaluechange (event.target.value)
    setvalue(event.target.value)
    console.log(event.target.value)
  };

  // initialization of the default value
  useEffect(() => {
    setvalue(defaultValue)
  },[]);

  // [] puting in the defaultValue updates when the value is changing.
  useEffect(() => {
    setvalue(defaultValue)
  },[defaultValue]);

    
  return (
    <FormGroup row>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Select</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={value}
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
        </Select>
      </FormControl>
    </FormGroup>
  );
}