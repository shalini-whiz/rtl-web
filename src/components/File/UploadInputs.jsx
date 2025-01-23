import React from "react";
import PropTypes from "prop-types";
import AuthService from "../../service/AuthService";
import appStyles from "../../styles/appStyles";
import { customStyles } from "../../styles/tableStyle";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { UploadFileOutlined } from "@mui/icons-material";
import FileList from "./FileList";
const { Card, CardHeader, CardContent, CardActions, Button, LinearProgress, Divider,
  Typography, Box, RadioGroup, Radio, FormControlLabel, FormControl, InputLabel, Select, MenuItem,
  ToggleButtonGroup, ToggleButton,
  Icon } = require("@mui/material")

const { commons, util } = require("../../commons")
const { SnackBarWidget } = require("../../Widget");


class UploadInputs extends React.Component {
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
      projects: [],
      projectError: false,
      inputKey: 0
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
          this.setState({ projects: transformedData, projectId: transformedData[0]._id })

        }

      });
  }



  resetForm = async () => {
    this.setState({ selectedImage: null, uploadErr: "", inputKey: 0 })
  };

  uploadFile = async (e) => {
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'];
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
    else this.setState({ selectedImage: uploadedFile, uploadErr: "", inputKey: 1 })
    console.log("uploadErrr" + this.state.uploadErr)

  }
  handleProject = (e) => {
    console.log("projectId : " + e.target.value)
    console.log(e.target.value.toString())
    this.setState({ projectId: e.target.value.toString() })
  }
  saveProfile = async () => {
    let { selectedImage } = this.state;
    console.log("local projectId" + localStorage.getItem("projectId"))
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'];
    this.setState({ uploadErr: "", projectError: false })
    let projectId = localStorage.getItem("projectId")
    if (projectId == '') {
      this.setState({ projectError: true })
      return;
    }
    if (!selectedImage) {
      this.setState({ uploadErr: 'Please select file.' });
      return;
    }


    if (selectedImage && !validTypes.includes(selectedImage.type)) {
      this.setState({ uploadErr: 'Please select valid file.' });
      return;
    }
    this.setState({ apiService: true })
    let data = new FormData();
    data.append('projectId', projectId);
    data.append('file', selectedImage);
    data.append('type', this.props.type.toLowerCase())
    data.append('op', 'fileUpload')
    for (var pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1] + " , " + typeof pair[1]);
    }
    let apiRes = await commons.getAPIRes(data, "POSTFORMDATA", "fileOp");
    console.log("upload file apiRes here " + JSON.stringify(apiRes))
    this.setState({ apiService: false })

    if (apiRes.status) {


    }

  };

  render() {
    const { status, message, apiService, selectedImage, uploadErr, selectedRadio,
      projectId, handleProject, toggleAction, projects, projectError } = this.state;

    return (
      <Box sx={{ alignContent: 'center' }}>
        {commons.detectInternet()}
        <Card style={{ margin: "10px" }} variant="outlined" sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          minHeight: 450
        }}>

          <CardContent>
            {apiService ? <LinearProgress /> : false}

            {/* <FormControl fullWidth style={{ marginBottom: 10 }} error={projectError}>
              <br />
              <InputLabel id="demo-simple-select-label">Project</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={projectId}
                label="Project"
                onChange={(e) => this.handleProject(e)}
              >
                {projects.map((item, index) =>
                  <MenuItem value={item._id.toString()} key={index}>{item.name}</MenuItem>
                )}

              </Select>
            </FormControl> */}
            <FormControl fullWidth style={{ marginBottom: 10 }}>
              <input
                type="file"
                name="myImage"
                onChange={(e) => this.uploadFile(e)}
              //key={this.state.inputKey}

              />

            </FormControl>
            <br />
            {console.log(this.state.inputKey)}
            {uploadErr.length ? <Typography color="error" variant="subtitle">

              {uploadErr}
            </Typography> : false}
          </CardContent>

          <CardActions style={{ justifyContent: "flex-end" }} >
            <Button variant="contained" color="primary"
              style={customStyles.errorBtn}
              size="small" onClick={e => this.resetForm(e)} >
              Cancel
            </Button>
            <Button variant="contained" color="primary"
              style={customStyles.successBtn}
              size="small" onClick={e => this.saveProfile(e)}
            >
              Submit
            </Button>
          </CardActions>
        </Card>

        <SnackBarWidget message={message} status={status} />
      </Box>
    );
  }
}

UploadInputs.propTypes = {
  id: PropTypes.string,
  cancelDialog: PropTypes.func,
  reloadPage: PropTypes.func,
  action: PropTypes.string
};
export default UploadInputs;
