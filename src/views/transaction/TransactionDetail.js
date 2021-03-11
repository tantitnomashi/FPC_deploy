import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch } from '@material-ui/core';

export default function TransactionDetail(props) {
    const { open, handleClickClose, currentProfile } = props;
    console.log(currentProfile);

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    return (
        <div>

            <Dialog className="dialog-userForm" open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{currentProfile ? "Update" : "Create User"}</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="id"
                        label="Id"
                        type="text"
                        disabled
                        value={currentProfile?._id}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        disabled
                        value={currentProfile?.Name}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        label="Price"
                        type="text"
                        value={currentProfile?.Amount}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="time"
                        label="Rental Start Time"
                        type="time"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="payment"
                        label="Payment Method"
                        type="text"
                        value={currentProfile?.PaymentMethod}
                        fullWidth
                    />
                    <DialogContentText  >
                        Active
                        <Switch
                            checked={state.checkedB}
                            onChange={handleChange}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </DialogContentText>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose} variant="secondary">
                        Cancel
              </Button>
                    <Button className='px-4' onClick={handleClickClose} color="primary">
                        Save
              </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
