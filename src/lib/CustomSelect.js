import React from "react";
const { Input, InputLabel, MenuItem, FormControl, Select, Chip, FormHelperText } = require("@mui/material");


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


export default function CustomSelect(props) {
    let showDropDown = nestedItem => {
        if (nestedItem.config) {
            const dropDownOptions = nestedItem.options.map((option, index) => {
                return (
                    <MenuItem
                        key={option.value}
                        value={option[nestedItem.config.value]}
                        name={option[nestedItem.config.key]}
                        selected={
                            nestedItem.value === option[nestedItem.config.value]
                        }
                    >
                        {option[nestedItem.config.key]}
                    </MenuItem>
                );
            });
            return dropDownOptions;
        } else {
            const dropDownOptions = nestedItem.options.map((option, index) => {
                return (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                        name={option.value}
                        selected={option.value.indexOf(nestedItem.value) > 1 ? true : false}
                    >
                        {option.key}
                    </MenuItem>
                );
            });
            return dropDownOptions;
        }
    };

    return (
        <FormControl fullWidth variant="outlined" margin="normal" error={props.inputData.error && props.inputData.error.length ? true : false}>
            <InputLabel id="demo-mutiple-chip-label">
                {props.inputData.displayName}
            </InputLabel>
            <Select
                fullWidth
                multiple
                value={props.inputData.value}
                onChange={props.onMultiSelectChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                    <div>
                        {props.inputData.names.map(item => {
                            return <Chip key={item} label={item} />;
                        })}
                    </div>
                )}
                MenuProps={MenuProps}
                name={props.inputData.key}
                disabled={
                    props.inputData.editMode === undefined ||
                        props.inputData.editMode === null
                        ? !props.editMode || props.inputData.disabled
                        : !props.inputData.editMode
                }
            >
                {props.inputData.options ? showDropDown(props.inputData) : ""}
            </Select>
            <FormHelperText>{props.inputData.error}</FormHelperText>
        </FormControl>
    );
}
