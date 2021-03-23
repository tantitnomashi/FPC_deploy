import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch } from '@material-ui/core';

export default function ActionDialog(props) {
    const { open, title, message, onOpenBox, onCancel, currentBox, item } = props;
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
                <DialogTitle id="form-dialog-title">Box Details</DialogTitle>
                <DialogContent>
                    <DialogContentText fullWidth>
                        <h4 className="font-weight-light">{message} !</h4>
                    </DialogContentText>
                    {/* <Form.Label column lg={12}> Active </Form.Label> */}

                    {/* <Switch
                        defaultChecked={currentBox?.status}
                        onChange={handleChange}
                        color="primary"
                        name="checkedB"
                        disabled={false}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    /> */}

                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel} variant="secondary">
                        Cancel
              </Button>
                    {(item?.status == 0) &&
                        <div>
                            <Button className='px-4' onClick={() => onOpenBox(1)} variant="primary">
                                Open
                           </Button>
                            {(item?.rentingStatus != 1) &&

                                <Button className='px-4' onClick={() => onOpenBox(2)} variant="danger">
                                    DeActive
                             </Button>
                            }
                        </div>

                    }
                    {(item?.status == 1) &&

                        <div>

                            {(item?.rentingStatus != 1) &&

                                <Button className='px-4' onClick={() => onOpenBox(2)} variant="danger">
                                    DeActive
                             </Button>
                            }

                        </div>}
                    {(item?.status == 2) && <Button className='px-4' onClick={() => onOpenBox(3)} variant="success">
                        Active
                    </Button>}
                    {(item?.status == 3) &&
                        <div>
                            <Button className='px-4' onClick={() => onOpenBox(1)} variant="primary">
                                Open
                           </Button>
                            {(item?.rentingStatus != 1) &&

                                <Button className='px-4' onClick={() => onOpenBox(2)} variant="danger">
                                    DeActive
                             </Button>
                            }
                        </div>
                    }

                </DialogActions>
            </Dialog>
        </div>
    );
}
