import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Image, Form, FormControl, InputGroup } from 'react-bootstrap';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch } from '@material-ui/core';
import API from '../../utils/adminApi'
import { NotificationManager } from 'react-notifications';

export default function BoxSizeForm(props) {
    const { open, handleClickClose, currentCabinet, reload } = props;




    const [newName, setNewName] = useState('');
    const [errName, setErrName] = useState('');

    const [virtualWidth, setVirtualWidth] = useState(1);
    const [virtualHeight, setVirtualHeight] = useState(1);

    const [actualWidth, setActualWidth] = useState(1);
    const [actuallHeight, setActualHeight] = useState(1);


    const [basePrice, setBasePrice] = useState(1);
    const [errBasePrice, setErrBasePrice] = useState('');

    const [errNumber, setErrNumber] = useState('');




    const validData = (text = '', fieldIndex = -1) => {
        switch (fieldIndex) {
            case 0:
                if (text.length >= 30) {
                    setErrName("Name too long ! Under 30 digits please!");
                } else if (text === '') {
                    setErrName("Name is required!");
                } else {
                    setErrName("");
                }
                break;
            case 5:
                if (text < 1 || text > 2) {
                    setErrBasePrice("Base price must greater than 1!")
                } else if (text == '') {
                    setErrBasePrice("Base price is required!");
                } else {
                    setErrBasePrice("");
                }
                break;
            case 1:
                if (text.length == 0) {
                    setErrNumber("Size is required")
                } if (text < 0) {
                    setErrNumber("Value must greater than 0!")
                } else {
                    setErrNumber("");
                }
                break;

            default:
                if ((errBasePrice + errNumber + errName).length == 0) {
                    return true;
                }
                break;
        }
        return false;
    }


    const submitForm = () => {
        let tmp = {
            sizeName: newName,
            virtualWidth: parseInt(virtualWidth),
            virtualHeight: parseInt(virtualHeight),
            actualWidth: parseInt(actualWidth),
            actualHeight: parseInt(actuallHeight),
            priceWeight: parseFloat(basePrice)
        }


        console.log("#####");
        console.log(tmp);
        console.log("#####");

        API.createBoxSize(tmp).then((response) => {
            console.log("create: ",);
            if (response.data.statusCode == 200) {
                NotificationManager.success('Create Box size successfully!', 'Create Box Size');
            } else {
                NotificationManager.error('Sorry, Cannot create this Box size!', 'Create Box Size')
            }
            reload();
            handleClickClose();

        }).catch(e => NotificationManager.error('Sorry, Cannot create this Box size!', 'Create Box Size'))
    }

    return (
        <div>

            <Dialog maxWidth={'md'} fullWidth={true} className="dialog-userForm" open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> New Box Size</DialogTitle>
                <DialogContent>

                    <Form>
                        <Form.Row>

                            <Col md={6} xl={6}>
                                <Form.Label column lg={12}>Name    </Form.Label>
                                <Form.Control className="my-1" id="name"
                                    label="Name"
                                    type="Text" placeholder=""
                                    onChange={(e) => {
                                        let text = e.target.value;
                                        setNewName(text)
                                        validData(text, 0);
                                    }}
                                    defaultValue={currentCabinet?.name} />
                            </Col>
                            <Col md={6} xl={6}>
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

                        <Form.Row>
                            <Col md={6} xl={6}>
                                <Form.Label column lg={12}>Virtual Height </Form.Label>

                                <InputGroup className="my-1 mb-2" id="address" >

                                    <FormControl id="inlineFormInputGroup"
                                        onChange={(e) => {
                                            let text = e.target.value;
                                            setVirtualHeight(text)
                                            validData(text, 1);
                                        }} />

                                </InputGroup>

                            </Col>
                            <Col md={6} xl={6}>
                                <Form.Label column lg={12}>Virtual Width </Form.Label>

                                <InputGroup className="my-1 mb-2" id="address" >

                                    <FormControl id="inlineFormInputGroup"
                                        onChange={(e) => {
                                            let text = e.target.value;
                                            setVirtualWidth(text)
                                            validData(text, 1);
                                        }} />

                                </InputGroup>
                            </Col>

                        </Form.Row>

                        <Form.Row>
                            <Col md={6} xl={6}>
                                <Form.Label column lg={6}>Actual Height </Form.Label>

                                <InputGroup className="my-1 mb-2" id="address" >

                                    <FormControl id="inlineFormInputGroup"
                                        onChange={(e) => {
                                            let text = e.target.value;
                                            setActualHeight(text)
                                            validData(text, 1);
                                        }} />

                                </InputGroup>

                            </Col>
                            <Col md={6} xl={6}>

                                <Form.Label column lg={6}>Actual Width  </Form.Label>

                                <InputGroup className="my-1 mb-2" id="address" >

                                    <FormControl id="inlineFormInputGroup"
                                        onChange={(e) => {
                                            let text = e.target.value;
                                            setActualWidth(text)
                                            validData(text, 1);
                                        }} />

                                </InputGroup>
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
