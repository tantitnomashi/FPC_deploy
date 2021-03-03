import React, { useState, useEffect } from 'react';
import { Button, Form, FormControl, Row, Col } from 'react-bootstrap';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch } from '@material-ui/core';

export default function UserForm(props) {
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

      <Dialog style={{ width: '800px', margin: 'auto', border: '1px solid red' }} className="dialog-userForm " open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{currentProfile ? "Update" : "Create Account"}</DialogTitle>
        <DialogContent style={{ border: '1px solid blue' }} className='w-100' >
          <DialogContentText  >
            To {currentProfile ? "update" : "create"} User, please fill all fields below.
              </DialogContentText>

          <Row style={{ border: '1px solid violet' }} className='w-100' >

            <Col md={6} xl={6}>
              <Form.Label column lg={12}>Name </Form.Label>
              <Form.Control className="my-1" autoFocus id="name" name="name" value={currentProfile?.name}
                label="Name" fullWidth
                type="Text" placeholder="" />

              <Form.Label column lg={12}>Email </Form.Label>
              <Form.Control className="my-1" id="email"
                label="Email"
                type="email"
                value={currentProfile?.email} />

              <Form.Label column lg={12}>Phone Number </Form.Label>
              <Form.Control className="my-1" id="phone"
                type="text"
                value={currentProfile?.phone} />

            </Col>
            <Col md={6} xl={6}>

              <Form.Label column lg={12}>Username </Form.Label>
              <Form.Control className="my-1" id="username" name="username"
                type="text" disabled={currentProfile ? true : false}
                value={currentProfile?.email} />

              <Form.Label column lg={12}>Password </Form.Label>
              <Form.Control className="my-1" id="password" name="password"
                type="password"
              />

              <Form.Label column lg={12}> Re Password </Form.Label>
              <Form.Control className="my-1" id="re-password" name="re-password"
                type="password"
              />
              <Form.Label column lg={12}> Active </Form.Label>

              <Switch
                checked={state.checkedB}
                onChange={handleChange}
                color="primary"
                name="checkedB"
                disabled={true}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />


            </Col>
          </Row>




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
