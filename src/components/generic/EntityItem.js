import React from "react";
import PropTypes from "prop-types";
const { Card, CardHeader, CardContent, CardActions, Button, LinearProgress, Divider } = require("@mui/material")
const { FormGenerator } = require("../../lib")
const { commons, util } = require("../../commons")
const { validateFormData, formToObj } = require("../../lib/validator");
const { SnackBarWidget } = require("../../Widget");

class EntityItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: [],
            status: false,
            message: "",
            apiService: false,
            vendorId: false
        };
    }

    componentDidMount() {
        let form = [...this.props.formData];
        this.setState({ formData: util.formatForm(form) }, async function () {
            this.loadData()

        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.actionType !== this.props.actionType) {
            this.reload();
        }
    }

    reload = async () => {
        await this.resetForm()
        this.loadData()

    }

    loadData = () => {
        let formDataInput = [...this.state.formData];
        if (this.props.actionData && this.props.actionData._id) {
            formDataInput.map(item => {
                item["value"] = this.props.actionData ? this.props.actionData[item.key] : "";

            });

        }
        this.setState({ formData: formDataInput });
        if (this.props.loadFormData) {

            this.props.loadFormData(formDataInput, this.props.actionData)
                .then(updatedFormData => {
                    this.setState({ formData: updatedFormData })
                })
        }
    };


    handleDateChange = async (e, formInput) => {
        let formDataInput = [...this.state.formData];
        var foundIndex = formDataInput.findIndex(
            item => item.key === formInput.key
        );
        formDataInput[foundIndex].value = e;


        if (this.props.handleCustomDataChange) {
            formDataInput = await this.props.handleCustomDataChange(formDataInput);
        }
        this.setState({ formData: formDataInput });
    };

    handleChange = e => {
        let formDataInput = [...this.state.formData];
        formDataInput.find(item => {
            if (item.key === e.target.name) {
                item.value = item.type === "number" ? parseInt(e.target.value) : e.target.value;
            }
        });
        this.setState({ formData: formDataInput });
    };
    handleMultiSelectChange = async (e, object) => {
        let formDataInput = [...this.state.formData];
        let foundIndex = formDataInput.findIndex(item => item.key === e.target.name);
        let k = [...formDataInput[foundIndex].value];
        let n = [...formDataInput[foundIndex].names];
        let index = k.indexOf(object.props.value);
        if (index > -1) {
            k.splice(index, 1);
            n.splice(index, 1)
        }
        else {
            k.push(object.props.value)
            n.push(object.props.name)
        }
        formDataInput[foundIndex].value = k;
        formDataInput[foundIndex].names = n;
        this.setState({ formData: formDataInput });
    };

    resetForm = async () => {
        let form = [...this.props.formData];
        this.setState({ formData: util.formatForm(form) })
    };

    createEntity = async () => {
        let formData = [...this.state.formData];
        this.setState({ status: true, message: "" });

        let validFormData = await validateFormData(formData);
        this.setState({ formData: validFormData });

        let result = validFormData.find(item => {
            if (item.error.length) return item;
        });


        if (!result) {

            this.setState({ apiService: true });
            let params = await formToObj(validFormData);
            console.log("params here " + JSON.stringify(params))
            let res = await this.props.createEntity(params, this.props.actionData)
            console.log("api upsert " + JSON.stringify(res))
            this.setState({ status: res.status, message: res.message, apiService: false });
            setTimeout(
                function () {
                    if (this.state.status) {
                        if (this.props.cancelDialog) this.props.cancelDialog();
                        if (this.props.reloadPage) this.props.reloadPage();
                        this.setState({ apiService: false })
                        this.resetForm();
                    }
                }.bind(this),
                1000
            );
        }
    };

    render() {
        const { status, message, formData, apiService } = this.state;
        let { action } = this.props
        let sortResult = util.sortArr(formData, "order");
        let chunk_size = this.props.chunkSize;
        let groups = util.chunkArray(chunk_size, sortResult);

        return (
            <div>
                {apiService ? <LinearProgress /> : false}
                {commons.detectInternet()}

                <Card style={{ margin: "10px" }}>
                    <CardHeader title={this.props.title} />
                    <Divider variant="fullWidth" />
                    <CardContent>
                        <FormGenerator
                            groups={groups}
                            groupBy={this.props.groupBy}
                            editMode={this.props.action}
                            onChange={this.handleChange}
                            onDateChange={this.handleDateChange}
                            handleMultiSelectChange={this.handleMultiSelectChange}
                            onSelectChange={this.props.handleSelectChange}



                        />

                        <br />
                    </CardContent>

                    {action ? (
                        <CardActions style={{ justifyContent: "flex-end" }}>
                            {(this.props.actionData && this.props.actionData._id) ? false :
                                <Button variant="contained" color="primary" size="small"
                                    onClick={e => this.resetForm(e)}>
                                    Reset </Button>}
                            <Button variant="contained" color="primary" size="small"
                                onClick={e => this.createEntity(e)}>
                                Save
                            </Button>
                        </CardActions>
                    ) : (undefined)}
                </Card>

                <SnackBarWidget message={message} status={status} />
            </div>
        );
    }
}

EntityItem.propTypes = {
    id: PropTypes.string,
    cancelDialog: PropTypes.func,
    reloadPage: PropTypes.func,
    action: PropTypes.bool
};
export default EntityItem;
