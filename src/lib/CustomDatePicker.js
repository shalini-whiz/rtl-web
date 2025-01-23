import React from 'react';
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateFnsUtils from "@date-io/date-fns";
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export default function CustomDatePicker(props) {

    return (
        <LocalizationProvider utils={DateFnsUtils} dateAdapter={AdapterDateFns}>
            {props.inputData.dateTime === "date" ?
                <DatePicker
                    variant="inline"
                    fullWidth
                    format={props.inputData.format || "dd/MM/yyyy"}
                    key={props.index}
                    label={props.inputData.displayName}
                    name={props.inputData.key}
                    value={props.inputData.value}
                    onChange={e => props.onDateChange(e, props.inputData)}
                    required={props.inputData.required}
                    style={props.styleObj}
                    disabled={!props.editMode || props.inputData.disabled}
                    ampm={true}
                    disablePast
                    helperText={props.inputData.error}
                    error={props.inputData.error.length}
                    InputLabelProps={{
                        shrink: true
                    }}

                // helperText={
                //     props.inputData.helperText
                //         ? props.inputData.helperText
                //         : props.inputData.error
                // }
                ></DatePicker> : props.inputData.dateTime === "time" ?
                    <TimePicker
                        variant="inline"
                        fullWidth
                        format={props.inputData.format || "HH:mm"}
                        key={props.index}
                        clearable={true}
                        label={props.inputData.displayName}
                        name={props.inputData.key}
                        value={props.inputData.value ? props.inputData.value : " "}
                        onChange={e => props.onDateChange(e, props.inputData)}
                        required={props.inputData.required}
                        style={props.styleObj}
                        disabled={!props.editMode || props.inputData.disabled}
                        ampm={true}
                        helperText={props.inputData.error}
                        error={props.inputData.error.length}
                        InputLabelProps={{
                            shrink: true
                        }}
                        clearLabel={"clear"}

                    // helperText={
                    //     props.inputData.helperText
                    //         ? props.inputData.helperText
                    //         : props.inputData.error
                    // }
                    ></TimePicker> :
                    <DateTimePicker
                        variant="inline"
                        fullWidth
                        format={props.inputData.format || "dd/MM/yyyy HH:mm"}
                        key={props.index}
                        label={props.inputData.displayName}
                        name={props.inputData.key}
                        value={props.inputData.value}
                        onChange={e => props.onDateChange(e, props.inputData)}
                        required={props.inputData.required}
                        style={props.styleObj}
                        disabled={!props.editMode || props.inputData.disabled}
                        ampm={true}
                        disablePast
                        helperText={props.inputData.error}
                        error={props.inputData.error.length}
                        InputLabelProps={{
                            shrink: true
                        }}

                    // helperText={
                    //     props.inputData.helperText
                    //         ? props.inputData.helperText
                    //         : props.inputData.error
                    // }
                    ></DateTimePicker>}
        </LocalizationProvider>
    );
}
