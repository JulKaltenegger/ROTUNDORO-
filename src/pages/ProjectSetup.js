import React, { useState, useContext } from "react";
import {
  Grid,
  Typography,
  TextField,
  CircularProgress,
  Button,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import useStyles from "@styles";
import AppContext from "@context";
import { Link, Redirect } from "react-router-dom";
import {createProject} from 'lbd-server'


function ProjectSetup() {
  const classes = useStyles();
  const { context, setContext } = useContext(AppContext);
  const [projectName, setProjectName] = useState("myFirstProject");
  const [projectDescription, setProjectDescription] = useState("This is the description of my first project");
  // const [projectLabel, setProjectLabel] = useState("LBDserver project");
  const [publicness, setPublicness] = useState(true);
  const [loading, setLoading] = useState(false);
  const [projectCreated, setProjectCreated] = useState(false);

  async function submitProject(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await createProject({title: projectName, description: projectDescription, open: publicness}, context.user.token)
      setLoading(false);

      setContext({...context, currentProject: {...result, activeDocuments: [], activeGraphs: []}})
      setProjectCreated(true)
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  }

  return (
    <div>
      {projectCreated ? (
        <Redirect to="/project" />
      ) : (
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <Typography variant="h2" component={"span"} className={classes.pageTitle}>
              Create Project
            </Typography>
            <form onSubmit={(e) => submitProject(e)}>
              <TextField
                id="name"
                name="name"
                label="Name"
                className={classes.textField}
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                fullWidth
              />
              <TextField
                id="description"
                name="description"
                label="Description"
                multiline
                fullWidth
                rowsMax={10}
                className={classes.textField}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
              <FormControlLabel
                key={"privpub"}
                control={
                  <Switch
                    id={"privpub"}
                    onChange={(e) => setPublicness(!publicness)}
                    name="checkedB"
                    color="primary"
                    checked={publicness}
                  />
                }
                label={"Make this project public"}
              />
              <br />
              <Button
                type="submit"
                disabled={loading}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Create Project
                {loading && (
                  <CircularProgress size={20} className={classes.progress} />
                )}{" "}
              </Button>
              <br />
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      )}
    </div>
  );
}

export default ProjectSetup;
