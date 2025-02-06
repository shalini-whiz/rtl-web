import React from 'react';
import { Typography, Box, Paper, Avatar } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { ColorCode } from '../../styles/colors';
const Disclaimer = () => {
  return (
    <Paper elevation={1} sx={{
      p: 2, marginTop: 10,
      background: ColorCode.warningTemplate, display: 'flex', flexDirection: 'row'
    }}>
      <Avatar style={{ background: ColorCode.warning }}>
        <WarningIcon style={{ color: 'white' }} />
      </Avatar>
      <Typography variant="subtitle1" color={ColorCode.hint} style={{marginLeft:1}}>
        Your data is not stored. Any file uploaded here will be processed temporarily and automatically deleted after completion.
      </Typography>
    </Paper>
  );
};

export default Disclaimer;