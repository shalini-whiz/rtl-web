import React, { useEffect, useState } from 'react';
import {
  Grid2, Box, Typography, TextField, Button, Card, CardContent, CardHeader,
  TableContainer, Table, TableHead, TableRow, TableCell, Paper, Avatar,
  TableBody
} from '@mui/material';
import '../../styles/customStyle.css';



const Module = (props) => {
  console.log("module props item : " + JSON.stringify(props.item))
  const [selectedItem, setSelectedItem] = useState(null);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(null)

  useEffect(() => {
    setSelectedItem(props.item)
    return () => console.log("Cleanup..");
  }, [props.item]);


  const handleModuleChange = (event, nodeId) => {
    setChildren(nodeId.children);
    setRegister(nodeId)
    setChildren(nodeId.children)
  }

  return (
    <Box sx={{ border: '1px solid' }}>
      <Card elevation={3} variant="outlined">
        <CardHeader
          avatar={
            <Avatar sx={{
              // bgcolor: red[500]
            }} aria-label="module">
              M
            </Avatar>
          }
          title={selectedItem ? selectedItem.label : ""}
          subheader={selectedItem ? selectedItem.instanceName : ""}
        >
        </CardHeader>
        <CardContent>

        </CardContent>

      </Card>
      <Grid2 container size={{ md: 12 }} display='flex' direction={"row"}>
        <Grid2 size={{ md: 3 }} alignContent={"start"}>
          <Card sx={{ height: '60vh', overflow: 'auto' }}>

            {selectedItem && selectedItem.children && selectedItem.children.map(item => {
              let style = { margin: 2, border: '1px solid grey', }
              if (register && register.id === item.id)
                style.background = "#6082B6"
              return (<Button className={"button-with-line"} value={item.label} style={style} onClick={(e) => handleModuleChange(e, item)}>{item.label}</Button>)
            })}
          </Card>
        </Grid2>
        <Grid2 size={{ md: 9 }}>
          {children ? <TableContainer component={Paper}>
            <Table sx={{}}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Bit-Pos</TableCell>
                  <TableCell>Desc</TableCell>
                  <TableCell>DefaultValue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {children.map((row) => {
                  return (<TableRow key={row}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.fieldType}</TableCell>
                    <TableCell>{row.bitPosition}</TableCell>
                    <TableCell>{row.desc}</TableCell>
                    <TableCell>{row.defaultValue}</TableCell>

                  </TableRow>)
                })}
              </TableBody>
            </Table>

          </TableContainer> : false}
        </Grid2>
      </Grid2>

    </Box >
  );
};

export default Module;
