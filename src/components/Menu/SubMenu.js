// import React, { useState, useContext } from "react";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Drawer from "@material-ui/core/Drawer";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Divider from "@material-ui/core/Divider";
// import { Button } from "@material-ui/core";
// import useStyles from "@styles";
// import AppContext from "@context";
// import pluginDictionary from './pluginDictionary'
// import MainMenu from "./MainMenu";


// export default function SubMenu() {
//   const classes = useStyles();
//   const theme = useTheme();
//   const { context, setContext } = useContext(AppContext);
//   const activeSubMenu = context.SubMenu || null

//   function activatePlugin(SubMenu) {
//     if (activeSubMenu === SubMenu) {
//       setContext({...context, SubMenu: null})
//     } else {
//       setContext({...context, SubMenu})
//     }
//   }

//   const pluginComponent = () => {
//     if (activePlugin) {
//       const Comp = pluginDictionary[activePlugin].plugin;
//       return <Comp></Comp>;
//     } else {
//       return <div></div>;
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <Drawer
//         variant="permanent"
//         className={classes.miniDrawer}
//         classes={{ paper: classes.miniDrawerPaper }}
//       >
//         <div className={classes.toolbar}></div>
//         <Divider />
//         {Object.keys(pluginDictionary).map((text, index) => {
//           const Icon = pluginDictionary[text].icon;
//           return (
//             <div style={{ margin: 10, marginLeft: 4 }} key={text}>
//               <Button
//                 id={text}
//                 // variant="contained"
//                 // size="small"
//                 style={{ marginLeft: -10, height: 30, width: 30 }}
//                 startIcon={
//                   <Icon
//                     color={activePlugin === text ? "primary" : "disabled"}
//                     style={{ width: 30, height: 30, marginLeft: 20 }}
//                     fontSize="large"
//                   />
//                 }
//                 onClick={() => activatePlugin(text)}
//               />
//             </div>
//           );
//         })}
//         <Divider />        
//         {MainMenu()}
//       </Drawer>
//     </div>
//   );
// }
