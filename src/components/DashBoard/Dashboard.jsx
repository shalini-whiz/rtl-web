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
  Container, Link,
  ButtonBase
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Grid2 from '@mui/material/Grid2';
import proxelera from '../../images/proxelera.png';
import TopAppBar from '../app/TopAppBar';
import CustomTab from '../widgets/CustomTab';
import FileActions from '../ral_rtl/FileActions';
// import RegMap from '../File/RegMap';
import RegMap from "../regMap/RegMap";
import Project from './Project';
import RTLActions from '../rtl_top/RTLActions';
import { DialogWidget } from '../../Widget';
import DHSPolicy from '../other/DHSPolicy';
import { customStyles } from '../../styles/tableStyle';
const tabMenu = [
  { "label": "RTL", "value": 0, "content": "RTL Content", bgColor: "#c39bd3" },
  { "label": "RAL", "value": 1, "content": "RAL Content", bgColor: "#7dcea0" },
  { "label": "RTL-Top", "value": 2, "content": "RTL-Top Content", bgColor: "#aed6f1" }
]

function DashBoard() {

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
  }, []);




  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const openDialog = () => {
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false)
  }

  return (
    <Grid2 container spacing={2} sx={{



    }} >

      <TopAppBar />

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: 2, margin: 5 }}>
        <Box sx={{ width: '100%', display: 'flex', borderBottom: 1, borderColor: 'divider' }} flexDirection={"row"}>
          <Project />

          <Box sx={{ width: '100%', justifyContent: 'end', display: 'flex', borderBottom: 1, borderColor: 'divider' }} flexDirection={"end"}>
            <ButtonBase onClick={(e) => openDialog(e)} style={{ marginRight: 10 }}>
              <Typography sx={customStyles.hyperlink} >DHS Policy</Typography>
            </ButtonBase>
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

        {dialogOpen ? <DialogWidget
          dialogContent={<DHSPolicy />}
          closeDialog={closeDialog}


        ></DialogWidget> : false}

        <Grid2 size={{ md: 12, }} direction={"row"} display={"flex"}

        >
          <Grid2 size={{ md: 8 }}
            sx={{
              padding: 1,
            }}>
            <img src={proxelera}
              style={{ opacity: 0.5 }}
            />
            {/* <RegMap /> */}
          </Grid2>

          <Grid2 size={{ md: 4 }} sx={{}}>
            {value === 0 ? <FileActions type={"RTL"} /> : false}
            {value === 1 ? <FileActions type={"RAL"} /> : false}
            {value === 2 ? <RTLActions type={"RTL-TOP"} /> : false}

          </Grid2>
        </Grid2>
      </div>
    </Grid2 >
  );
}

export default DashBoard;
