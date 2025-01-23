import React from "react";
import { util } from "../commons";
const { MenuItem, TextField } = require("@mui/material");

export default function CustomTextInput(props) {
    let showDropDown = nestedItem => {
        if (nestedItem.config && nestedItem.options && nestedItem.options.length) {
            const dropDownOptions = nestedItem.options.map((option, index) => {
                return (
                    <MenuItem
                        key={index}
                        value={option[nestedItem.config.value]}
                        selected={
                            nestedItem.value === option[nestedItem.config.value]
                        }
                    >
                        {util.titleCase(option[nestedItem.config.key])}
                    </MenuItem>
                );
            });
            return dropDownOptions;
        } else if (nestedItem.options && nestedItem.options.length) {
            const dropDownOptions = nestedItem.options.map((option, index) => {
                return (
                    <MenuItem
                        key={index}
                        value={option.value}
                        selected={nestedItem.value === option.value}
                    >
                        {option.key}
                    </MenuItem>
                );
            });
            return dropDownOptions;
        }
    };

    let formatValue = (inputData) => {
        let dateFormat = "YYYY-MM-DD";
        if (inputData.formatDate) dateFormat = "yyyy-MM-dd";
        let value = inputData.value;
        if (inputData.type === "date") {
            value = (inputData.formatDate ? util.toISODateFormat(inputData.value, dateFormat) : util.toDateFormat(inputData.value, dateFormat))
        }

        return value;
    }
    return (
        <TextField
            id="component-simple"
            fullWidth
            // margin="normal"
            // variant="outlined"
            margin="normal"
            variant="outlined"
            key={props.index}
            select={props.inputData.select}
            autoComplete="off"
            label={props.inputData.displayName}
            name={props.inputData.key}
            value={formatValue(props.inputData)}
            onChange={props.onChange}
            multiline={props.inputData.multiline}
            step={props.inputData.step}
            required={props.inputData.required}
            style={props.styleObj}
            rowsMax={props.inputData.rowsMax}
            rows={props.inputData.rows}
            hidden={props.inputData.hidden ? true : false}
            rows={props.inputData.rows}
            disabled={props.inputData.editMode === undefined || props.inputData.editMode === null ?
                (!props.editMode || props.inputData.disabled) : !props.inputData.editMode}
            type={props.inputData.type !== "select" ? props.inputData.type : ""}
            format="dd/MM/yyyy"
            error={
                props.inputData.error && props.inputData.error.length
                    ? true
                    : false
            }
            inputProps={props.inputData.inputProps}
            helperText={
                props.inputData.helperText
                    ? props.inputData.helperText
                    : props.inputData.error
            }
            InputLabelProps={{ shrink: true }}
        >
            {props.inputData.select && props.inputData.options
                ? showDropDown(props.inputData)
                : ""}
        </TextField>
    );
}
