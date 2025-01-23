import React from 'react';
import { Tab } from "@mui/material"

function a11yProps(index) {
  return { id: `tab-${index}`, 'aria-controls': `tabpanel-${index}`, };
}
const CustomTab = (props) => {
  console.log(props.item.bgColor)
  const buttonStyle = {
    backgroundColor: props.item.bgColor, // Custom background color 
    color: 'black',
    font:'20sp',
    margin:2
  };

  return (
    <Tab style={buttonStyle}
      sx={{
        borderTopLeftRadius: '16px', borderTopRightRadius: '16px',
        '& .MuiTab-root': {
          minHeight: '48px', // Default height for all tabs
        },
        '& .Mui-selected': { minHeight: '74px', margin: -2 }
      }}
      onChange={(e) => props.changeValue(e, props.index)}
      label={props.item.label}
      {...a11yProps(props.item.value)}
    ></Tab >

  );
};

export default CustomTab;