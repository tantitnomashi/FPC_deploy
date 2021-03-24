import React, { useState, useEffect } from 'react';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch } from '@material-ui/core';
import { Row, Col, Button, Image, Form, FormControl, InputGroup } from 'react-bootstrap';
import API from '../../utils/adminApi'

export default function RequestForm(props) {
    var sapmle = [
        {
            type: 0,
            name: "Check Box"
        },
        {
            type: 1,
            name: "Check Connection"
        },
        {
            type: 2,
            name: "Check Expired Items"
        }
    ];

    const { open, handleClickClose, currentTransaction } = props;
    const [statusList, setStatusList] = useState(sapmle);
    const [selectedCabinet, setSelectedCabinet] = useState();
    const [selectedStaff, setSelectedStaff] = useState('');
    const [selectedType, setSelectedType] = useState(0);
    const [desc, setDesc] = useState('');
    const [type, setType] = useState(sapmle);


    const [cabinets, setCabinets] = React.useState([]);
    const [users, setUser] = React.useState([]);

    useEffect(() => {

        loadAdminCabinets();
        // setSelectedType(type[0]?.type);
        // setSelectedCabinet(cabinets[0]?.id);
        // setSelectedStaff(users[0]?.userName);
    }, []);
    const loadAdminCabinets = () => {
        API.getCabitnet()
            .then((response) => {
                if (response.data.statusCode == 200) {
                    console.log('load cabinets ', response.data.data[0]);
                    setCabinets(response.data.data);
                } else {
                    alert('Cant get Cabi !')
                }
            }).catch(e => console.log(e + "hihi"));
        API.getUser()
            .then((response) => {
                if (response.data.statusCode == 200) {
                    //  console.log('load users ', response.data.data[0]);
                    setUser(response.data.data);
                } else {
                    alert('Cant get Users !')
                }
            }).catch(e => console.log(e + "hihi"));
    }


    const submitForm = () => {

        const found = cabinets.find(element =>
            element.id == selectedCabinet
        );
        if (selectedCabinet != '' && selectedStaff != '' && found) {
            let tmp = {
                cabinetId: found.id,
                boxNum: 1,
                cabinetName: found.name,
                cabinetLocation: found.location.buildingName,
                requestType: parseInt(selectedType),
                description: desc,
                assignee: selectedStaff
            }
            console.log("### REQ", tmp);
            API.createCheckingRequest(tmp).then((response) => {
                console.log("rs Checking  status: ", response.data.statusCode);
            }).catch(e => console.log("create Checking ERR", e))
        }
        setTimeout(handleClickClose, 200);

        // handleClickClose();
    }
    return (
        <div>

            <Dialog maxWidth={'xs'} fullWidth={true} className="dialog-userForm" open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Checking Request Form </DialogTitle>
                <DialogContent>

                    <Form>
                        <Form.Row>

                            <Col md={12} xl={12}>
                                <Form.Label column lg={12}>Cabinet</Form.Label>
                                <Form.Control as="select" custom defaultValue={cabinets[0]?.id}
                                    onChange={(e) => {
                                        let text = e.target.value;
                                        setSelectedCabinet(text)

                                        console.log("change status..from", text);

                                    }}
                                >

                                    {
                                        cabinets.map(value =>
                                            <option value={value.id}>{value.name}</option>
                                        )
                                    }

                                </Form.Control>
                            </Col>
                            <Col md={12} xl={12}>
                                <Form.Label column lg={12}>Assign for</Form.Label>
                                <Form.Control as="select" custom defaultValue={users[0]?.userName}
                                    onChange={(e) => {
                                        let text = e.target.value;

                                        setSelectedStaff(text)

                                        console.log("###name assigne", text)
                                    }} >

                                    {
                                        users.map(value =>
                                            <option value={value.userName}>{value.fullName}</option>
                                        )
                                    }

                                </Form.Control>
                            </Col>
                            <Col md={12} xl={12}>
                                <Form.Label column lg={12}>Type of request</Form.Label>
                                <Form.Control as="select" custom defaultValue={type[0]?.type}
                                    onChange={(e) => {
                                        let text = e.target.value;
                                        setSelectedType(text)
                                    }} >

                                    {
                                        type.map(value =>
                                            <option value={value.type}>{value.name}</option>
                                        )
                                    }

                                </Form.Control>
                            </Col>
                            <Col md={12} xl={12}>
                                <Form.Label column lg={12}>Description</Form.Label>
                                <Form.Control type="text"
                                    onChange={(e) => {
                                        let text = e.target.value;
                                        setDesc(text)

                                    }}
                                >


                                </Form.Control>
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
        </div>
    );
}