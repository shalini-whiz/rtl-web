import React from "react";
import PropTypes from "prop-types";

import { customStyles } from "../../styles/tableStyle";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
const { Card, CardHeader, CardContent, CardActions, Button, LinearProgress, Divider,
  Typography, Box, RadioGroup, Radio, FormControlLabel, FormControl, InputLabel, Select, MenuItem,
  ToggleButtonGroup, ToggleButton, FormGroup, Switch,
  Icon, List, ListItem, ListItemText, Link } = require("@mui/material")
const { commons, util } = require("../../commons")
const { SnackBarWidget } = require("../../Widget");

let files = [
  {
    "name": "APD2DBOW256_uart_address_block_RegSlave.v",
    "path": "D:\\flask-projects\\rtl-gen\\6788000a9b3d13088964a48b\\outputs\\APD2DBOW256_uart_address_block_RegSlave.v"
  },
  {
    "name": "APD2DBOW256_uart_address_block_RegSlave_dmatrix.v",
    "path": "D:\\flask-projects\\rtl-gen\\6788000a9b3d13088964a48b\\outputs\\APD2DBOW256_uart_address_block_RegSlave_dmatrix.v"
  },
  {
    "name": "APD2DBOW256_uart_address_block_RegSlave_MACROS.v",
    "path": "D:\\flask-projects\\rtl-gen\\6788000a9b3d13088964a48b\\outputs\\APD2DBOW256_uart_address_block_RegSlave_MACROS.v"
  }
]

const LabeledSwitch = ({ checked, onChange, labelLeft, labelRight }) => {
  return (
    <FormGroup row>
      <Box display="flex" alignItems="center" mr={1}>
        <Typography variant="body1">{labelLeft}</Typography>
      </Box>
      <FormControlLabel control={<Switch checked={checked} onChange={onChange} />} label="" style={{ margin: 0 }} />
      <Box display="flex" alignItems="center" ml={1}>
        <Typography variant="body1">{labelRight}</Typography>
      </Box>
    </FormGroup>);
};

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      message: "",
      apiService: false,
      fileList: [],
      viewType: true,
      projectId: "",
      projects: [],
      projectError: false
    };
  }

  componentDidMount() {
    console.log("call projects")
    // this.getProjects();
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
          //this.getInputs()
        }
      });
  }
  getInputs = () => {
    this.setState({ apiService: true })
    let projectId = localStorage.getItem("projectId")
    let params = { "op": "viewInputs", type: this.props.type.toLowerCase(), projectId: projectId };
    commons.getAPIRes(params, "POST", "project")
      .then(res => {

        this.setState({ apiService: false })
        if (res.status) {
          this.setState({ fileList: res.result, message: "Files fetched successfully", status: true })
        }

        setTimeout(function () {
          this.setState({ fileList: res.result, message: "Files fetched successfully", status: true })
          this.loadDefaults()
        }.bind(this), 2000)
      });
  }

  getOutputs = () => {
    this.setState({ apiService: true })
    let projectId = localStorage.getItem("projectId")

    let params = { "op": "viewOutputs", type: this.props.type.toLowerCase(), projectId: projectId };



    fetch('http://localhost:3000/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params) // Your request body
    })
      .then(response => {
        if (!response.ok) {
          // If response is not OK, reject with status text
          return Promise.reject(`HTTP error! status: ${response.status}`);
        }
        // Otherwise, process the response as a Blob
        return response.blob();
      })
      .then(blob => {
        // Handle the Blob data (e.g., download the file, display it, etc.)

        console.log('Received Blob:', blob);
        this.setState({ apiService: false })
        setTimeout(function () {
          this.setState({ fileList: [], message: "Files fetched successfully", status: true })
          this.loadDefaults()
        }.bind(this), 2000)
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'files.zip');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error during fetch operation:', error);
      });

  }

  loadDefaults = () => {
    this.setState({ status: false, message: "" })
  }
  handleProject = (e) => {
    console.log("projectId : " + e.target.value)
    console.log(e.target.value.toString())
    this.setState({ projectId: e.target.value.toString() })
  }

  resetForm = async () => {
    this.props.cancelDialog()
  };



  onSubmit = async () => {
    let { viewType } = this.state;
    let projectId = localStorage.getItem("projectId")
    this.setState({ projectError: false })
    if (projectId == '') {
      this.setState({ projectError: true })
      return;
    }

    if (viewType == true) this.getOutputs()
    else this.getInputs()

  };

  render() {
    const { status, message, apiService,
      projectId, projects, projectError, viewType, fileList } = this.state;

    return (
      <Box sx={{ alignContent: 'center' }}>
        <Card style={{ margin: "10px" }} variant="outlined" sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          minHeight: 450
        }}>

          <CardContent>



            {/* <FormControl row fullWidth style={{ marginBottom: 10 }} error={projectError}>
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
            </FormControl> */}
            <div style={{ display: 'flex', flexDirection: 'row' }} >
              {/* <LabeledSwitch
                checked={viewType} onChange={(e) => this.handleSwitchChange(e)}
                labelLeft="View Inputs" labelRight="View Outputs" /> */}

              <div style={{ flexDirection: 'end', flex: 1, float: 'end' }}>
                <Button variant="contained" color="primary"
                  style={customStyles.successBtn}
                  size="small" onClick={e => this.onSubmit(e)}
                >
                  Download Inputs/Outputs
                </Button>
              </div>

            </div>

            {apiService ? <LinearProgress /> : false}
            <List>
              {fileList.map((file, index) => (
                <ListItem key={index}>
                  <ListItemText primary={file.name} secondary={<Link href={file.path} download> Download </Link>} />
                </ListItem>))}
            </List>
          </CardContent>
          <CardActions style={{ justifyContent: "flex-end" }} >

          </CardActions>
        </Card>
        {console.log(message)}
        {console.log(status)}

        <SnackBarWidget message={message} status={status} />
      </Box>
    );
  }
}

FileList.propTypes = {
  id: PropTypes.string,
  cancelDialog: PropTypes.func,
  reloadPage: PropTypes.func,
  action: PropTypes.string
};
export default FileList;
