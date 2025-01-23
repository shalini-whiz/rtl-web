import React, { useEffect } from "react";
import { vendorRole, buyerRole } from "../../constants/urlConstants";
import AuthService from "../../service/AuthService";
import Profile from "../user/Profile";
const { commons } = require("../../commons");
const { SnackBarWidget, DialogWidget } = require("../../Widget");
const { LinearProgress, Link, Typography, Grid, Button } = require("@mui/material");

export default function InfoBar({ setRole }) {
    //this.reloadPage = this.reloadPage.bind(this);
    const [accountStatus, setAccountStatus] = React.useState(false);
    const [vendorStatus, setVendorStatus] = React.useState(false);
    const [status, setStatus] = React.useState(false);
    const [showDialog, setShowDialog] = React.useState(false);
    const [apiService, setApiService] = React.useState(false);
    const [message, setMessage] = React.useState("");


    

    useEffect(() => {
        reloadPage()
    }, []);

    const closeDialog = () => {
        setShowDialog(false)
    };

    const createVendor = () => {
        setShowDialog(true)
    };

    const reloadPage = () => {
        let userInfo = AuthService.getVendorInfo();

        setVendorStatus(userInfo)
        if (userInfo && userInfo.bankDetails && userInfo.bankDetails.length) {
            let bankExists = userInfo.bankDetails.find(item => item.status === "active");
            setAccountStatus(bankExists && bankExists.bankStatus && bankExists.bankStatus !== "active");
        }
    };

    const validateAccount = async () => {
        setApiService(true);
        let params = {
            op: "validateBankAccount",
            id: AuthService.getVendorInfo()._id
        };
        let apiRes = await commons.getAPIRes(params, "POST", "validateBankAccount");

        setApiService(false)

        if (!apiRes.errCode) {
            localStorage.setItem("vendorInfo", JSON.stringify({ ...AuthService.getVendorInfo(), ...apiRes }));

            let bankExists = AuthService.getVendorInfo().bankDetails.find(item => item.status === "active");
            setAccountStatus(bankExists && bankExists.bankStatus && bankExists.bankStatus !== "active");

            let status = (bankExists && bankExists.bankStatus && bankExists.bankStatus === "active") ? true : false;
            let message = status
                ? "Bank Account validated"
                : "Could not validate bank account, please try again";

            setStatus(status);
            setMessage(message);


            setTimeout(
                function () {
                    if (status) {
                        localStorage.setItem(
                            "vendorInfo",
                            JSON.stringify(apiRes)
                        );
                        setStatus(false)
                    }
                }.bind(this),
                1000
            );
        }
    };

    return (
        <div style={{ marginLeft: 170 }}>
            <main>
                {apiService ? <LinearProgress /> : false}
                {commons.detectInternet()}

                <div style={{ textAlign: "left" }}>

                    <Grid container item xs={12} spacing={3} justify="flex-start">
                        <Grid item xs={4}>
                            {AuthService.getToken() && !vendorStatus && AuthService.getUserRole() === "user"
                                ? (<Typography  style={{color:"#0044ff"}}>
                                    Register as vendor {""}
                                    <Link href="#" onClick={createVendor}>
                                        click here
                                </Link>
                                </Typography>) : (
                                    false
                                )}
                        </Grid>
                        <Grid item xs={4}>

                        </Grid>
                        <Grid item xs={4} justify="flex-end" container>
                           
                        </Grid>
                    </Grid>


                   

                    <SnackBarWidget message={message} status={status} />

                    {showDialog ? (
                        <DialogWidget
                            dialogContent={
                                <Profile
                                    reloadPage={reloadPage}
                                    cancelDialog={closeDialog}
                                />
                            }
                            closeDialog={closeDialog}
                        />
                    ) : (
                        false
                    )}
                </div>
            </main>
        </div>
    );

}
