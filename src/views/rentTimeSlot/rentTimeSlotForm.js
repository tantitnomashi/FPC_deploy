import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Image, Form, FormControl, InputGroup } from 'react-bootstrap';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch } from '@material-ui/core';
import API from '../../utils/adminApi'
import { NotificationManager } from 'react-notifications';

export default function BoxSizeForm(props) {

    const { open, handleClickClose, currentCabinet, reload } = props;
    const [duration, setDuration] = useState('');
    const [basePrice, setBasePrice] = useState(1);
    const [errBasePrice, setErrBasePrice] = useState('');
    const [errNumber, setErrNumber] = useState('');

    const submitForm = () => {
        let tmp = {
            duration: parseInt(duration),
            basePrice: parseFloat(basePrice)
        }
        console.log("#####");
        console.log(tmp);
        console.log("#####");

        API.createTimeSlot(tmp).then((response) => {
            if (response.data.statusCode == 200) {
                NotificationManager.success('Create Rental time slot successfully!', 'Create Rental time slot');
                reload();
            } else {
                NotificationManager.error('Sorry, Cannot create this Rental time slot!', 'Create Rental time slot');
            }
        }).catch(e => NotificationManager.error('Sorry, Cannot create this Rental time slot!', 'Create Rental time slot'))

        handleClickClose();
    }

    return (
        <div>

            <Dialog maxWidth={'xs'} fullWidth={true} className="dialog-userForm" open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> New Time Slot</DialogTitle>
                <DialogContent>

                    <Form>
                        <Form.Row>

                            <Col md={12} xl={12}>
                                <Form.Label column lg={12}>Duration    </Form.Label>
                                <Form.Control className="my-1" id="name"
                                    label="Name"
                                    type="Text" placeholder=""
                                    onChange={(e) => {
                                        let text = e.target.value;
                                        setDuration(text)
                                    }}
                                    defaultValue={currentCabinet?.name} />
                            </Col>
                            <Col md={12} xl={12}>
                                <Form.Label column lg={12}>Base Price</Form.Label>
                                <Form.Control className="my-1" id="base-price"
                                    type="number" min="1" step="0.01" defaultValue={currentCabinet?.priceWeight}
                                    onChange={(e) => {
                                        let text = e.target.value;
                                        setBasePrice(text)
                                    }}
                                />


                            </Col>


                        </Form.Row>


                        <DialogActions>
                            <Button onClick={handleClickClose} variant="secondary">
                                Cancel
                                    </Button>
                            <Button className='px-4' onClick={submitForm} color="primary">
                                Save
                                      </Button>
                        </DialogActions>




                    </Form>
                </DialogContent >



            </Dialog >
        </div >
    );
}
