import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../service/AuthService";
import { AccountCircle, Logout } from "@mui/icons-material"

import CheckIcon from "@mui/icons-material/Check";

import Profile from "../user/Profile";
import { DialogWidget } from "../../Widget"
import { vendorRole, buyerRole } from "../../constants/urlConstants";
import ImageUpload from "../user/ImageUpload";
import { Box, Button, IconButton, Menu, MenuItem, Typography } from "@mui/material"

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));



export default function AccountActions() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [dialogStatus, setDialogStatus] = React.useState(false);
    const [dialogType, setDialogType] = React.useState('');

    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setDialogStatus(false)

    };
    const handleDialogClose = () => {
        setDialogStatus(false)
        setDialogType("")
        setAnchorEl(null);

    }

    const handleDialog = (e, key) => {
        setDialogStatus(true)
        setDialogType(key)
    };

    const logOutUser = () => {
        localStorage.setItem("login", false);
        localStorage.clear();
        setDialogStatus(false)
        window.location.href = '/login';

    }

    let userExists = AuthService.getUserInfo();
    const menuId = "account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

            <MenuItem onClick={e => alert(e)}>Profile</MenuItem>
            <MenuItem onClick={e => logOutUser(e)}>Logout</MenuItem>
        </Menu>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
            <Box sx={{ alignSelf: 'center' }} flexDirection={'row'} display={'flex'}>
                <Typography sx={{ paddingRight: 5, color: 'white' }}>{AuthService.getUserInfo().name}</Typography>
                <AccountCircle sx={{ paddingRight: 5, color: 'white' }} />
                <Logout sx={{ paddingRight: 5, color: 'white' }} onClick={e => handleDialog(e, "logout")} />


            </Box>
            {dialogStatus && dialogType === "logout" ?
                <DialogWidget
                    maxWidth="xs"
                    dialogTitle={"Confirm Logout"}
                    okTitle={"Logout"}
                    negOk={true}
                    cancelTitle={"Continue Session"}
                    dialogContent={"Are you sure you want to logout from RegMagic ?"}
                    okDialog={logOutUser}
                    closeDialog={handleDialogClose}
                /> : false}

        </div>
    );
}
