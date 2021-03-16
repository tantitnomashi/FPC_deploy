import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Tabs, Tab, Button } from 'react-bootstrap';
import API from '../../utils/adminApi'
import Aux from "../../hoc/_Aux";
import TimeSlotForm from './RentTimeSlotForm';
import ConfirmDialog from '../commonComponent/Confirm';


export default function RentTimeSlot({ match }) {

    const [slots, setSlots] = React.useState([]);

    const [open, setOpen] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);

    const [currentSlot, setCurrentSlot] = React.useState(null);


    useEffect(() => {
        loadAdminTimeSlots();
    }, []);

    const loadAdminTimeSlots = () => {
        API.getTimeSlots()
            .then((response) => {
                if (response.data.statusCode == 200) {
                    console.log('load slots ', response.data.data[0]);
                    setSlots(response.data.data);
                } else {
                    alert('Cant get Slots !')
                }
            }).catch(e => console.log(e + "hihi"));

    }

    const setOpenForm = (currentSlot) => {
        setOpen(true);
        setCurrentSlot(currentSlot);
    };


    const setCloseForm = () => {
        setOpen(false);
        setOpenConfirm(false);
    };


    const handleDelete = (currentSlot) => {
        setOpenConfirm(true);
        if (currentSlot) {
            setCurrentSlot(currentSlot);
        } else {
            setCurrentSlot(null);
        }
    }
    const requestDelete = () => {
        API.deleteTimeSlot(currentSlot.id)
            .then((response) => {
                if (response.data.statusCode == 200) {
                    console.log(response.data, 'delete slots');
                    setSlots(response.data.data);
                    loadAdminTimeSlots();
                } else {
                    alert('Cant Delete Size !')
                }
            }).catch(e => console.log(" ##  Delete Size ERR", e));
        setCloseForm();
    }

    return (



        <Aux>
            <TimeSlotForm reload={loadAdminTimeSlots} open={open} handleClickClose={setCloseForm} currentSlot={currentSlot} />
            <ConfirmDialog open={openConfirm}
                tilte="Delete Confirm" message={"Are your sure to delete this Time Slot "} onAccess={() => requestDelete(currentSlot?.id)} onCancel={setCloseForm} />
            <Row>
                <Col md={6} xl={8}>

                </Col>

                <Col md={6} xl={4}>
                    <div className="text-right mb-3">
                        <Button className="mx-2" variant="primary" size="small" onClick={() => setOpenForm()}>
                            Add Time Slot
                        </Button>

                    </div>


                </Col>
            </Row>
            <Row>

                <Col md={6} xl={12}>
                    <Card className=''>
                        <Card.Header>
                            <Card.Title as='h5'>Rent Time Slot List</Card.Title>
                        </Card.Header>
                        <Card.Body className='px-3 py-2'>
                            <Row className="unread py-3 px-1 my-2 border-bottom border-light">

                                <Col md={3} className='text-center' >
                                    Slot num.
                                </Col>


                                <Col md={3} className='text-left '>
                                    Duration
                                </Col>
                                <Col md={3} className='justify-content-center'>
                                    Base Price
                                </Col>
                                <Col md={2} className='justify-content-center'>
                                </Col>
                            </Row>
                            {
                                slots?.map((element, index) =>

                                    < Row className="unread py-3 px-1 my-2 border-bottom border-light" >

                                        <Col md={3} className='text-center'>
                                            <h5 className="d-flex align-items-center justify-content-center">{index++}</h5>
                                        </Col>

                                        <Col md={3} className='text-center '>
                                            <h5 className="d-flex align-items-center ">


                                                {"   " + element.duration}


                                            </h5>
                                        </Col>

                                        <Col md={3} className='text-left '>
                                            <h5 className=" d-flex align-items-center">
                                                <span class="material-icons f-30 m-r-5">
                                                    perm_data_setting
                                                </span>

                                                {element.basePrice}


                                            </h5>
                                        </Col>
                                        <Col md={2} className='d-flex justify-content-center '>
                                            <Button size="small" variant="dark" className="label text-white f-12" onClick={() => handleDelete(element)}>Delete</Button>
                                        </Col>
                                    </Row>

                                )
                            }


                        </Card.Body>
                    </Card>
                </Col>




            </Row>

        </Aux >
    );
}