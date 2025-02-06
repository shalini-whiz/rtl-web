import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import proxelera from "../images/proxelera.png"
import { Divider } from '@mui/material';

function DialogWidget(props) {

    const [open, setOpen] = React.useState(true);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        props.closeDialog()

    };

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Dialog
                fullWidth
                maxWidth={props.maxWidth ? props.maxWidth : "md"}
                // disablebackdropclick="true"
                disableEscapeKeyDown
                open={open}
                onClose={handleClose}>
                {props.dialogTitle ?
                    <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <img src={proxelera} style={{ width: '50px', marginRight: 10 }} />
                            {props.dialogTitle}

                        </div>


                    </DialogTitle>
                    : false}
                <Divider />
                <DialogContent>
                    {props.dialogContent}
                    <DialogContentText>
                        {props.dialogContentText}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {props.okDialog ? <Button onClick={props.okDialog} variant='contained'
                        autoFocus disabled={props.apiService}
                        style={{ background: props.negOk && props.negOk == true ? 'red' : 'blue', color: 'white' }}
                    >
                        {props.okTitle ? props.okTitle : 'OK'}
                    </Button> : ''}

                    <Button onClick={props.closeDialog} variant='contained' autoFocus
                        style={{ background: props.negCancel && props.negCancel == true ? 'red' : 'blue', color: 'white' }}

                    >
                        {props.cancelTitle ? props.cancelTitle : 'CLOSE'}

                    </Button>
                </DialogActions>
            </Dialog>
        </ClickAwayListener>

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
