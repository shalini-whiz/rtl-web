import React from 'react';
const { FormControlLabel, Checkbox } = require("@mui/material");


export default function CustomCheckBox(props) {




    return (


        <FormControlLabel
            control={<Checkbox
                checked={props.inputData.value}
                onChange={props.onChange}
                name={props.inputData.key} />}
            label={props.inputData.displayName}
        />
    );
}
