import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';


function DialogWidget(props) {

    const [open, setOpen] = React.useState(true);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);

    };

    return (
        <Dialog
            fullWidth
            maxWidth={props.maxWidth ? props.maxWidth : "md"}
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            onClose={handleClose}>
            {props.dialogTitle ? 
            <DialogTitle style={{  textAlign: 'center', fontWeight: 'bold' }}>{props.dialogTitle}</DialogTitle>
 : false}
            <DialogContent>
                {props.dialogContent}
                <DialogContentText>
                    {props.dialogContentText}

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {props.okDialog ? <Button onClick={props.okDialog} variant='contained' autoFocus disabled={props.apiService}>
                    {props.okTitle ? props.okTitle : 'OK'}
                </Button> : ''}
                <Button onClick={props.closeDialog} variant='contained' autoFocus>
                    CLOSE
                </Button>
            </DialogActions>
        </Dialog>

    )

}

DialogWidget.propTypes = {
    classes: PropTypes.object,
    dialogTitle: PropTypes.string,
    dialogContent: PropTypes.object,
    okDialog: PropTypes.func,
    okTitle: PropTypes.string,
    closeDialog: PropTypes.func
};

export default DialogWidget;
