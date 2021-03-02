import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function UserForm(props) {
  const { open, handleClickClose, currentProfile } = props;
  console.log(currentProfile);

  return (
    <div>

      <Dialog className="dialog-userForm" open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{currentProfile ? "Update" : "Create User"}</DialogTitle>
        <DialogContent>
          <DialogContentText fullWidth >
            To {currentProfile ? "update" : "create"} User, please fill all fields below.
              </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            type="text"
            value={currentProfile?.name}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            value={currentProfile?.email}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone Number"
            type="text"
            value={currentProfile?.phone}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            value={currentProfile?.email}

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
