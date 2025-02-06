import React from "react";
import PropTypes from "prop-types";
import AuthService from "../../service/AuthService";
import appStyles from "../../styles/appStyles";
import { customStyles } from "../../styles/tableStyle";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { UploadFileOutlined } from "@mui/icons-material";
import Disclaimer from "../other/Disclaimer";
import PolicyReminder from "../other/PolicyReminder";
const { Card, CardHeader, CardContent, CardActions, Button, LinearProgress, Divider,
  Typography, Box, RadioGroup, Radio, FormControlLabel, FormControl, InputLabel, Select, MenuItem,
  ToggleButtonGroup, ToggleButton,
  Icon } = require("@mui/material")

const { commons, util } = require("../../commons")
const { SnackBarWidget, DialogWidget } = require("../../Widget");


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
      inputKey: 0,
      showDialog: false
    };
  }

  componentDidMount() {
  }



  resetForm = async () => {
    this.setState({ selectedImage: null, uploadErr: "", inputKey: 0 })
  };

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
    else this.setState({ selectedImage: uploadedFile, uploadErr: "", inputKey: 1 })
    console.log("uploadErrr" + this.state.uploadErr)

  }
  handleProject = (e) => {
    console.log("projectId : " + e.target.value)
    console.log(e.target.value.toString())
    this.setState({ projectId: e.target.value.toString() })
  }

  closeDialog = () => {
    console.log("close dialog call invoked")
    this.setState({ showDialog: false });
  };

  openDialog = () => {
    let { showDialog } = this.state;
    console.log("showDialog : " + showDialog)
    this.setState({ showDialog: true });
  };
  validateFile = () => {
    console.log("Call invoked")
    let { selectedImage } = this.state;
    console.log("local projectId" + localStorage.getItem("projectId"))
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel', 'application/xml', 'text/xml'];
    this.setState({ uploadErr: "", projectError: false, showDialog: false })
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
    this.openDialog();
  }
  saveProfile = async () => {
    let { selectedImage } = this.state;
    console.log("local projectId" + localStorage.getItem("projectId"))
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel', 'application/xml', 'text/xml'];
    this.setState({ uploadErr: "", projectError: false, showDialog: false })
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
    try {
      commons.getAPIRes(data, "POSTFORMDATA", "fileOp").then(res => {
        this.setState({ apiService: false })
        if (res.status) {
          console.log(res.result)
          const zipContent = atob(res.result);
          const zipBlob = new Blob([Uint8Array.from(zipContent, c => c.charCodeAt(0))], { type: 'application/zip' });
          const url = window.URL.createObjectURL(zipBlob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'files.zip');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

      });
      // const response = await fetch('http://localhost:5000/fileOp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: data
      // });

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // const responseData = await response.json();

      // if (responseData.status) {
      //   const zipContent = atob(responseData.result);
      //   const zipBlob = new Blob([Uint8Array.from(zipContent, c => c.charCodeAt(0))], { type: 'application/zip' });
      //   const url = window.URL.createObjectURL(zipBlob);
      //   const link = document.createElement('a');
      //   link.href = url;
      //   link.setAttribute('download', 'files.zip');
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);
      // }
    } catch (error) {
      console.error('There was an error downloading the zip file!', error);
    }



  };

  render() {
    const { status, message, apiService, selectedImage, uploadErr, selectedRadio,
      projectId, handleProject, toggleAction, projects, projectError, showDialog, openDialog, closeDialog } = this.state;

    return (
      <Box sx={{ alignContent: 'center' }}>
        {commons.detectInternet()}
        <Card style={{ margin: "10px" }} variant="outlined" sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          minHeight: 450,
          alignContent: 'center',
        }}>

          <CardContent style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
          }}>
            {apiService ? <LinearProgress /> : false}
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

          <CardActions style={{ justifyContent: "center" }} >

            <Button variant="contained" color="primary"
              style={customStyles.successBtn}
              size="small"
              onClick={e => this.validateFile(e)}
            //onClick={e => this.saveProfile(e)}
            >
              Upload
            </Button>
          </CardActions>

          <Disclaimer style={{ justifyContent: 'bottom' }} />
        </Card>
        {showDialog ? (
          <DialogWidget
            maxWidth={"sm"}
            dialogTitle={"Reminder"}
            dialogContent={
              <PolicyReminder

              />
            }
            okDialog={this.saveProfile}
            closeDialog={this.closeDialog}
            negCancel={true}
            okTitle={"Continue"}

          />
        ) : (
          false
        )}

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
