import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStyles from "@styles"
import "../../App.css";
import { Divider, Button} from '@material-ui/core';

function createData(ProjectName, ClientName, BuildingType) {
  return { ProjectName, ClientName, BuildingType };
}

  // const rows = [
  //   createData('Project01', 'Thijs', 'Rijwoning'),
  //   createData('Project02', 'Indie', '2 onder 1 kap'),
  //   createData('Project03', 'Julia', 'Detached'),
  // ];

  export default class MyProjectTable extends Component {
    classes = { 
      table: {
        minWidth: '900px',
      }
    }

    constructor(props) {
      super(props)
      this.state = {}
    }

    //render update
    componentDidUpdate = () => {
      console.log('updated!')
    }

    render() {
      return (
        <div> 
        <TableContainer component={Paper}>
          <Table className={this.classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Client Name</TableCell>
                <TableCell>Buiding Type</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Save</TableCell>
              </TableRow>
            </TableHead>
            <Divider/>
            <TableBody>
              {/* {JSON.stringify(
                this.props.rows
              )}  */}
              {this.props.rows.map((row) => (                
              <TableRow key={row.projectName}>
                <TableCell> {row.projectName} </TableCell>
                <TableCell> {row.clientName} </TableCell>
                <TableCell> {row.buildingType} </TableCell>
                <TableCell>
                 <Button variant="contained" color="primary" size="small" > Edit </Button>
                </TableCell> 
                <TableCell>
                  <Button variant="contained" color="primary" size="small" > Save </Button>
                </TableCell>
              </TableRow>
               ))}
            </TableBody>
          </Table>
      </TableContainer>
    </div>
      )
    }
  }
  


  // export default function MyProjectTable(props) {
  //   const classes = useStyles();
  
  //   //render update
  //   function componentDidUpdate(prevProps, prvState) {
  //     console.log('updated')
  //   }
    
  //   return (
  //     <div> 
  //         <TableContainer component={Paper}>
  //           <Table className={classes.table}>
  //             <TableHead>
  //               <TableRow>
  //                 <TableCell>Project Name</TableCell>
  //                 <TableCell>Client Name</TableCell>
  //                 <TableCell>Buiding Type</TableCell>
  //                 <TableCell>Edit</TableCell>
  //                 <TableCell>Save</TableCell>
  //               </TableRow>
  //             </TableHead>
  //             <Divider/>
  //             <TableBody>
  //               {JSON.stringify(
  //                 props.rows
  //               )} 
  //               {props.rows.map((row) => (                
  //               <TableRow key={row.projectName}>
  //                 <TableCell> {row.projectName} </TableCell>
  //                 <TableCell> {row.clientName} </TableCell>
  //                 <TableCell> {row.buildingType} </TableCell>
  //                 <TableCell>
  //                  <Button variant="contained" color="primary" size="small" > Edit </Button>
  //                 </TableCell> 
  //                 <TableCell>
  //                   <Button variant="contained" color="primary" size="small" > Save </Button>
  //                 </TableCell>
  //               </TableRow>
  //                ))}

  //             </TableBody>


  //           </Table>
  //       </TableContainer>
  //     </div>

  //   );
  // }
  