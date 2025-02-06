import React from "react";
import PropTypes from "prop-types";
import AuthService from "../../service/AuthService";
import appStyles from "../../styles/appStyles";
import { customStyles } from "../../styles/tableStyle";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { UploadFileOutlined } from "@mui/icons-material";
import Connection from "./Connection";
import Config from "./Config";
import Disclaimer from "../other/Disclaimer";
const { Card, CardHeader, CardContent, CardActions, Button, LinearProgress, Divider,
  Typography, Box, RadioGroup, Radio, FormControlLabel, FormControl, InputLabel, Select, MenuItem,
  ToggleButtonGroup, ToggleButton, IconButton, Tooltip,
  Icon,
  Paper } = require("@mui/material")

const { commons, util } = require("../../commons")
const { SnackBarWidget } = require("../../Widget");


class RTLActions extends React.Component {
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
      toggleAction: 'configFile',
      projects: [],
      projectError: false
    };
  }

  componentDidMount() {

  }

  handleToggle = (e) => {

    this.setState({ toggleAction: e.target.value })
  }

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
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <ToggleButtonGroup
              color="primary"
              value={toggleAction}
              exclusive
              onChange={(e) => this.handleToggle(e)}
              style={{ display: 'flex', padding: 10, marginBottom: 10, justifyContent: 'flex-end' }}
            >
              <ToggleButton value="configFile" style={{}}><CloudUploadIcon style={{ padding: 10 }}></CloudUploadIcon>&nbsp;Subsystem Config </ToggleButton>
              <ToggleButton value="connectionFile" style={{}}><CloudUploadIcon style={{ padding: 10 }}></CloudUploadIcon>&nbsp;Subsystem Connections</ToggleButton>
            </ToggleButtonGroup>
          </div>

          {toggleAction === "configFile" ? <Config type={this.props.type} /> : <Connection type={this.props.type} />}
        </Paper>
      </Box>
    );
  }
}

RTLActions.propTypes = {
  id: PropTypes.string,
  cancelDialog: PropTypes.func,
  reloadPage: PropTypes.func,
  action: PropTypes.string
};
export default RTLActions;