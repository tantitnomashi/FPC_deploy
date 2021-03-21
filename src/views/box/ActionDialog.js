import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch } from '@material-ui/core';

export default function ActionDialog(props) {
    const { open, title, message, onAccess, onCancel, currentBox } = props;
    const [isActive, setIsActive] = React.useState({
        checkedB: true
    });
    const handleChange = (event) => {
        console.log("^^^");
        setIsActive({ ...isActive, [event.target.name]: event.target.checked });
    };
    return (
        <div>

            <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText fullWidth>aaaa
                        {currentBox?.id}
                    </DialogContentText>
                    <Form.Label column lg={12}> Active </Form.Label>

                    <Switch
                        defaultChecked={currentBox?.status}
                        onChange={handleChange}
                        color="primary"
                        name="checkedB"
                        disabled={false}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel} variant="secondary">
                        Cancel
              </Button>
                    <Button className='px-4' onClick={onAccess} color="primary">
                        {currentBox?.status == 1 ? "Open" : "Close"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
