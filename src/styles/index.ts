import { Grid, requirePropFactory } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";

export const drawerWidth = "20%";
const miniDrawerWidth = 60

const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: "center",
    marginTop: "100px",
  },
  formBoxS: {
    marginLeft:'10%',
    height: "100px",
    width: "1000px",
    bgcolor: "#FFFFFF",

  },
  formBoxL: {
    marginLeft:'10%',
    height: "1500px",
    width: "1000px",
    bgcolor: "#FFFFFF",
  },
  box: {
    color: "inherit"
  },
  wrapper: {
    display: "Grid",
  },
  image: {
    margin: "20px auto 20px auto",
  },
  pageTitle: {
    margin: "10px auto 20px auto",
  },
  textField: {
    margin: "10px auto 20px auto",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  progress: {
    position: "absolute",
  },
  grid: {
    width: "50px",
    marginLeft: '30%',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: '900px',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(2),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  input: {
    display: "none",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  collapse: {
    zIndex: theme.zIndex.appBar + 1,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawerPaper: {
    width: drawerWidth,
    marginLeft: miniDrawerWidth,
  },
  miniDrawerPaper: {
    width: miniDrawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  miniDrawer: {
    width: miniDrawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    zIndex: 0
  },
  

        hover: {
          color: "black",
            "&:hover": {
                color: "pink !important",
        },
      },


}));

export default useStyles;
