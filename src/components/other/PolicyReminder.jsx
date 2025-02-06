import React from 'react';
import { Typography, Box, Paper, Avatar } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import proxelera from "../../images/proxelera.png"
import { ColorCode } from '../../styles/colors';

const PolicyReminder = () => {
  return (
    <Paper elevation={1} sx={{
      p: 2, alignItems: 'center', display: 'flex', flexDirection: 'column'
    }}>
      <Avatar style={{ background: ColorCode.warning, padding: 2, justifyContent: 'center' }}>
        <WarningIcon style={{ color: 'white' }} />
      </Avatar>
      <Typography variant="subtitle1" color={ColorCode.hint} style={{ marginLeft: 1 }}>
        This application does not store your uploaded data. Files are used only for processing and then permanently deleted.
      </Typography>
      
      <Typography variant="h6" color={ColorCode.hint} style={{ marginLeft: 1 }}>
      </Typography>

    </Paper>
  );
};

export default PolicyReminder;