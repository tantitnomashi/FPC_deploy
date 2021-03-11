import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Image, Form, FormControl, InputGroup } from 'react-bootstrap';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch } from '@material-ui/core';
import API from '../../utils/adminApi'

export default function UserForm(props) {
    const { open, handleClickClose, currentCabinet, reload } = props;
    const [selectedTemplate, setSelectedTemplate] = useState({});



    const [template, setTemplate] = useState([]);

    const [newName, setNewName] = useState('');
    const [errName, setErrName] = useState('');

    const [basePrice, setBasePrice] = useState(currentCabinet?.priceWeight);
    const [errBasePrice, setErrBasePrice] = useState('');

    const [location, setLocation] = useState(currentCabinet?.locationId);
    const [errLocation, setErrLocation] = useState('');
    const [isActive, setIsActive] = React.useState({
        checkedB: true
    });

    const handleChange = (event) => {
        console.log("^^^");
        setIsActive({ ...isActive, [event.target.name]: event.target.checked });
    };

    useEffect(() => {
        setBasePrice(currentCabinet?.priceWeight);
        setLocation(currentCabinet?.locationId);
        setNewName(currentCabinet?.name)
        if (currentCabinet) {
            setIsActive({
                checkedB: currentCabinet?.isActive
            });
        }

        API.getCabitnetTemplate()
            .then((response) => {
                if (response.data.statusCode == 200) {
                    setTemplate(response.data.data);
                    setSelectedTemplate(response.data.data[0]);

                } else if (response.data.statusCode == 201) {
                    setTemplate(response.data.data);

                } else {
                    alert('Cant get templates !')
                }
            }).catch(e => console.log(e + "-- API get Template ERR"));

    }, [currentCabinet]);




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
            case 1:
                if (text < 1 || text > 2) {
                    setErrBasePrice("Base price must greater than 1!")
                } else if (text == '') {
                    setErrBasePrice("Base price is required!");
                } else {
                    setErrBasePrice("");
                }
                break;
            case 2:
                if (text.length == 0) {
                    setErrLocation("Location is required")
                } else {
                    setErrLocation("");
                }
                break;

            default:
                if ((errBasePrice + errLocation + errName).length == 0) {
                    return true;
                }
                break;
        }
        return false;
    }


    const submitForm = () => {
        console.log(location);
        let tmp = {
            ...currentCabinet,
            name: newName,
            priceWeight: parseFloat(basePrice),
            locationId: parseInt(location),
            isActive: isActive.checkedB,
            templateId: selectedTemplate.id,
            locationInstruction: "FPT Building "

        }
        if (!window.confirm('Confirm ?')) return;

        console.log("#####");
        console.log(tmp);
        console.log("#####");

        if (currentCabinet) {
            API.updateCabinet(tmp.id, tmp)
                .then((response) => {
                    console.log("update: ", response.data.statusCode);
                    reload();
                }).catch(e => console.log(e.response.data, "update Cabinet ERR"))

        } else {
            API.createCabinet(tmp).then((response) => {
                console.log("create: ", response.data.statusCode);
                reload();
            }).catch(e => console.log("create Cabinet ERR", e))
        }

        handleClickClose();
    }

    return (
        <div>

            <Dialog maxWidth={'lg'} className="dialog-userForm" open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{currentCabinet ? "Update" : "Create Cabinet"}</DialogTitle>
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
                                        console.log(text);
                                        setNewName(text)
                                        validData(text, 0);
                                    }}
                                    defaultValue={currentCabinet?.name} />

                                <Form.Label column lg={12}>Location </Form.Label>

                                <InputGroup className="my-1 mb-2" id="address" >

                                    <FormControl id="inlineFormInputGroup"
                                        name='location' placeholder=""
                                        defaultValue={currentCabinet?.locationId}
                                        onChange={(e) => {
                                            let text = e.target.value;
                                            setLocation(text)
                                            validData(text, 2);
                                        }} />
                                    <InputGroup.Append>
                                        <InputGroup.Text><span class="material-icons">room</span></InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>

                                <Form.Label column lg={12}>Base Price</Form.Label>
                                <Form.Control className="my-1" id="base-price"
                                    type="number" min="1" step="0.01" defaultValue={currentCabinet?.priceWeight}
                                    onChange={(e) => {
                                        let text = e.target.value;
                                        setBasePrice(text)
                                        validData(text, 1);
                                    }}
                                />
                                <Form.Label column lg={12}> Active </Form.Label>

                                <Switch
                                    defaultChecked={currentCabinet?.isActive}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedB"
                                    disabled={false}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />



                                <DialogActions>
                                    <Button onClick={handleClickClose} variant="secondary">
                                        Cancel
                                    </Button>
                                    <Button className='px-4' onClick={submitForm} color="primary">
                                        Save
                                      </Button>
                                </DialogActions>

                            </Col>
                            <Col md={6} xl={6}>
                                <div style={{ display: "inline-block" }}>
                                    <div style={{
                                        width: '500px', height: '350px',
                                        backgroundImage: `url('${selectedTemplate?.imgUrl}')`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'contain'

                                    }} >
                                        {/* <Image style={{ width: '400px' }} size='sm' src={demoType[type].url} fluid /> */}
                                    </div>
                                </div>
                                <div>
                                    <p>Choose cabinet template</p>
                                    <div>
                                        {template.map((value, index) =>
                                            <div style={{
                                                position: 'relative', display: 'inline-block', width: '80px', height: '50px', marginRight: '3px'
                                            }} onClick={() => setSelectedTemplate(value)}>
                                                <img width='80' src={value.imgUrl} fluid />

                                                {selectedTemplate.id == value.id && <div style={{ position: 'absolute', top: '0', right: '0', color: 'greenyellow' }}>
                                                    <span class="material-icons">check_circle</span>
                                                </div>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Col>

                        </Form.Row>
                    </Form>
                </DialogContent >



            </Dialog >
        </div >
    );
}
