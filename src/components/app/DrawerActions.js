import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthService from "../../service/AuthService";
import logo from "../../images/logo.png";
import proxelera from "../../images/proxelera.png"
import startscreen from "../../images/startscreen.jpg"
import { makeStyles } from '@mui/styles';
const { util } = require("../../commons");
const { CssBaseline, Divider,Drawer,List,ListItem,ListItemIcon,ListItemText,Avatar, Typography } = 
    require("@mui/material")
const { userMenu} = require("../../schema/app/dashBoardMenu")
const { appColors } = require("../../constants/colors")

const drawerWidth = 180;
const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        backgroundImage: `url(${startscreen})`,
        opacity:0.9
        //background: "#000000",
       // opacity: 0.85
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

function ResponsiveDrawer(props) {
    const classes = useStyles();
    let [menuIndex, setMenuIndex] = React.useState( localStorage.getItem("menuIndex") ? localStorage.getItem("menuIndex") : 0 );
    let menuList = userMenu
   

    const drawer = (
        <div>
            <div
                className={classes.toolbar}
                style={{
                    display: "flex",
                    margin: 2,
                    padding:5,
                    height:'100px',
                    display:"flex",
justifyContent:"center",
overflow:"hidden"
                   // background: "white",
                }}
            >
                <img src={proxelera} />
            </div>

            <div
                className={classes.toolbar}
                style={{
                    display: "flex",
                    margin: 2,
                    alignItems: "center",
                    //background: "#CACFD2",
                    borderRadius: 2
                }}
            >
                <Avatar style={{ margin: 2, flex: 1,background:'grey',color:'white',opacity:0.5 }}>
                    {/* {util.titleCase(AuthService.getUserInfo().name.charAt(0))} */}
                </Avatar>{" "}
                <div style={{ flex: 3 }}>
                    <Typography
                        variant="h6"
                        style={{
                            textAlign: "left",
                            fontSize: 16,
                            marginLeft: 5,
                            fontWeight: "bold",
                            color:"white"
                        }}
                    >
                        {/* {util.titleCase(AuthService.getUserInfo().name)} */}
                    </Typography>
                    <Typography
                        variant="h6"
                        style={{
                            textAlign: "left",
                            fontSize: 14,
                            marginLeft: 5,
                            color: "white"

                        }}
                    >
                        {AuthService.getUserRole()}
                    </Typography>
                </div>
            </div>
            <Divider style={{ border: "1px solid grey" }} />
            <List>
                {menuList.map((item, index) => {
                    return (
                        <ListItem
                            onClick={e => {
                                setMenuIndex(index);
                                localStorage.setItem("menuIndex", index);
                            }}
                            key={item.key}
                            component={Link}
                            to={"/" + item.key}
                            style={{
                                background:
                                    menuIndex == index
                                        ? appColors.selectedMenu
                                        : false,
                                padding: 5,
                                margin: 5
                            }}
                        >
                            <ListItemIcon
                                style={{
                                    color:
                                        menuIndex == index
                                            ? appColors.selectedMenuText
                                            : appColors.menu,
                                    minWidth: "35px"
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                style={{
                                    textAlign: "left",

                                    color:
                                        menuIndex == index
                                            ? appColors.selectedMenuText
                                            : appColors.menu
                                }}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );

    return (
        <div>
            <CssBaseline />
            <Drawer
                classes={{
                    paper: classes.drawerPaper
                }}
                //style={{background:'grey'}}
                variant="permanent"
                open
            >
                {drawer}
            </Drawer>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    container: PropTypes.instanceOf(
        typeof Element === "undefined" ? Object : Element
    )
};

export default ResponsiveDrawer;
