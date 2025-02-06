import React from "react";
import PropTypes from "prop-types";
import AuthService from "../../service/AuthService";
import appStyles from "../../styles/appStyles";
import { customStyles } from "../../styles/tableStyle";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupAddSharp from "@mui/icons-material/GroupAddSharp"
import { UploadFileOutlined } from "@mui/icons-material";
import UploadInputs from "./UploadInputs";
const { Card, CardHeader, CardContent, CardActions, Button, LinearProgress, Divider,
  Typography, Box, RadioGroup, Radio, FormControlLabel, FormControl, InputLabel, Select, MenuItem,
  ToggleButtonGroup, ToggleButton, IconButton, Tooltip,
  Icon,
  Paper } = require("@mui/material")

const { commons, util } = require("../../commons")
const { SnackBarWidget } = require("../../Widget");


class FileActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      message: "",
      apiService: false,
      selectedImage: null,
      uploadErr: "",
      selectedRadio: "",
      projectId: "",
      toggleAction: 'uploadFile',
      projects: [],
      projectError: false
    };
  }

  componentDidMount() {
    console.log("call projects")
    this.getProjects()
  }


  getProjects = () => {
    let params = { "op": "getProject" };
    console.log("params " + JSON.stringify(params))
    commons.getAPIRes(params, "POST", "project")
      .then(res => {
        if (res.status) {
          const transformedData = res.result.map(item => ({ ...item, _id: item._id.$oid }));
          this.setState({ projects: transformedData })

        }

      });
  }



  resetForm = async () => {
    this.props.cancelDialog()
  };
  handleToggle = (e, value) => {
    this.setState({ toggleAction: value })
  }
  uploadFile = async (e) => {
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel', 'application/xml', 'text/xml'];
    console.log(e.target.files[0]);
    let uploadedFile = e.target.files[0];
    console.log(uploadedFile.type)
    if (!uploadedFile) {
      this.setState({ uploadErr: 'Please select image.' });
    }
    else if (uploadedFile && !validTypes.includes(uploadedFile.type)) {
      console.log(2)
      this.setState({ uploadErr: 'Please select valid file.' });
    }
    else if (uploadedFile && uploadedFile.type === "") {
      this.setState({ uploadErr: 'Please select valid file.' });
    }
    else this.setState({ selectedImage: uploadedFile, uploadErr: "" })
    console.log("uploadErrr" + this.state.uploadErr)

  }
  handleProject = (e) => {
    console.log("projectId : " + e.target.value)
    console.log(e.target.value.toString())
    this.setState({ projectId: e.target.value.toString() })
  }
  saveProfile = async () => {
    let { selectedImage, projectId } = this.state;
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel', 'application/xml', 'text/xml'];
    this.setState({ uploadErr: "", projectError: false })
    if (projectId == '') {
      this.setState({ projectError: true })
      return;
    }
    if (!selectedImage) {
      this.setState({ uploadErr: 'Please select file.' });
      return;
    }
    console.log("on save")
    console.log(selectedImage.type)

    if (selectedImage && !validTypes.includes(selectedImage.type)) {
      this.setState({ uploadErr: 'Please select valid file.' });
      return;
    }
    console.log(projectId.toString())
    let data = new FormData();
    data.append('projectId', projectId);
    data.append('file', selectedImage);
    data.append('type', this.props.type)
    data.append('op', 'fileInputs')
    for (var pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1] + " , " + typeof pair[1]);
    }
    let apiRes = await commons.getAPIRes(data, "POSTFORMDATA", "fileInputs");
    console.log("upload file apiRes here " + JSON.stringify(apiRes))
    if (apiRes.status) {


    }

  };

  render() {
    const { status, message, apiService,
      toggleAction, } = this.state;

    return (
      <Box sx={{
        alignContent: 'center',
        height: 450

      }}>
        {apiService ? <LinearProgress /> : false}
        {commons.detectInternet()}
        <Paper elevation={3}>
          <div style={{ display: 'flex', justifyContent: 'end', flexDirection: "row" }}>
            <div style={{ flex: 1 }}>
              {toggleAction === "uploadFile" ? <UploadInputs type={this.props.type} /> :
                <div></div>}

            </div>
            {/* <div style={{ flexDirection: 'column', display: 'flex' }}>
              <IconButton aria-label="upload file"
                onClick={(e) => this.handleToggle(e, "uploadFile")}

                color={toggleAction == "uploadFile" ? 'primary' : ''}
              >
                <Tooltip title="Upload Files">
                  <CloudUploadIcon style={{ padding: 10 }} /></Tooltip>
              </IconButton>
              <IconButton aria-label="user"
                onClick={(e) => this.handleToggle(e, "managerUser")}
                color={toggleAction == "managerUser" ? 'primary' : ''}>
                <Tooltip title="Manage User">
                  <GroupAddSharp style={{ padding: 10 }} />
                </Tooltip>
              </IconButton>
            </div> */}
          </div>


        </Paper>
      </Box>
    );
  }
}

FileActions.propTypes = {
  id: PropTypes.string,
  cancelDialog: PropTypes.func,
  reloadPage: PropTypes.func,
  action: PropTypes.string
};
export default FileActions;
