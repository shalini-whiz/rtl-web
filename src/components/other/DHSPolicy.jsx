import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CircleIcon from '@mui/icons-material/Circle';
import { makeStyles } from '@mui/styles';
import proxelera from "../../images/proxelera.png"
const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  header: {
    color: '#005cb9'
  },
  icon: {
    fontSize: '10px', // Adjust the size as needed
  },
});

const DHSPolicy = () => {
  const classes = useStyles();
  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <img src={proxelera} width={'100px'} style={{ alignContent: 'center' }} />
      </Box>

      <Typography variant="h4" gutterBottom className={classes.header}>
        Data Handling & Storage Policy for CAD Application
      </Typography>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <Typography variant="h5" className={classes.header}>
          1. Purpose
        </Typography>


        <Typography variant="body1" >
          This policy ensures that all data uploaded to the CAD Application (cad.proxelera.com) is handled
          securely and is not stored on our servers, aligning with our commitment to data privacy and compliance.
        </Typography>
      </div>
      <br />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <Typography variant="h5" className={classes.header}>
          2. Scope
        </Typography>
        <Typography variant="body1" >
          This policy applies to all users accessing the CAD Application, including clients, employees, and
          authorized third parties.
        </Typography>
      </div>
      <br />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <Typography variant="h5" className={classes.header}>
          3. Data Storage & Retention
        </Typography>
        <Typography variant="body1" >

          <List className={classes.list} dense={true}>
            <ListItem>
              <ListItemIcon ><CircleIcon sx={{ fontSize: 10 }} /></ListItemIcon>
              <ListItemText primary="The application processes files provided by the user but does not store any uploaded data.">The application</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon ><CircleIcon sx={{ fontSize: 10 }} /></ListItemIcon>
              <ListItemText primary="All uploaded files are held temporarily in system memory and are automatically deleted after
            processing."></ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon ><CircleIcon sx={{ fontSize: 10 }} /></ListItemIcon>
              <ListItemText primary="No files, processed data, or user inputs are retained on our servers after the session ends."></ListItemText>
            </ListItem>
          </List>
        </Typography>

      </div >
      <br />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <Typography variant="h5" className={classes.header}>
          4. Security Measures
        </Typography>
        <Typography variant="body1">
          <List className={classes.list} dense={true}>
            <ListItem>
              <ListItemIcon ><CircleIcon sx={{ fontSize: 10 }} /></ListItemIcon>
              <ListItemText primary="Data transmission is secured using industry-standard encryption protocols" />
            </ListItem>
            <ListItem>
              <ListItemIcon ><CircleIcon sx={{ fontSize: 10 }} /></ListItemIcon>
              <ListItemText primary="Temporary data used for processing is automatically purged once the operation is complete" />
            </ListItem>
            <ListItem>
              <ListItemIcon ><CircleIcon sx={{ fontSize: 10 }} /></ListItemIcon>
              <ListItemText primary="No backups, logs, or persistent storage mechanisms retain user-uploaded files" />
            </ListItem>
          </List>
        </Typography>
      </div>
      <br />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <Typography variant="h5" className={classes.header}>
          5. User Acknowledgment
        </Typography>
        <Typography variant="body1" style={{ textAlign: 'start' }}>
          By using the CAD Application, users acknowledge and agree that:
          <List className={classes.list} dense={true}>
            <ListItem>
              <ListItemIcon ><CircleIcon sx={{ fontSize: 10 }} /></ListItemIcon>
              <ListItemText primary="No uploaded files are retained after processing." />
            </ListItem>
            <ListItem>
              <ListItemIcon ><CircleIcon sx={{ fontSize: 10 }} /></ListItemIcon>
              <ListItemText primary="The system is designed for temporary use only, with no permanent storage of user data." />
            </ListItem>
            <ListItem>
              <ListItemIcon ><CircleIcon sx={{ fontSize: 10 }} /></ListItemIcon>
              <ListItemText primary="Users are responsible for saving any necessary output files locally before leaving the session." />
            </ListItem>
          </List>
        </Typography>
      </div>
    </Paper >
  );
};

export default DHSPolicy;