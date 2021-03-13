import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Image, Form, FormControl, InputGroup } from 'react-bootstrap';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch } from '@material-ui/core';
import API from '../../utils/adminApi'

export default function BoxSizeForm(props) {
    const { open, handleClickClose, currentCabinet, reload } = props;




    const [duration, setDuration] = useState('');

    const [basePrice, setBasePrice] = useState(1);
    const [errBasePrice, setErrBasePrice] = useState('');

    const [errNumber, setErrNumber] = useState('');




    const validData = (text = '', fieldIndex = -1) => {
        switch (fieldIndex) {

            case 5:
                if (text < 1 || text > 2) {
                    setErrBasePrice("Base price must greater than 1!")
                } else if (text == '') {
                    setErrBasePrice("Base price is required!");
                } else {
                    setErrBasePrice("");
                }
                break;
            case 0:
                if (text.length == 0) {
                    setErrNumber("Duration is required")
                } if (text < 0) {
                    setErrNumber("Value must greater than 0!")
                } else {
                    setErrNumber("");
                }
                break;

            default:
                if ((errBasePrice + errNumber).length == 0) {
                    return true;
                }
                break;
        }
        return false;
    }


    const submitForm = () => {
        let tmp = {
            duration: parseInt(duration),
            basePrice: parseFloat(basePrice)
        }


        console.log("#####");
        console.log(tmp);
        console.log("#####");

        API.createTimeSlot(tmp).then((response) => {
            console.log("create: ", response.data.statusCode);
            reload();
        }).catch(e => console.log("create Time Slot ERR", e))

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
                                        validData(text, 0);
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
                                        validData(text, 1);
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
