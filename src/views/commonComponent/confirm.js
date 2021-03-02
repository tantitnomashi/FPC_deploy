import React from 'react';
import { Button } from 'react-bootstrap';
import {  TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function ConfirmDialog(props) {
    const {open, title, message, onAccess, onCancel}=props;
    return (
        <div>
          
          <Dialog open={open}  onClose={onCancel} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
              <DialogContentText fullWidth>
                    {message}
              </DialogContentText>
              
            </DialogContent>
            <DialogActions>
              <Button onClick={onCancel} color="default">
                Cancel
              </Button>
              <Button onClick={onAccess} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}
