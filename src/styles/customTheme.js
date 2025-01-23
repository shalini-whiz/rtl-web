
import React from 'react'
import { createTheme } from '@mui/material/styles';
import { red, green, grey } from "@mui/material/colors"

const drawerWidth = 180;


const darkTheme = {
    cardHeader: 'white',
    "stepConnectorActive": "#005cb9",
    "stepConnectorCompleted": "#005cb9",
    "stepLine": "#005cb9"


}

const lightTheme = {
    cardHeader: 'white',
    "stepConnectorActive": "#005cb9",
    "stepConnectorCompleted": "#005cb9",
    "stepLine": "#005cb9"


}

const theme = (themeStatus) => {
    const themeSettings = (themeStatus == "light") ? lightTheme : darkTheme;
    console.log(123)
    const appTheme = createTheme({
        // components: {
        //     MuiButtonBase: {
        //         styleOverrides: {
        //             root: { background: 'green', },
        //         },
        //     },
        // },
        components: {
            // Name of the component
            MuiButtonBase: {
                root: { background: 'green' },
                defaultProps: {
                    // The props to change the default for.
                    disableRipple: true, // No more ripple, on the whole application 💣!
                    background:'green'
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        minHeight: '48px', // Default height for all tabs 
                        '&.Mui-selected': { minHeight: '64px'},
                    },
                }
            },
        },
        palette: {
            type: "light",

            primary: {
                main: "#005cb9"
                // main: "#D3D3D3"
                //  opacity: 0.85
            },
            secondary: {
                light: "#0066ff",
                main: "#0044ff",
                // dark: will be calculated from palette.secondary.main,
                contrastText: "#ffcc00"
            }
        },
        typography: {
            //fontFamily: 'Comic Sans',
            fontFamily: ["Arial", "sans-serif"].join(","),
            subtitle1: {
                fontSize: 14
            },
            body1: {
                fontWeight: 500
            }
        },
        notchedOutline: {
            borderColor: "#FFFFFF",
            borderWidth: 1,
            "&:hover": {
                borderColor: "#FFFFFF",
                borderWidth: 2
            }
        },
        // MuiButton: {
        //     root: {
        //         backgroundColor: "#005cb9"
        //     }
        // },
    });
    return appTheme;

}

export default theme;