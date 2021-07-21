import { Register, Login, Project, ProjectSetup, Home, MyProjects, Refurbishments, Materials, LifeCycleAssessment, Costs } from "./pages";

import { Navbar } from "@components";
import { NavbarMin } from "@components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NonAuthRoute, AuthRoute } from "@util";
import AppContext, { initialState } from "@context";
import { useState, useEffect } from "react";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "@util/theme";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { newEngine } from "@comunica/actor-init-sparql";
import Plugins from "./plugins";
import MainMenu from "./components/Menu/MainMenu"
import SubMenu from "./components/Menu/SubMenu"
import RefurbishmentsDashboard from "./pages/RefurbishmentsDashboard";
import RefurbishmentsPerformance from "./pages/RefurbishmentsPerformance";
import MyProjectsDashboard from "./pages/MyProjectsDashboard";
import MyProjectsPerformance from "./pages/MyProjectsPerformance";
import MarketPotential from "./pages/MarketPotential";
import MarketPotentialDashboard from "./pages/MarketPotentialDashboard";
import MarketPotentialPerformance from "./pages/MarketPotentialPerformance";



const theme = createMuiTheme(themeFile);
const queryClient = new QueryClient();

function App() {
  const [context, setContext] = useState(initialState);

  useEffect(() => {
    try {
      const myEngine = newEngine();
      setContext({ ...context, comunica: myEngine });
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <AppContext.Provider value={{ context, setContext }}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Navbar/>
            <Plugins/>
            {/* <SubMenu/>
            <MainMenu/> */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/project" component={Project} />
              <AuthRoute exact path="/projectsetup" component={ProjectSetup} />
              <NonAuthRoute exact path="/register" component={Register} />
              <NonAuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/myprojects" component={MyProjects} />
              <AuthRoute exact path="/myprojects/dashboard" component={MyProjectsDashboard} />
              <AuthRoute exact path="/myprojects/performance" component={MyProjectsPerformance} />
              <AuthRoute exact path="/refurbishments" component={Refurbishments} />
              <AuthRoute exact path="/refurbishments/dashboard" component={RefurbishmentsDashboard} />
              <AuthRoute exact path="/refurbishments/performance" component={RefurbishmentsPerformance} />
              <AuthRoute exact path="/materials" component={Materials} />
              <AuthRoute exact path="/lifecycleassessment" component={LifeCycleAssessment} />
              <AuthRoute exact path="/costs" component={Costs} />
              <AuthRoute exact path ="/marketpotential" component={MarketPotential} />
              <AuthRoute exact path ="/marketpotential/dashboard" component={MarketPotentialDashboard} />
              <AuthRoute exact path ="/marketpotential/performance" component={MarketPotentialPerformance} />
            </Switch>
          </Router>
        </QueryClientProvider>
      </AppContext.Provider>
    </MuiThemeProvider>
  );
}

// function App() {
//   const model1= 'https://jwerbrouck.inrupt.net/public/myProjects/gravensteen/model.txt'
//   const model2 = 'https://raw.githubusercontent.com/LBDserver/resources/main/duplex/duplex.gltf'
//   return (
//     <div>
//       <GeometryComponent
//         height="96%"
//         width="86%"
//         models={[model2]}
//         projection="perspective"
//         selectionHandler={(data) => { return }}
//         queryResults={[]}
//       />
//     </div>
//   );
// }

export default App;
