import { Register, Login, Project, ProjectSetup, Home, MyProjects, Refurbishments, Materials, LifeCycleAssessment, Costs } from "./pages";

import { Navbar } from "@components";
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
              <AuthRoute exact path="/refurbishments" component={Refurbishments} />
              <AuthRoute exact path="/materials" component={Materials} />
              <AuthRoute exact path="/lifecycleassessment" component={LifeCycleAssessment} />
              <AuthRoute exact path="/costs" component={Costs} />
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
