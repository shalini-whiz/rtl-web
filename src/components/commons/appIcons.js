import CancelIcon from '@mui/icons-material/Cancel'; 
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from '@mui/icons-material/Edit'; 
import MoneyIcon from "@mui/icons-material/Money";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";

import VisibilityIcon from '@mui/icons-material/Visibility';
import MotorcycleIcon from "@mui/icons-material/Motorcycle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EcoIcon from "@mui/icons-material/Eco";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import { green, red, grey, blue, orange } from "@mui/material/colors"

export const appIcons = {
    "editIcon": <EditIcon style={{ color: blue[800] }} />,
    "checkIcon": <CheckIcon style={{ color: green[800] }} />,
    "cancelIcon": <CancelIcon style={{ color: red[800] }} />,
    "moneyIcon": <MoneyIcon style={{ color: green[500] }} />,
    "addIcon": <AddCircleIcon style={{ color: blue[800] }} />,
    "saveIcon": <SaveIcon style={{ color: green[800] }} />,
    "addDisabled": <AddCircleIcon style={{ color:  grey[800]  }} />,
    "viewIcon": <VisibilityIcon style={{ color: blue[800]  }} />,
    "deliverIcon": <MotorcycleIcon style={{ color:  green[800]  }} />,
    "acceptIcon": <CheckCircleIcon style={{ color:  green[800]  }} />,
    "vegan": <EcoIcon style={{ color: green[800] }} />,
    "jain": <EcoIcon style={{ color: green[800] }} />,
    "veg": <FiberManualRecordRoundedIcon style={{ color: green[800] }} />,
    "nonveg": <FiberManualRecordRoundedIcon style={{ color: red[800] }} />,
    "egg": <FiberManualRecordRoundedIcon style={{ color: orange[800] }} />,
}

export const iconWTitle =  (type,title) => {
    console.log(type+" ... "+title);
    if (type === "veg")
        return <span style={{ fontSize1: 14 }}>
            <FiberManualRecordRoundedIcon style={{ color: green[800], fontSize: '1rem' }} >
        </FiberManualRecordRoundedIcon> {title} </span>
    if (type === "nonveg")
        return <span style={{ fontSize1: 14 }}>
            <FiberManualRecordRoundedIcon style={{ color: red[800], fontSize: '1rem' }} >
            </FiberManualRecordRoundedIcon> {title} </span>
    if (type === "egg")
        return <span style={{ fontSize1: 14 }}>
            <FiberManualRecordRoundedIcon style={{ color: orange[800], fontSize: '1rem' }} >
            </FiberManualRecordRoundedIcon> {title} </span>
    if (type === "vegan" || type === "jain")
        return (
            <span style={{ fontSize1: 14 }}>
                <EcoIcon style={{ color: green[800], fontSize: "1rem" }} ></EcoIcon>{" "}
                {title}{" "}
            </span>
        );
    return title;
}