import React, { useEffect } from "react";
import TopAppBar from "../app/TopAppBar";
import AuthService from "../../service/AuthService";
import InfoBar from "../app/InfoBar";
import { defaultRole } from "../../constants/urlConstants";
import CustomTabs from "../../Widget/CustomTabs";
const { commons, util } = require("../../commons");
const { Tabs, Tab, Grid, ButtonGroup, Button, Card, CardHeader, CardContent, Typography,Grid2 } = require("@mui/material");

let tabList = [
    // { title: "Default", key: "default", value: 0 },
    // { title: "Daily", key: "day", value: 1 },
    // { title: "Monthly", key: "month", value: 2 },
    // { title: "Yearly", key: "year", value: 3 }

]

let TopB = ({ setContext, preRole }) => {
    let check = AuthService.getUserInfo();
    let authVal = {
        isAuthenticated: check && check._id ? check._id : "",
        loggedOut: false,
        role: check && check.role ? check.role : defaultRole,
        token: AuthService.getToken(),
        vendorId: AuthService.getProdVendor(),
        page: preRole && preRole.page ? preRole.page : ""
    };
    const [auth, setAuth] = React.useState(authVal);
    return (<div></div>
        // <AuthContext.Provider value={{ auth, setAuth }}>
        //     <InfoBar {...authVal} setRole={() => setContext(auth)} />
        // </AuthContext.Provider>
    );
};
export default class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        let check = AuthService.getUserInfo();
        let pageDet = this.props.location && this.props.location.role;
        this.state = {
            tabValue: 0,
            vendorStatus: false,
            accountStatus: false,
            status: false,
            message: "",
            apiService: false,
            showDialog: false,
            context: {
                ...pageDet,
                role: (pageDet && pageDet.role) || defaultRole,
                isAuthenticated: check && check._id ? check._id : "",
                loggedOut: false,
                token: AuthService.getToken(),
                vendorId: AuthService.getProdVendor(),
                page: (pageDet && pageDet.page) || ""
            },
            vendorRating: undefined,
            likeRatings: undefined,
            dislikeRatings: undefined
        };
        this.reloadPage = this.reloadPage.bind(this);
    }

    componentDidMount() {
        this.reloadPage();
    }

    closeDialog = () => {
        this.setState({ showDialog: false });
    };

    createVendor = () => {
        this.setState({ showDialog: true });
    };

    reloadPage = () => {
        let userInfo = AuthService.getVendorInfo();
        this.setState({ vendorStatus: userInfo });

        if (userInfo && userInfo.bankDetails && userInfo.bankDetails.length) {
            let bankExists = userInfo.bankDetails.find(item => item.status === "active");
            this.setState({ accountStatus: (bankExists && bankExists.bankStatus && bankExists.bankStatus !== "active") });
        }
        if (userInfo) this.getRating()
    };

    validateAccount = async () => {
        this.setState({ apiService: true });
        let params = {
            op: "validateBankAccount",
            id: AuthService.getVendorInfo()._id
        };
        let apiRes = await commons.getAPIRes(params, "POST", "validateBankAccount");

        this.setState({ apiService: false });

        if (!apiRes.errCode) {
            localStorage.setItem(
                "vendorInfo",
                JSON.stringify({ ...AuthService.getVendorInfo(), ...apiRes })
            );

            let bankExists = AuthService.getVendorInfo().bankDetails.find(item => item.status === "active");
            this.setState({ accountStatus: (bankExists && bankExists.bankStatus && bankExists.bankStatus !== "active") })

            let status =
                (bankExists && bankExists.bankStatus && bankExists.bankStatus === "active") ? true : false;
            let message = status
                ? "Bank Account validated"
                : "Could not validate bank account, please try again";

            this.setState({
                apiService: false,
                status: status,
                message: message
            });

            setTimeout(
                function () {
                    if (this.state.status) {
                        localStorage.setItem(
                            "vendorInfo",
                            JSON.stringify(apiRes)
                        );
                        this.setState({ status: false });

                        //this.resetForm();
                    }
                }.bind(this),
                1000
            );
        }
    };

    getRating = async () => {
        if (AuthService.getVendorInfo()) {
            let params = {
                op: "getVendorWithRatings",
                vendorId: AuthService.getVendorInfo()._id
            };
            let apiRes = await commons.getAPIRes(params, "POST", "getVendorRating");
            if (!apiRes.errCode && apiRes.length && apiRes[0]) {
                this.setState({ vendorRating: apiRes[0] })
                let likeRatings = apiRes[0].ratings.find(item => item.rating === 2);
                let dislikeRatings = apiRes[0].ratings.find(item => item.rating === 1)
                this.setState({ likeRatings: likeRatings, dislikeRatings: dislikeRatings })
            }

        }
    }

    setContext = auth => {
        if (this.state.context.role !== auth.role) {
            this.setState({ context: auth });
        }
    };

    tabHandleChange = (e, item) => {
        this.setState({
            tabValue: item.value,
        });
    };

    render() {
        let {
            apiService,
            message,
            status,
            vendorStatus,
            accountStatus,
            showDialog, tabValue,
            vendorRating,
            likeRatings, dislikeRatings
        } = this.state;
        let token = AuthService.getToken();
        let userExists = AuthService.getUserInfo();
        return (
            <div>
                <main>
                    <div>
                        <TopAppBar title="Dashboard" />
                        <div style={{ width: "100%" }}>
                            <Grid2 container spacing={3}>
                                <Grid2 item md={12}>
                                    <InfoBar />
                                </Grid2>
                            </Grid2>
                            {/* <TopB
                                setContext={this.setContext}
                                // preRole={this.props.location.role}
                            /> */}

                            {userExists ?
                                <Grid
                                    container
                                    spacing={3}
                                    style={{ marginLeft: 170 }}
                                >



                                </Grid> : <div></div>}
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
