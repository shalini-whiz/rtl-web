import React from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import { tableOptions } from "../../styles/tableStyle"
import EntityItem from "./EntityItem";
const { commons, util } = require("../../commons")
const { LinearProgress } = require("@mui/material");
const { appIcons } = require("../commons/appIcons")
const { SnackBarWidget,DialogWidget } = require("../../Widget");


class EntityTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData:[],
            entityData: [],
            status: false,
            message: "",
            apiService: false,
            showDialog: false,
            selectedProd: undefined,
            selectedOp: undefined,
            dialogTitle: "",
        };
        this.loadData = this.loadData.bind(this);

    }

    componentDidMount() {
        this.loadData();
           
    }

    loadData = async () => {
        console.log("op code on load data"+this.props.loadOp)
        this.setState({ status: false, message: "", entityData:[], });      
        this.setState({apiService:true})
        let params = { op: this.props.op ? this.props.op : this.props.loadOp };
        let apiRes = await commons.getAPIRes(params, "POST", this.props.loadOp);
        this.setState({ apiService: false})
        if (apiRes.status) this.setState({ entityData: apiRes.result });
    };

  
    handleDialog = (e, item, key) => {
        let dialogTitle = "";
        console.log(key)
        if (key === "enable") dialogTitle = "Enable " + util.titleCase(item[this.props.actionTitle]);
        if (key === "disable") dialogTitle = "Disable " + util.titleCase(item[this.props.actionTitle]);

        if (key === "freeze") dialogTitle = "Freeze " + util.titleCase(item[this.props.actionTitle]);
        if (key === "unfreeze") dialogTitle = "Unfreeze " +util.titleCase(item[this.props.actionTitle]);

        this.setState({ showDialog: true, selectedProd: item, selectedOp: key, dialogTitle: dialogTitle });
    };

    closeDialog = () => {
        this.setState({ showDialog: false, selectedProd: undefined, selectedOp: undefined, dialogTitle: "" });
    };

    dialogOkAction = async () => {
        let { selectedProd, selectedOp} = this.state;
        let res = await this.props.entityOkDialog(selectedProd,selectedOp);
        this.setState({ status: res.status, message: res.message, apiService: false });

        setTimeout(
            function () {
                if (this.state.status) {
                    this.closeDialog();
                    this.loadData()
                }
            }.bind(this),
            3000
        );
    }
    render() {
        let { entityData, showDialog, selectedOp, selectedProd, status, message, dialogTitle, filters, apiService} = this.state;
        let reportOptions = Object.assign({}, tableOptions);
        let { columns,okDialog,actionType,title} = this.props
        console.log(JSON.stringify(entityData))
        let actions = [
        rowData => (rowData.enabled && actionType.indexOf("edit") || rowData.frozen === false && actionType.indexOf("edit")) ? {
            icon: () => appIcons.editIcon,
            tooltip: "Edit " + util.titleCase(rowData.name),
            onClick: (event, rowData) => { this.handleDialog( event, rowData, "edit" ); }
        } : undefined,
        rowData => (rowData.enabled && rowData.frozen === undefined && actionType.indexOf("disable")) ? {
            icon: () => appIcons.cancelIcon,
            tooltip: "Disable " + util.titleCase(rowData.name),
            onClick: (event, rowData) => { this.handleDialog( event, rowData, "disable" ); }
        } : false,
        rowData => (!rowData.enabled && rowData.frozen === undefined && actionType.indexOf("enable"))  ? {
            icon: () => appIcons.checkIcon,
            tooltip: "Enable " + util.titleCase(rowData.name),
            onClick: (event, rowData) => { this.handleDialog( event, rowData, "enable" ); }
        }: false,

        rowData => (rowData.frozen != undefined && !rowData.frozen && actionType.indexOf("disableFrozen")) ? {
            icon: () => appIcons.cancelIcon,
            tooltip: "Disable/freeze " + util.titleCase(rowData.name),
            onClick: (event, rowData) => { this.handleDialog( event, rowData, "freeze" ); }
        } : false,
        rowData => (rowData.frozen != undefined && rowData.frozen && actionType.indexOf("enableFrozen"))? {
            icon: () => appIcons.checkIcon,
            tooltip: "Enable /unfreeze" + util.titleCase(rowData.name),
            onClick: (event, rowData) => { this.handleDialog( event, rowData, "unfreeze" ); }
        } : false,
        {
            icon: () => appIcons.addIcon,
            tooltip: "Add "+title,
            isFreeAction: true,
            onClick: (event, rowData) => { this.handleDialog(event, rowData, "add"); }
        }]
        
        return (
            <div>
                <br/>
                {apiService ? <LinearProgress /> : false}
                <br/>
                <main>
                    <MaterialTable
                        title=""
                        columns={columns}
                        data={entityData}
                        options={reportOptions}
                        actions={actions}
                    />

                    {showDialog && selectedOp != "enable" && selectedOp != "disable" && selectedOp != "freeze" && selectedOp != "unfreeze" ? (
                        <DialogWidget
                            dialogContent={
                                <EntityItem
                                    title={this.props.title}
                                    reloadPage={this.loadData}
                                    cancelDialog={this.closeDialog}
                                    action={ selectedOp === "view" ? false : true }
                                    actionData={selectedProd}
                                    actionType={selectedOp}
                                    chunkSize={this.props.chunkSize}
                                    groupBy={this.props.groupBy}
                                    formData={this.props.formData}
                                    createEntity={this.props.createEntity}
                                    loadFormData={this.props.loadFormData ? this.props.loadFormData : undefined}
                                    handleCustomDataChange = {this.props.handleCustomDataChange ? this.props.handleCustomDataChange : undefined}
                                    handleSelectChange= {this.props.handleSelectChange ? this.props.handleSelectChange : undefined}
                                />
                            }
                            closeDialog={this.closeDialog}
                        />
                    ) : ( false )}

                    {showDialog && (
                        selectedOp === "enable" || selectedOp === "disable" || 
                        selectedOp === "freeze" || selectedOp === "unfreeze" ) ? (
                        <DialogWidget
                            dialogTitle={dialogTitle}
                            okDialog={this.dialogOkAction}
                            closeDialog={this.closeDialog}
                        />
                    ) : ( false )}
                    <SnackBarWidget message={message} status={status} />
                </main>
            </div>
        );
    }
}

EntityTable.propTypes = {
    classes: PropTypes.object,
    id: PropTypes.string,
    cancelDialog: PropTypes.func,
    reloadPage: PropTypes.func,
    action: PropTypes.string
};
export default EntityTable;
