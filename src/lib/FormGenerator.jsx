import React from 'react'
import {  MenuItem } from "@mui/material"
import Grid from '@mui/material/Grid2';

import PropTypes from 'prop-types';
import CustomTextInput from "./CustomTextInput";
import CustomCheckBox from "./CustomCheckBox";
import CustomDatePicker from "./CustomDatePicker"
import CustomSelect from "./CustomSelect"
import { util } from "../commons";

class FormGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formList: []
        }
    }

    componentDidMount() {
        if (this.props.formList) this.setState({ formList: this.props.formList })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.formList !== this.props.formList) {
            if (this.props.formList) this.setState({ formList: this.props.formList })
        }
    }

    showDropDown = (nestedItem) => {

        if (nestedItem.config) {
            const dropDownOptions = nestedItem.options.map((option, index) => {
                return (<MenuItem key={index} value={option[nestedItem.config.value]}
                    selected={(nestedItem.value === option[nestedItem.config.value])}>
                    {option[nestedItem.config.key]}
                </MenuItem>)
            })
            return dropDownOptions
        }
        else {
            const dropDownOptions = nestedItem.options.map((option, index) => {
                return (<MenuItem key={index} value={option.value} selected={(nestedItem.value === option.value)}>
                    {option.key}
                </MenuItem>)
            })
            return dropDownOptions
        }

    }



    render() {

        const { onChange, editMode, groups, chunkSize, formData, onDateChange, onSelectChange, handleMultiSelectChange } = this.props;
        const { formList } = this.state;
        let formGroups = groups;
        if (formData) {
            let sortResult = util.sortArr(formData, "order");
            formGroups = util.chunkArray(chunkSize, sortResult);
        }




        let content = ""
        if (this.props.groupBy) {
            let md = 12;
            let xs = 12;
            if (this.props.groupBy === 3) md = 4
            if (this.props.groupBy === 2) md = 6
            if (this.props.groupBy === 4) md = 3;


            content = formGroups.map((groupItem, groupIndex) => {
                return (
                    <Grid
                        container
                        spacing={1}
                        alignItems="flex-end"
                        key={groupIndex}
                    >
                        {groupItem.map((item, index) => {
                            const styleObj = {};
                            if (item.hidden) styleObj["display"] = "none";
                            if (item.showOnEdit && editMode === false)
                                styleObj["display"] = "none";
                            let mdSpan = item.colspan ? md * item.colspan : md
                            console.log(mdSpan)
                            return (
                                <Grid item xs={xs} md={mdSpan} key={index} style={{}}>
                                    {item.type === "checkbox" ? (
                                        <CustomCheckBox
                                            inputData={item}
                                            onChange={onChange}
                                            index={index}
                                            styleObj={styleObj}
                                            editMode={editMode}
                                        />
                                    ) : item.type === "datetime-local" ? (
                                        <CustomDatePicker
                                            inputData={item}
                                            index={index}
                                            styleObj={styleObj}
                                            editMode={editMode}
                                            onDateChange={onDateChange}
                                        />
                                    ) : item.type === "multiple-select" ? (
                                        <CustomSelect
                                            inputData={item}
                                            onChange={onChange}
                                            index={index}
                                            styleObj={styleObj}
                                            editMode={editMode}
                                            onSelectChange={onSelectChange}
                                            onMultiSelectChange={
                                                handleMultiSelectChange
                                            }
                                        />
                                    ) : (
                                        <CustomTextInput
                                            inputData={item}
                                            onChange={onChange}
                                            index={index}
                                            styleObj={styleObj}
                                            editMode={editMode}
                                        />
                                    )}
                                </Grid>
                            );
                        })}
                    </Grid>
                );
            });
        }
        else {

            content = formList.map((item, index) => {
                const styleObj = {};
                if (item.hidden) styleObj["display"] = "none";
                return (item.type === "checkbox" ? <CustomCheckBox
                    inputData={item}
                    onChange={onChange}
                    index={index}
                    styleObj={styleObj}
                    editMode={editMode}
                /> : (item.type === "datetime-local" ?
                    <CustomDatePicker
                        inputData={item}
                        onChange={onChange}
                        index={index}
                        styleObj={styleObj}
                        editMode={editMode}
                    />
                    :
                    <CustomTextInput
                        inputData={item}
                        onChange={editMode === false ? () => { } : onChange}
                        index={index}
                        styleObj={styleObj}
                        editMode={editMode}
                    />
                )

                )
            })
        }



        return content
    }

}

FormGenerator.propTypes = {
    classes: PropTypes.object,
    formList: PropTypes.array,
    groups: PropTypes.array,
    onChange: PropTypes.func,
    editMode: PropTypes.bool,
    groupBy: PropTypes.number,
    presetValues: PropTypes.object

};


export default FormGenerator;
