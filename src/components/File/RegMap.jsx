import React, { useEffect, useState } from 'react';
import { Grid2, Box, Button, Paper } from '@mui/material';
import Module from './Module';
import '../../styles/customStyle.css';
import { registerMapData } from "../../schema/app/registerMap"


const RegMap = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);
  const [module, setModule] = useState(null)

  useEffect(() => {
    findChildren();
    return () => console.log("Cleanup..");
  }, []);

  const findChildren = () => {
    if (!loading) {
      let firstChild = []
      registerMapData.map(item => {
        console.log("item here " + JSON.stringify(item));
        firstChild.push({
          "id": item.id, "label": item.label,
          "module": item.module, instanceName: item.instanceName,
          baseAddress: item.baseAddress, children: item.children
        })
      })
      setChildren(firstChild);
      setLoading(true)
    }


  }

  const handleModuleChange = (event, nodeId) => {
    let x = children.find(item => item.id === nodeId.id);
    setModule(null)
    setModule(x)
  }

  return (
    <Box sx={{
      alignContent: 'center',
      height: 450
    }}>

      <Grid2 container spacing={2} direction={"row"} sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        //minWidth: 300,
        minHeight: 550
      }}>
        <Grid2 size={{ md: 1 }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid grey',
            }}
          >
            <Box sx={{ flex: 1, alignItems: 'center' }}>AHB</Box>
          </Box>
        </Grid2>
        <Grid2 size={{ md: 4, }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              // alignItems: 'stretch',
              flexDirection: 'column',
              border: '1px solid grey',

            }}
          >
            {children.map(item => {
              let style = { margin: 2, border: '1px solid grey', padding: 5 }
              if (module && module.id === item.id)
                style.background = "#6082B6"
              return (<Button className={"button-with-main-line"} value={item.label} style={style}
                onClick={(e) => handleModuleChange(e, item)}>{item.label}</Button>)
            })}

          </Box>
        </Grid2>
        <Grid2 size={{ md: 7 }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              // alignItems: 'stretch',
              flexDirection: 'column',
              // border: '1px solid grey',

            }}>
            <Paper elevation={3}>
              {module && (<Module item={module}></Module>)}
            </Paper>
          </Box>
        </Grid2>

      </Grid2>
    </Box >
  );
};

export default RegMap;
