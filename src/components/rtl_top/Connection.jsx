import React from "react";
import PropTypes from "prop-types";

import { customStyles } from "../../styles/tableStyle";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Disclaimer from "../other/Disclaimer";
import PolicyReminder from "../other/PolicyReminder";
const { Card, CardContent, CardActions, Button, LinearProgress,
  Typography, Box, FormControl, List, ListItem, ListItemIcon, ListItemText } = require("@mui/material")

const { commons, util } = require("../../commons")
const { SnackBarWidget, DialogWidget } = require("../../Widget");


class Connection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      message: "",
      apiService: false,
      selectedFile: false,
      uploadErr: "",
      inputKey: 0,
      showDialog: false,
      action: ""
    };
  }

  componentDidMount() {
  }



  resetForm = async () => {
    this.setState({ selectedFile: false, uploadErr: "", inputKey: 0 })
  };

  closeDialog = () => {
    console.log("close dialog call invoked")
    this.setState({ showDialog: false });
  };

  openDialog = () => {
    let { showDialog } = this.state;
    this.setState({ showDialog: true });
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
    else this.setState({ selectedFile: uploadedFile, uploadErr: "", inputKey: 1 })
    console.log("uploadErrr" + this.state.uploadErr)

  }

  validateFile = (e, action) => {
    console.log("Call invoked")
    let { selectedFile } = this.state;
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel', 'application/xml', 'text/xml'];
    this.setState({ uploadErr: "", projectError: false, showDialog: false })
    let projectId = localStorage.getItem("projectId")
    if (projectId == '') {
      this.setState({ projectError: true })
      return;
    }
    if (!selectedFile) {
      this.setState({ uploadErr: 'Please select file.' });
      return;
    }


    if (selectedFile && !validTypes.includes(selectedFile.type)) {
      this.setState({ uploadErr: 'Please select valid file.' });
      return;
    }
    this.setState({ action: action })
    this.openDialog();
  }

  invokeConnectionCheck = () => {
    let { selectedFile, action } = this.state;
    let projectId = localStorage.getItem("projectId")
    this.setState({ apiService: true })
    let data = new FormData();
    data.append('projectId', projectId);
    data.append('file', selectedFile);
    data.append('type', this.props.type.toLowerCase())
    let op = action == "check" ? 'checkConnection' : 'uploadConnection'
    data.append('op', op)

    try {
      commons.getAPIRes(data, "POSTFORMDATA", "rtltop").then(res => {
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
    } catch (error) {
      console.error('There was an error downloading the zip file!', error);
    }
  }
  checkFile = async (e, action) => {
    let { selectedFile } = this.state;
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel', 'application/xml', 'text/xml'];
    this.setState({ uploadErr: "", projectError: false, showDialog: false })
    let projectId = localStorage.getItem("projectId")
    if (projectId == '') {
      this.setState({ projectError: true })
      return;
    }
    if (!selectedFile) {
      this.setState({ uploadErr: 'Please select file.' });
      return;
    }


    if (selectedFile && !validTypes.includes(selectedFile.type)) {
      this.setState({ uploadErr: 'Please select valid file.' });
      return;
    }
    this.setState({ action: action })
  };

  downloadfile = () => {
    alert("file downloaded")
  }


  render() {
    const { status, message, apiService, uploadErr, selectedFile, showDialog, action } = this.state;

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
            <FormControl fullWidth style={{ marginBottom: 10 }}>
              <input
                multiple
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
              style={customStyles.successBtn}
              size="small" onClick={e => this.validateFile(e, "check")}
            >
              Check
            </Button>
            <Button variant="contained" color="primary"
              style={customStyles.successBtn}
              size="small" onClick={e => this.validateFile(e, "upload")}
            >
              Download
            </Button>
          </CardActions>
          <br />
          <Disclaimer style={{ marginTop: 10 }} />
        </Card>

        {showDialog ? (

          <DialogWidget
            maxWidth={"sm"}
            dialogTitle={"Reminder"}
            dialogContent={
              <PolicyReminder

              />
            }
            okDialog={this.invokeConnectionCheck}
            closeDialog={this.closeDialog}
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

Connection.propTypes = {
  id: PropTypes.string,
  cancelDialog: PropTypes.func,
  reloadPage: PropTypes.func,
  action: PropTypes.string
};
export default Connection;
