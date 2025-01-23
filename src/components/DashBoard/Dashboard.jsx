import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Paper,
  TextField,
  Typography,
  Tabs, Tab,
  Container,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Grid2 from '@mui/material/Grid2';
import proxelera from '../../images/proxelera.png';
import TopAppBar from '../app/TopAppBar';
import CustomTab from '../widgets/CustomTab';
import ImageUpload from '../user/ImageUpload';
import FileActions from '../File/FileActions';
import RegMap from '../File/RegMap';
import Project from './Project';



const tabMenu = [
  { "label": "RTL", "value": 0, "content": "RTL Content", bgColor: "#c39bd3" },
  { "label": "RAL", "value": 1, "content": "RAL Content", bgColor: "#7dcea0" },
  { "label": "RTL-Top", "value": 2, "content": "RTL-Top Content", bgColor: "#aed6f1" }
]

function DashBoard() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, []);




  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Grid2 container spacing={2} sx={{
      justifyContent: "center",
      alignItems: "center",

    }} >

      <TopAppBar />
      <Box sx={{ width: '100%',  display: 'flex', borderBottom: 1, borderColor: 'divider' }} flexDirection={"row"}>
        <Project/>
        <Box sx={{ width: '100%', justifyContent: 'end', display: 'flex', borderBottom: 1, borderColor: 'divider' }} flexDirection={"end"}>
          <Tabs
            value={value}
            onChange={handleChange}
          >
            {tabMenu.map((item, index) => {
              return <CustomTab
                item={item}
                changeValue={handleChange}
                label={item.label}
                index={index}
              ></CustomTab>
            })}
          </Tabs>
        </Box>
      </Box>
     


      <Grid2 size={{ md: 12, }} direction={"row"} display={"flex"}

      >
        <Grid2 size={{ md: 8 }}
          sx={{
            padding: 1,
            //background: '#89CFF0'
          }}>
          <RegMap />
        </Grid2>
        <Grid2 size={{ md: 4 }} sx={{ padding: 1 }}>
          {value === 0 ? <FileActions type={"RTL"} /> : false}
          {/* {value === 1 ? <UploadFile type={"RAL"} /> : false}
          {value === 2 ? <UploadFile type={"RTL-TOP"} /> : false} */}

        </Grid2>
      </Grid2>
    </Grid2 >
  );
}

export default DashBoard;
