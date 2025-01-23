import React from 'react'
import { Snackbar, SnackbarContent, Alert } from "@mui/material"
import PropTypes from 'prop-types';



export default class SnackBarWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "open": true
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.message !== this.props.message) {
            this.setState({ open: true })
        }
    }


    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ "open": false })
    };

    render() {

        const { message, status } = this.props;

        let content = (message && message.length) ?
            (<Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={this.state.open}
                autoHideDuration={1000}
                onClose={this.handleClose}
            >
                {/* <SnackbarContent
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" >
                            {message}
                        </span>
                    }

                /> */}
                <Alert
                    onClose={this.handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>) : '';

        return content

    }

}

SnackBarWidget.propTypes = {
    classes: PropTypes.object,
    message: PropTypes.string,
    type: PropTypes.string
};
