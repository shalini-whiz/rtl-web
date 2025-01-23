import React from "react";
import PropTypes from "prop-types";

import { customStyles } from "../../styles/tableStyle";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
const { LinearProgress, Divider,
  Typography, Box, FormControlLabel, FormControl, InputLabel, Select, MenuItem,
  FormGroup, Switch,
  Icon, } = require("@mui/material")
const { commons, util } = require("../../commons")
const { SnackBarWidget } = require("../../Widget");


class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      message: "",
      apiService: false,
      projectId: "",
      projects: [],
      projectError: false
    };
  }

  componentDidMount() {
    this.getProjects();
  }

  handleSwitchChange = (event) => {
    this.setState({ viewType: event.target.checked });
  };


  getProjects = () => {
    let params = { "op": "getProject" };
    console.log("params " + JSON.stringify(params))
    commons.getAPIRes(params, "POST", "project")
      .then(res => {
        if (res.status) {
          const transformedData = res.result.map(item => ({ ...item, _id: item._id.$oid }));
          this.setState({ projects: transformedData, projectId: transformedData[0]._id })
          localStorage.setItem("projectId", transformedData[0]._id)
        }
      });
  }


  loadDefaults = () => {
    this.setState({ status: false, message: "" })
  }
  handleProject = (e) => {
    console.log("projectId : " + e.target.value)
    console.log(e.target.value.toString())
    this.setState({ projectId: e.target.value.toString() })
    localStorage.setItem("projectId", e.target.value.toString())

  }


  render() {
    const { status, message, apiService,
      projectId, projects, projectError, viewType, fileList } = this.state;

    return (
      <Box sx={{ alignContent: 'center' }}>
        <FormControl row fullWidth style={{ marginBottom: 10 }} error={projectError}>
          <br />
          <InputLabel id="demo-simple-select-label">Project</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={projectId}
            label="Project"
            onChange={(e) => this.handleProject(e)}
          >
            {projects.map(item =>
              <MenuItem value={item._id.toString()}>{item.name}</MenuItem>
            )}

          </Select>
        </FormControl>
        {apiService ? <LinearProgress /> : false}
        <SnackBarWidget message={message} status={status} />
      </Box>
    );
  }
}

Project.propTypes = {
  id: PropTypes.string,
  cancelDialog: PropTypes.func,
  reloadPage: PropTypes.func,
  action: PropTypes.string
};
export default Project;
