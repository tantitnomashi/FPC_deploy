import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function CreateUserForm(props) {
    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };  
    return (
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
           
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create User</DialogTitle>
            <DialogContent>
              <DialogContentText fullWidth>
                To create new User, please fill all fields below.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Full Name"
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Username"
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Password"
                type="password"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Re-Password"
                type="password"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}
