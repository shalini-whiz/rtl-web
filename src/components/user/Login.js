import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    CardContent,
    CardHeader,
    CssBaseline,
    Grid,
    IconButton,
    InputAdornment,
    LinearProgress,
    Paper,
    TextField,
    Typography, Card
} from '@mui/material';
import {
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigate,

} from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

import Grid2 from '@mui/material/Grid2';
import proxelera from '../../images/proxelera.png';
import { commons } from '../../commons';
import { formToObj, validateFormData } from '../../lib/validator';
import AuthService from '../../service/AuthService';
import background from "../../images/background.jpg"
import background1 from "../../images/background1.jpg"

let loginSchema = [
    {
        key: 'email',
        value: '',
        error: '',
        required: true,
        type: 'text',
        label: 'Email',
    },
    {
        key: 'password',
        value: '',
        error: '',
        required: true,
        type: 'password',
        label: 'Password',
    },
];

function Login(props) {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState([]);
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        AuthService.getUserInfo() != null ?
            navigate("/dashboard") :
            loadForm();
    }, []);

    const loadForm = async () => {
        let loginSchemaData = [...loginSchema];
        setLoginData(loginSchemaData);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        let loginContent = [...loginData];
        let validFormData = await validateFormData(loginContent);

        let params = await formToObj(validFormData);
        params.op = "login"
        console.log("params " + JSON.stringify(params))
        commons.getAPIRes(params, "POST", "login").then(userRes => {
            console.log("userRes here " + JSON.stringify(userRes))
            if (userRes.status) {
                localStorage.setItem("userInfo", JSON.stringify(userRes.result));
                localStorage.setItem("token", userRes.result.token);
                localStorage.setItem("login", true);

                AuthService.setUserInfo(userRes.result)

                navigate('/dashboard');
            }
            else {
                alert("Invalid credentials")

            }
        });
    };

    const renderDashBoard = () => {
        props.history.push('/ticket-list')
    };

    const handleChange = (e, key) => {
        const newValue = e.target.value;
        setLoginData((prevData) =>
            prevData.map((item) =>
                item.key === key
                    ? { ...item, value: newValue, error: '' }
                    : item
            )
        );
    };

    return (
        <Grid2 container spacing={2} sx={{
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
        }} >
            <CssBaseline />
            <Grid2 size={{ md: 6 }} />
            <Grid2 size={{ md: 3 }} >
                <Paper elevation={30}>
                    <Box sx={{ padding: 4 }}>
                        <Box
                            component="img"
                            sx={{
                                height: 233,
                                width: 350,
                                maxHeight: { xs: 233, md: 167 },
                                maxWidth: { xs: 350, md: 250 },
                            }}
                            alt="The house from the offer."
                            src={proxelera}
                        />
                        {/* <CardHeader>RegMagic</CardHeader> */}
                        {loginData.map((item, index) => {
                            return (
                                <TextField
                                    sx={{ m: 1, p: 1 }}
                                    key={index}
                                    type={item.type == "password" ? (showPwd ? "text" : item.type) : item.type}
                                    label={item.label}
                                    fullWidth
                                    required
                                    value={item.value}
                                    onChange={(e) => handleChange(e, item.key)}
                                    error={!!item.error}
                                    helperText={item.error}
                                    slotProps={{
                                        endAdornment: item.type == "password" && (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPwd(!showPwd)} >
                                                    {showPwd ? (<Visibility />) : (<VisibilityOff />)}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            );
                        })}
                        <Button
                            type="Submit"
                            color="secondary"
                            variant="contained"
                            fullWidth
                            onClick={handleLogin}
                            disabled={loading}
                            style={{ width: 'fit-content', backgroundColor: '#00308F', color: 'white' }}
                        >
                            Login
                        </Button>
                        <Typography style={{ color: "#6CB4EE" }}>Forgot password ?</Typography>

                    </Box>
                </Paper>
            </Grid2>
            <Grid2 size={{ md: 3 }} />

        </Grid2 >
    );
}

export default Login;
