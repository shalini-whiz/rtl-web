import React from "react";
import PropTypes from "prop-types";
import { customStyles } from "../../styles/tableStyle";
const { Card, CardContent, CardActions, Button, LinearProgress, Box, List, ListItem, ListItemText, Link } = require("@mui/material")
const { commons, util } = require("../../commons")
const { SnackBarWidget } = require("../../Widget");


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

  }

  handleSwitchChange = (event) => {
    this.setState({ viewType: event.target.checked });

  };



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
    const { status, message, apiService, fileList } = this.state;

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
            <div style={{ display: 'flex', flexDirection: 'row' }} >
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
