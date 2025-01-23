import React from "react";
import PropTypes from "prop-types";
import AuthService from "../../service/AuthService";
const { Card, CardHeader, CardContent, CardActions, Button, LinearProgress, Divider, Typography } = require("@mui/material")
const { commons, util } = require("../../commons")
const { SnackBarWidget } = require("../../Widget");

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      message: "",
      apiService: false,
      selectedImage: null,
      uploadErr: ""
    };
  }

  componentDidMount() {
  }






  resetForm = async () => {
    this.props.cancelDialog()
  };

  uploadFile = async (e) => {
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    console.log(e.target.files[0]);
    let uploadedFile = e.target.files[0];
    if (!uploadedFile) {
      this.setState({ uploadErr: 'Please select image.' });
    }
    else if (uploadedFile && validTypes.includes(uploadedFile.type)) {
      this.setState({ uploadErr: 'Please select valid file.' });
    }
    else this.setState({ selectedImage: uploadedFile })

  }
  saveProfile = async () => {
    let { selectedImage } = this.state;
    this.setState({ uploadErr: "" })
    if (!selectedImage) {
      this.setState({ uploadErr: 'Please select file.' });
      return;
    }

    if (selectedImage && !selectedImage.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      this.setState({ uploadErr: 'Please select valid file.' });
      return;
    }

    let data = new FormData();
    data.append('op', "uploadFile");
    data.append('file', selectedImage);
    for (var pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1] + " , " + typeof pair[1]);
    }
    let apiRes = await commons.getAPIRes(data, "POSTFORMDATA", "uploadFile");
    console.log("upload file apiRes here " + JSON.stringify(apiRes))
    if (apiRes.status) {


    }

  };

  render() {
    const { status, message, apiService, selectedImage, uploadErr } = this.state;

    return (
      <div>
        {apiService ? <LinearProgress /> : false}
        {commons.detectInternet()}
        <Card style={{ margin: "10px" }}>
          <CardHeader
            title="Upload"
          />
          <Divider variant="fullWidth" />
          <CardContent>
            {selectedImage && (
              <div>
                <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                <br />
                <button onClick={() => this.setState({ selectedImage: null })}>Remove</button>
              </div>
            )}
            <br />

            <br />
            <input
              type="file"
              name="myImage"
              onChange={(e) => this.uploadFile(e)}
            />
            <br />
            {uploadErr.length ? <Typography color="error" variant="subtitle">

              {uploadErr}
            </Typography> : false}
          </CardContent>

          <CardActions style={{ justifyContent: "flex-end" }} >
            <Button variant="contained" color="primary"
              size="small" onClick={e => this.resetForm(e)} >
              Cancel
            </Button>
            <Button variant="contained" color="primary"
              size="small" onClick={e => this.saveProfile(e)}
            >
              Submit
            </Button>
          </CardActions>
        </Card>

        <SnackBarWidget message={message} status={status} />
      </div>
    );
  }
}

ImageUpload.propTypes = {
  id: PropTypes.string,
  cancelDialog: PropTypes.func,
  reloadPage: PropTypes.func,
  action: PropTypes.string
};
export default ImageUpload;
