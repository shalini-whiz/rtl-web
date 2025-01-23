import React from "react";
import PropTypes from "prop-types";
import AuthService from "../../service/AuthService";
import { vendorRole, buyerRole } from "../../constants/urlConstants";
const { Card, CardHeader, CardContent, CardActions, Button, LinearProgress, Divider, Container } = require("@mui/material");
const { FormGenerator } = require("../../lib");
const { commons, commonMsgs, util } = require("../../commons");
const { userSignup } = require("../../schema/formSchema/signup")
const { validateFormData, formToObj } = require("../../lib/validator");
const { SnackBarWidget } = require("../../Widget");

class Signup extends React.Component {
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
        let { role } = this.props.location

        let form = [...userSignup];
        this.setState({ formData: util.formatForm(form) })

    }

    checkValidUser = async userMobile => {
        let formDataInput = [...this.state.formData];
        var foundIndex = formDataInput.findIndex(item => item.key === "mobile");
        formDataInput[foundIndex].value = userMobile;

        if (userMobile && userMobile.length && userMobile.length === 10) {
            formDataInput[foundIndex].helperText = "";
            if (this.state.timeout) clearTimeout(this.state.timeout);

            this.state.timeout = setTimeout(async () => {
                let apiRes = await commons.getAPIRes({ mobile: userMobile }, "POST", "signup");
                if (apiRes.status === commonMsgs.SUC_MSG) {
                    formDataInput[foundIndex].showCorrectIcon = true;
                    formDataInput[foundIndex].helperText = apiRes.message;
                    formDataInput[foundIndex].error = "";
                    this.setState({ vaildUser: apiRes.data });
                } else {
                    formDataInput[foundIndex].showCorrectIcon = false;
                    formDataInput[foundIndex].error = "User already exists";
                    this.setState({ vaildUser: {} });
                }
                this.setState({ formData: formDataInput });
            }, 3000);
        }
    };

    handleChange = e => {
        let formDataInput = [...this.state.formData];
        if (e.target.name === "mobile" && e.target.value.length)
            this.checkValidUser(e.target.value);
        else {
            formDataInput.find(item => {
                if (item.key === e.target.name) {
                    item.value = item.type === "number" ? parseInt(e.target.value) : e.target.value;
                }
            });
        }
        this.setState({ formData: formDataInput });
    };

    renderDashBoard = () => {
        if (AuthService.getUserInfo() != null) {
            if (this.props.location.role) {
                this.props.history.push({
                    pathname: '/dashboard',
                    role: this.props.location.role,
                });
            } else {
                this.props.history.push('/dashboard');
            }
        }
    };

    resetForm = async () => {
        let { role } = this.props.location
        let form = [...userSignup];
        this.setState({ formData: util.formatForm(form) })


        this.props.history.push("/")
    };

    createVendor = async () => {
        let formData = [...this.state.formData];
        this.setState({ status: true, message: "" });

        let validFormData = await validateFormData(formData);
        this.setState({ formData: validFormData });

        let result = validFormData.find(item => {
            if (item.error.length) return item;
        });

        if (!result) {
            let { state, role } = this.props.location;
            let params = await formToObj(validFormData);
            params.type = "signup";
            this.setState({ apiService: true });
            if (state.role === vendorRole) {
                params.op = "createUserNVendor"
                let vendorRes = await commons.getAPIRes(params, "POST", "createUserNVendor");
                console.log("vendorRes here " + JSON.stringify(vendorRes))
                //otp message
                if (!vendorRes.status === commonMsgs.SUC_MSG) {
                    this.setState({ apiService: false, status: false, message: vendorRes.message });
                }
                console.log(vendorRes.user)
                console.log(vendorRes.token)
                console.log(vendorRes.vendor)

                if (vendorRes.user) {
                    localStorage.setItem("userInfo", JSON.stringify(vendorRes.user));
                    localStorage.setItem("token", vendorRes.token);
                }
                if (vendorRes.vendor) {
                    localStorage.setItem("vendorInfo", JSON.stringify(vendorRes.vendor));
                }
                console.log(localStorage.getItem("userInfo"))
                console.log(localStorage.getItem("token"))
                console.log(localStorage.getItem("token"))
                let status = !vendorRes.errCode ? true : false;
                let message = vendorRes.errCode ? "Registration failed :" + vendorRes.errCode : "Registered successfully";
                this.setState({ status: status, message: message, apiService: false });

            }


            // let otpRes = await commons.getAPIRes(params, "POST", "verifyOtp");
            // if (!otpRes.status === commonMsgs.SUC_MSG) {
            //     this.setState({ apiService: false, status: false, message: otpRes.message });
            // }

            // if (otpRes.status === commonMsgs.SUC_MSG) {
            //     localStorage.setItem("userInfo", JSON.stringify(otpRes.data.user));
            //     localStorage.setItem("token", otpRes.token);
            //     //create wallet here
            //     let walletParams = { op: "create", userid: AuthService.getUserId() }
            //     let walletRes = await commons.getAPIRes( walletParams, "POST", "createWallet" );
            // }

            //continue only if registering as vendor
            // if (otpRes.status === commonMsgs.SUC_MSG && state && state.role === vendorRole) {
            //     params.op = "profile";
            //     params.userId = AuthService.getUserId();
            //     let apiRes = await commons.getAPIRes( params, "POST", "register" );
            //     let status = !apiRes.errCode ? true : false;
            //     let message = apiRes.errCode ? "Registration failed :" + apiRes.errCode : "Registered successfully";
            //     this.setState({ status: status, message: message, apiService: false });
            //     if (apiRes.name)
            //         localStorage.setItem("vendorInfo", JSON.stringify(apiRes));
            //     else if (apiRes.errCode && apiRes.result)
            //         localStorage.setItem("vendorInfo", JSON.stringify(apiRes.result));
            // }
            setTimeout(
                function () {
                    if (this.state.status) {
                        this.setState({ status: false });
                    }
                    this.renderDashBoard();
                }.bind(this),
                1000
            );
        }
    };

    render() {
        const { status, message, formData, apiService } = this.state;
        let sortResult = util.sortArr(formData, "order");
        let chunk_size = 1;
        let groups = util.chunkArray(chunk_size, sortResult);

        return (
            <div>
                {apiService ? <LinearProgress /> : false}
                {commons.detectInternet()}
                <Container maxWidth="xs">
                    <Card style={{ margin: "10px" }}>
                        <CardHeader title="Registration" />
                        <Divider variant="fullWidth" />
                        <CardContent>
                            <FormGenerator
                                groups={groups}
                                groupBy={1}
                                editMode={true}
                                onChange={this.handleChange}
                            />
                            <br />
                        </CardContent>

                        <CardActions style={{ justifyContent: "flex-end" }}>
                            <Button variant="contained" color="primary" size="small"
                                onClick={e => this.resetForm(e)}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" size="small"
                                onClick={e => this.createVendor(e)}>
                                Submit
                            </Button>
                        </CardActions>
                    </Card>

                    <SnackBarWidget message={message} status={status} />
                </Container>
            </div>
        );
    }
}

Signup.propTypes = {
    id: PropTypes.string,
    cancelDialog: PropTypes.func,
    reloadPage: PropTypes.func,
    action: PropTypes.string
};
export default Signup;
