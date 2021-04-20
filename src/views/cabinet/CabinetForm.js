import React, { useState, useEffect } from 'react';
import {
    Row, Col, Button, Image, Form, FormControl, Card,
    Collapse, InputGroup
} from 'react-bootstrap';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch } from '@material-ui/core';
import { NotificationManager } from 'react-notifications';

import API from '../../utils/adminApi'
import AddressSearch from '../commonComponent/AddressSearch';
import ConfirmDialog from '../commonComponent/Confirm';
const MAX_PADDING = 2;
const SIZE = 4;
export default function CabinetForm(props) {
    const { open, handleClickClose, currentCabinet, reload } = props;
    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [locations, setLocations] = useState([]);
    const [users, setUser] = React.useState([]);

    // for preview template
    const [dataTemplateArr, setDataTempleteArr] = useState([]);

    const [template, setTemplate] = useState([]);

    // form control

    const [newName, setNewName] = useState('');
    const [errName, setErrName] = useState('');

    const [basePrice, setBasePrice] = useState(currentCabinet?.priceWeight);
    const [errBasePrice, setErrBasePrice] = useState('');

    const [location, setLocation] = useState(currentCabinet?.locationId);
    const [selectedAddress, setSelectedAddress] = useState({});
    const [errLocation, setErrLocation] = useState('');
    const [isBasic, setIsBasic] = useState(false);
    const [isActive, setIsActive] = React.useState({
        checkedActive: false, checkedFreeRenting: false
    });


    const [selectedStaff, setSelectedStaff] = useState('');


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
                checkedActive: currentCabinet?.isActive
            });
        }
        loadData();


    }, [currentCabinet]);


    const loadData = () => {
        API.getCabitnetTemplate()
            .then((response) => {
                if (response.data.statusCode == 200) {
                    setTemplate(response.data.data);
                    setSelectedTemplate(response.data.data[0]);

                    let dataView = generateView(response.data.data[0]);
                    setDataTempleteArr(dataView);

                } else if (response.data.statusCode == 201) {
                    setTemplate(response.data.data);

                } else {
                    alert('Cant get templates !')
                }
            }).catch(e => console.log(e + "-- API get Template ERR"));
        API.getLocation()
            .then((response) => {
                if (response.data.statusCode == 200) {
                    setLocations(response.data.data);
                    console.log('test select location', response.data.data[0]);
                    setLocation(response.data.data[0].id);
                } else {
                    alert('Cant get location list !')
                }
            }).catch(e => console.log(e + "-- API get Locations ERR"));
        API.getUser()
            .then((response) => {
                if (response.data.statusCode == 200) {
                    //  console.log('load users ', response.data.data[0]);
                    setUser(response.data.data);
                    const found = response.data.data.find(element =>
                        element.roleId == 2
                    );
                    if (found) {
                        setSelectedStaff(found.userName);

                    }
                } else {
                    alert('Cant get Users !')
                }
            }).catch(e => console.log(e + "hihi"));

    }

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
    const generateView = (exampleTemplate) => {
        let view = [];
        let data4View = [];
        console.log("##Generate view ....");
        console.log("##Generate current example", exampleTemplate);
        for (let i = 0; i < exampleTemplate.colsCnt; i++) {
            view.push([]);
            data4View.push([]);
        }

        exampleTemplate.boxConfigurations.map((c) => {
            let index = c.topLeftPosition.indexOf(",");
            let top = parseInt(c.topLeftPosition.substr(0, index), 10);
            let left = parseInt(c.topLeftPosition.substr(index + 1, c.topLeftPosition.length), 10);

            let boxView = data4View[left - 1];
            let numBox = (c.boxSizeType.actualHeight) / 30;
            boxView.push({
                id: c.id,
                name: c.boxNum,
                sizeName: c.boxSizeType.sizeName,
                top: top,
                numBox: numBox,
                w: c.boxSizeType.actualWidth,
                h: c.boxSizeType.actualHeight// + ((numBox - 1) * MAX_PADDING / 2)
            });

        });

        data4View.map((e, i) => {
            let currentIndex = 1;
            e.map((e1, iArr) => {
                let boxView = view[i];
                let indexTmp = e1.numBox;
                if (e1.top != currentIndex) {
                    for (let iL = 0; iL < e1.top - currentIndex; iL++) {

                        boxView.push(BoxItem('Hub', iArr, 30, 30));
                    }
                    currentIndex = e1.top;
                }
                currentIndex += indexTmp;

                boxView.push(BoxItem('Box' + e1.name, e1, e1.w, e1.h));
            })
        });
        return view;
    }
    const handlePreview = (previewTemplate) => {
        setSelectedTemplate(previewTemplate)
        console.log("### Box Configs:", previewTemplate);
        let dataView = generateView(previewTemplate);
        setDataTempleteArr(dataView);
        // setPreTemplate(preTemplate);
    }
    const BoxItem = (data, e, w, h) => {

        return <div id={e.id} style={{ padding: `${MAX_PADDING}px`, width: `${w * SIZE}px`, height: `${h * SIZE}px` }}>
            <div className="bg-warning w-100 h-100 d-flex align-items-center" >
                <h3 className="text-center mx-auto">  {data}</h3>

            </div>
        </div>
        // }
    }



    const submitForm = () => {
        console.log(location);
        let tmp = {
            ...currentCabinet,
            name: newName,
            priceWeight: parseFloat(basePrice),
            locationId: parseInt(location),
            isActive: isActive.checkedActive,
            templateId: selectedTemplate.id,
            locationInstruction: "",
            isFreeRenting: isActive.checkedFreeRenting,
            defaultAssignedStaff: selectedStaff

        }

        console.log("#####");
        console.log(tmp);
        console.log("#####");

        if (currentCabinet) {
            API.updateCabinet(tmp.id, tmp)
                .then((response) => {

                    if (response.data.statusCode == 200) {
                        NotificationManager.success('Update cabinet successfully !', 'Update Cabinet');
                        reload();
                    } else {
                        NotificationManager.error('Sorry, Cannot update this cabinet !', 'Update Cabinet');
                    }
                }).catch(e => NotificationManager.error('Sorry, Cannot update this cabinet !', 'Update Cabinet'))

        } else {
            API.createCabinet(tmp).then((response) => {

                if (response.data.statusCode == 200) {
                    NotificationManager.success('Create cabinet successfully !', 'Create Cabinet');
                    reload();
                } else {
                    NotificationManager.error('Sorry, Cannot create this cabinet !', 'Create Cabinet');
                }
            }).catch(e => console.log("create Cabinet ERR", e))
        }

        handleClickClose();
    }
    //  title - message - type 

    const submitAddLocation = () => {


        API.createLocation(selectedAddress).then((response) => {

            if (response.data.statusCode == 200) {
                NotificationManager.success('Add location successfully !', 'Location');
                reload();
            } else {
                NotificationManager.error('Sorry, Cannot add this location !', 'Location');
            }

            loadData();
            setOpenConfirm(false);
            setIsBasic(!isBasic)

        }).catch(e => NotificationManager.error('Sorry, Cannot add this location !', 'Location'))
    }
    const openAddLocationConfirm = (address) => {
        setSelectedAddress(address);
        setOpenConfirm(true);
    }

    const setCloseForm = () => {

        setOpenConfirm(false);

    };

    return (
        <div>

            <Dialog maxWidth={'xl'} className="dialog-userForm" open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{currentCabinet ? "Update" : "Create Cabinet"}</DialogTitle>
                <DialogContent>
                    <ConfirmDialog open={openConfirm} onAccessLabel={"Add"}
                        tilte="Add Location" message={"Do you want to add " + selectedAddress.buildingName + ' ?'} onAccess={() => submitAddLocation()} onCancel={setCloseForm} />

                    <Form className="w-100">
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

                                    <Form.Control as="select" defaultValue={currentCabinet ? currentCabinet.locationId : locations[0]?.id} custom
                                        onChange={(e) => {
                                            let text = e.target.value;

                                            setLocation(text);
                                            console.log("change location..from", text);
                                            console.log("change location..to", location);

                                        }} >

                                        {
                                            locations.map(value =>
                                                <option key={value.id} value={value.id}>{value.buildingName}</option>
                                            )
                                        }

                                    </Form.Control>
                                    <InputGroup.Append>
                                        <InputGroup.Text onClick={() => setIsBasic(!isBasic)}><span class="material-icons">room</span></InputGroup.Text>

                                    </InputGroup.Append>
                                </InputGroup>
                                <Collapse in={isBasic}>
                                    <Row>

                                        <Col className="" md={12}>

                                            <div id="basic-collapse">
                                                <AddressSearch onSelectedLocation={openAddLocationConfirm}>Picker</AddressSearch>
                                            </div>

                                        </Col>


                                    </Row>
                                </Collapse>


                                <Form.Label column lg={12}>Base Price</Form.Label>
                                <Form.Control className="my-1" id="base-price"
                                    type="number" min="1" step="0.01" defaultValue={currentCabinet?.priceWeight}
                                    onChange={(e) => {
                                        let text = e.target.value;
                                        setBasePrice(text)
                                        validData(text, 1);
                                    }}
                                />

                                <Form.Label column lg={12}>Default Staff</Form.Label>
                                <Form.Control as="select" custom defaultValue={users[0]?.userName}
                                    onChange={(e) => {
                                        let text = e.target.value;

                                        setSelectedStaff(text)

                                        console.log("###name assigne", text)
                                    }} >

                                    {
                                        users.map(value => {
                                            console.log("role", value.roleId);
                                            return (value.roleId == 2) && <option value={value.userName}>{value.fullName}</option>

                                        })



                                    }

                                </Form.Control>


                                <Form.Label column lg={12}> Active </Form.Label>

                                <Switch
                                    defaultChecked={currentCabinet?.isActive}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedActive"
                                    disabled={false}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <Form.Label column lg={12}> Is Free Renting </Form.Label>

                                <Switch
                                    defaultChecked={currentCabinet?.isFreeRenting}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedFreeRenting"
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
                                <div>
                                    <div className="d-flex flex-row" style={{ height: '600px' }}>
                                        {
                                            dataTemplateArr.map((e, i) => (
                                                <div key={i}>
                                                    {e.map((b) => b)}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    {!currentCabinet &&
                                        <div>


                                            <p>Choose cabinet template</p>
                                            <div>
                                                {template.map((value, index) =>
                                                    <div className="btn btn-dark" style={{
                                                        position: 'relative', display: 'inline-block', width: '80px', height: '50px', marginRight: '3px'
                                                    }} onClick={() => handlePreview(value)}>

                                                        {index + 1}
                                                        {selectedTemplate.id == value.id && <div style={{ position: 'absolute', top: '0', right: '0', color: 'greenyellow' }}>
                                                            <span class="material-icons">check_circle</span>
                                                        </div>}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    }
                                </div>


                            </Col>
                            {/* <Col md={6} xl={6}>
                                <div>
                                    <div style={{ display: "inline-block" }}>
                                        <div style={{
                                            width: '500px', height: '350px',
                                            backgroundImage: `url('${selectedTemplate?.imgUrl}')`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'contain'

                                        }} >
                                        </div>
                                    </div>
                                    {!currentCabinet &&
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
                                    }
                                </div>


                            </Col> */}

                        </Form.Row>
                    </Form>
                </DialogContent >



            </Dialog >
        </div >
    );
}
