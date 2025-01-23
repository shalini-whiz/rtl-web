import React from "react";
import PropTypes from "prop-types";
import AuthService from "../../service/AuthService";
const { Card, CardHeader, CardContent, CardActions, Button, LinearProgress, Divider } = require("@mui/material")
const { FormGenerator } = require("../../lib")
const { commons, util } = require("../../commons")
const { profile } = require("../../schema/formSchema/profile")
const { validateFormData, formToObj } = require("../../lib/validator");
const { SnackBarWidget } = require("../../Widget");
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: [],
            status: false,
            message: "",
            apiService: false,
            validUser: {},
            timeout: 0

        };
    }

    componentDidMount() {
        this.setState({ formData: profile }, function () {
            this.getProfile();
        }
        );
    }


    getProfile = async () => {
        let role = AuthService.getUserRole()

    };

    handleChange = e => {
        let formDataInput = [...this.state.formData];
        if (e.target.name === "mobile" && e.target.value.length) this.checkValidUser(e.target.value);
        else {
            formDataInput.find(item => {
                if (item.key === e.target.name) {
                    item.value = item.type === "number" ? (item.decimal ? parseFloat(e.target.value) : parseInt(e.target.value)) : e.target.value;
                }
            });
        }
        this.setState({ formData: formDataInput });
    };

    resetForm = async () => {

    };

    saveProfile = async () => {
        let formData = [...this.state.formData];
        this.setState({ status: true, message: "" });
        let validFormData = await validateFormData(formData);
        this.setState({ formData: validFormData });

        let result = validFormData.find(item => {
            if (item.error.length) return item;
        });


    };

    render() {
        const { status, message, formData, apiService } = this.state;
        let sortResult = util.sortArr(formData, "order");
        let chunk_size = 2;
        let groups = util.chunkArray(chunk_size, sortResult);

        return (
            <div>
                {apiService ? <LinearProgress /> : false}
                {commons.detectInternet()}
                <Card style={{ margin: "10px" }}>
                    <CardHeader title={"Profile"} color="primary" />
                    <Divider variant="fullWidth" />
                    <CardContent>
                        <FormGenerator
                            groups={groups}
                            groupBy={1}
                            editMode={this.props.edit != undefined ? this.props.edit : true}
                            onChange={this.handleChange}
                        />
                        <br />
                    </CardContent>
                    {this.props.edit === false ? (<div></div>) : (
                        <CardActions style={{ justifyContent: "flex-end" }}>
                            <Button variant="contained" color="primary" size="small"
                                onClick={e => this.resetForm(e)}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" size="small"
                                onClick={e => this.saveProfile(e)}>
                                Submit
                            </Button>
                        </CardActions>
                    )}
                </Card>

                <SnackBarWidget message={message} status={status} />
            </div>
        );
    }
}

Profile.propTypes = {
    id: PropTypes.string,
    cancelDialog: PropTypes.func,
    reloadPage: PropTypes.func,
    action: PropTypes.string,
    closeDialog: PropTypes.func
};
export default Profile;
