import { red, green } from "@mui/material/colors"

const drawerWidth = 20;


const appStyles = (theme) => ({
    appBarTitle: {
        backgroundColor: 'grey',
        backgroundImage: "-webkit-linear-gradient(230deg, white 75 %, grey 35%)"
    },

    pageTitle: {
        textAlign: 'left',
        background: "#CACFD2",
        padding: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    suspendCheckBox: {
        color: red[400],
        '&$checked': {
            color: red[600],
        },
    },
    suspendRoot: {
        '& label.Mui-focused': {
            color: 'red',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'red',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'red',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'red',
            },
        },
    },
    enableCheckBox: {
        color: '#005cb9',
        '&$checked': {
            color: '#005cb9',
        },
    },
    enableRoot: {
        '& label.Mui-focused': {
            color: '#005cb9',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#005cb9',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#005cb9',
            },
            '&:hover fieldset': {
                borderColor: '#005cb9',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#005cb9',
            },
        },
    },
    tabs: {
        // borderRight: `1px solid ${theme.palette.divider}`,
    },
    root: {
        display: 'flex',
    },
    drawer: {
        // [theme.breakpoints.up('sm')]: {
        //     width: drawerWidth,
        //     flexShrink: 0,
        // },
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: "100%"
        },
        zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
        //marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        // width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        backgroundColor: "white",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        //height: "100vh"

    },

    subContent: {
        margin: theme.spacing(1)
    },

    paperContent: {
        padding: theme.spacing(3, 2),

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: '#ff0000',
    },
    inactive: {
        // backgroundColor:"#ff8989",
        // textColor:'red',
        color: 'red'
    },
    errorBtn: {
        backgroundColor: 'red',
        color: 'white'
    },
    successBtn: {
        backgroundColor: 'red',
        color: 'white'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    error: {
        color: 'red'
    },
    success: {
        color: 'green'
    },
    sideBar: {
        marginTop: 64
    },
    list: {
        backgroundColor: '#202020',

    },
    divider: {
        backgroundColor: '#ffffff'
    },
    listItem: {
        color: '#ffffff',
        "&:hover": {
            opacity: 0.5
        }

    },
    links: {
        textDecoration: "none"
    },
    menuHeader: {
        paddingLeft: "15px",
        color: '#000000'
    },
    formTitle: {
        color: "#ffffff",
        backgroundColor: red[400],
    },
    successSnackView: {
        backgroundColor: green[600],
        // color:"#ffffff"
    },
    failureSnackView: {
        backgroundColor: red[600],
        // color:"#ffffff"
    },
    landingCardHeader: {
        backgroundColor: "#008ccc",
        color: "white",
        textColor: "#white",

        //textColor:"white",
        // color: "#ffffff"
    },
    barPrimary: {
        backgroundColor: '#E9E9E9'
    },
    bar: {
        borderRadius: 5,
        backgroundColor: green
    }


});


export default appStyles;