import React from 'react';
import AuthService from "../../service/AuthService"
import AccountActions from "./AccountActions";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ResponsiveDrawer from "./DrawerActions"
import proxelera from "../../images/proxelera.png";
import { makeStyles } from '@mui/styles';
import { SERVER_URL, WEB_URL } from '../../constants/urlConstants';
const { AppBar, Toolbar, Typography, Grid2 } = require("@mui/material")
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        //marginRight: theme.spacing(2),

    },
    title: {
        flexGrow: 1
    },
    appBarTitle: {
        //f1b10e
        flexGrow: 1,
        backgroundColor: "#f2f2f200",
        backgroundImage: "linear-gradient(230deg, #f2f2f200 75%, #f1b10e 35%)",
        // backgroundImage: "linear-gradient(230deg, white 75 %, grey 35%)",
        textAlign: "left",
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
        padding: 5,

    }
}));

export default function TopAppBar(props) {
    const classes = useStyles();
    let [menuIndex, setMenuIndex] = React.useState(0)
    // let userId = AuthService.getUserId();

    const handleImageClick = (e) => {
        window.location.href = WEB_URL;
    };
    return (
        <div className={classes.root} style={{}}>
            <AppBar
                position="static"
                style={{
                    background: "#6082B6"
                    // opacity: 0.85
                }}
            >
                <Toolbar>
                    {/* <Grid2 container spacing="2" display="flex"
                    

                        direction="row"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Grid2 size={{ md: 3 }}>
                            <Typography>Reg-Magic</Typography>
                        </Grid2>
                        <Grid2 size={{ md: 6 }}></Grid2>
                        <Grid2 size={{ md: 3 }}>
                            <NotificationsIcon color="primary" />
                            <AccountActions /></Grid2>

                    </Grid2> */}
                    <Grid2 container spacing={2} direction="row" size={{ md: 12 }}>
                        <Grid2 size={{ md: 3 }}>
                            <div
                                style={{
                                    display: "flex",
                                    margin: 2,
                                    padding: 5,
                                    height: '50px',
                                    display: "flex",
                                    justifyContent: "left",
                                    overflow: "hidden"
                                }}
                            >
                                <img src={proxelera} onClick={(e) => handleImageClick(e)} />
                            </div>
                        </Grid2>
                        <Grid2 size={{ md: 6 }}>
                            <div style={{ padding: '20px', font: '20xp', color: 'white', fontWeight: 'bold' }}>Reg-Magic</div>
                        </Grid2>
                        <Grid2 size={{ md: 3 }} direction="row" display={"flex"} sx={{
                            justifyContent: "center",
                            alignItems: "flex-end",
                        }}>
                            {/* <NotificationsIcon color="primary" /> */}
                            <AccountActions />
                        </Grid2>
                    </Grid2>
                </Toolbar>
            </AppBar>
        </div>
    );
}
