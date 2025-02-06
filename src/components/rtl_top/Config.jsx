import React from "react";
import PropTypes from "prop-types";
import AuthService from "../../service/AuthService";
import appStyles from "../../styles/appStyles";
import { customStyles } from "../../styles/tableStyle";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { UploadFileOutlined } from "@mui/icons-material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Disclaimer from "../other/Disclaimer";
import PolicyReminder from "../other/PolicyReminder";

const { Card, CardHeader, CardContent, CardActions, Button, LinearProgress, Divider,
  Typography, Box, RadioGroup, Radio, FormControlLabel, FormControl, InputLabel, Select, MenuItem,
  ToggleButtonGroup, ToggleButton, ListItemIcon,
  Icon,
  ListItemText } = require("@mui/material")
const { commons, util } = require("../../commons")
const { SnackBarWidget, DialogWidget } = require("../../Widget");


let configTabs = [


]
class Config extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      message: "",
      apiService: false,
      configFile: false,
      selectedFiles: [],
      uploadErr: "",
      selectedRadio: "",
      configTabId: "",
      configTabs: [],
      configTabError: false,
      inputKey: 0,
      showDialog: false
    };
  }

  componentDidMount() {
  }

  generateTabs = () => {
    this.setState({ configTabs: configTabs })

  }
  validateFile = (e) => {
    let { configFile } = this.state;
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel', 'application/xml', 'text/xml'];
    let uploadedFile = e.target.files[0];
    this.setState({ uploadErr: "", projectError: false, showDialog: false, configFile: e.target.files[0] })
    let projectId = localStorage.getItem("projectId")
    if (projectId == '') {
      this.setState({ projectError: true })
      return;
    }
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
    else this.setState({ configFile: uploadedFile, uploadErr: "" })
  }

  closeDialog = () => {
    this.setState({ showDialog: false });
  };

  openDialog = () => {
    let { showDialog } = this.state;
    this.setState({ showDialog: true });
  };
  validateTabFile = (e) => {
    console.log("Call invoked")
    let { selectedFiles } = this.state;
    let combinedFiles = [...selectedFiles, ...e.target.files]
    let validFiles = []
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel', 'application/xml', 'text/xml'];
    this.setState({ uploadErr: "", projectError: false, showDialog: false })

    combinedFiles.forEach(currentFile => {
      if (!validTypes.includes(currentFile.type)) {
        return;
      }
      else
        validFiles.push(currentFile)
    }
    );

    this.setState({ selectedFiles: validFiles })
  }
  fetchTags = async () => {
    let { configFile, uploadErr } = this.state;
    if (!configFile) {
      alert("Please upload file")
      return;
    }
    if (uploadErr.length) {
      alert(uploadErr)
      return;
    }

    this.setState({ apiService: true })
    let data = new FormData();
    let projectId = localStorage.getItem("projectId")
    data.append('projectId', projectId);
    data.append('file', configFile);
    data.append('type', this.props.type.toLowerCase())
    data.append('op', 'getTag')

    try {
      commons.getAPIRes(data, "POSTFORMDATA", "rtltop").then(res => {
        console.log("res here " + JSON.stringify(res))
        this.setState({ apiService: false })
        if (res.status) {
          this.setState({ configTabs: res.result, configTabId: res.result[0] })
        }

      });

    } catch (error) {
      console.error('There was an error downloading the zip file!', error);
    }

  }
  resetForm = async () => {
    this.setState({ selectedFiles: [], uploadErr: "", inputKey: 0 })
  };


  handleConfigTab = (e) => {
    this.setState({ configTabId: e.target.value.toString() })
  }

  uploadConfig = () => {
    let { configFile, selectedFiles, configTabId } = this.state;
    if (!configFile || !selectedFiles.length || configTabId == "") return;
    this.openDialog();

  }
  downloadfile = () => {
    let { configFile, selectedFiles, configTabId } = this.state;
    let projectId = localStorage.getItem("projectId")

    this.setState({ apiService: true })
    let data = new FormData();

    data.append('op', 'uploadConfig')
    data.append('projectId', projectId);
    data.append('type', this.props.type.toLowerCase())
    data.append('tab', configTabId)
    // data.append('file', selectedFiles);
    data.append('configFile', configFile);
    for (let i = 0; i < selectedFiles.length; i++) {
      data.append('file', selectedFiles[i]);
    }
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




  render() {
    const { status, message, apiService, selectedFiles, uploadErr, selectedRadio,
      configTabId, handleConfigTab, configTabs, configTabError, generateTabs, showDialog } = this.state;

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

            <div style={{ display: 'flex' }}>
              <FormControl fullWidth style={{ marginBottom: 10, flex: 2 }}>
                <input
                  type="file"
                  onChange={(e) => this.validateFile(e)}
                //key={this.state.inputKey}
                />

              </FormControl>
              <Button style={{ justifyContent: 'end', flex: 1 }} onClick={(e) => this.fetchTags(e)}>Get Tabs</Button>
            </div>


            <br />

            {configTabs.length ? <FormControl fullWidth style={{ marginBottom: 10 }} error={configTabError}>
              <br />
              <InputLabel id="demo-simple-select-label">Tabs</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={configTabId}
                label="Tabs"
                onChange={(e) => this.handleConfigTab(e)}
              >
                {configTabs.map((item, index) =>
                  <MenuItem value={item.toString()} key={index}>{item.toString()}</MenuItem>
                )}

              </Select>
            </FormControl> : false}

            {configTabId.length ? <FormControl fullWidth style={{ marginBottom: 10, flex: 2 }}>
              <input
                type="file"
                onChange={(e) => this.validateTabFile(e)}
              //key={this.state.inputKey}
              />

            </FormControl> : false}

            <div>
              {selectedFiles.length > 0 && (
                <List>
                  {selectedFiles.map((file, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <UploadFileIcon />
                      </ListItemIcon>
                      <ListItemText>{file.name}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
            {uploadErr.length ? <Typography color="error" variant="subtitle">

              {uploadErr}
            </Typography> : false}
          </CardContent>

          <CardActions style={{ justifyContent: "flex-end" }} >


            <Button variant="contained" color="primary"
              style={customStyles.successBtn}
              size="small" onClick={e => this.uploadConfig(e)}
            >
              Upload
            </Button>
          </CardActions>
          <Disclaimer />

        </Card>
        {showDialog ? (
          <DialogWidget
            maxWidth={"sm"}
            dialogTitle={"Reminder"}
            dialogContent={
              <PolicyReminder

              />
            }
            okDialog={this.downloadfile}
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

Config.propTypes = {
  id: PropTypes.string,
  cancelDialog: PropTypes.func,
  reloadPage: PropTypes.func,
  action: PropTypes.string
};
export default Config;
