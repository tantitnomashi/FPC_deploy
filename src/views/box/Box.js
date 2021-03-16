import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Tabs, Tab, Button } from 'react-bootstrap';
import API from '../../utils/adminApi'

import Aux from "../../hoc/_Aux";
import BoxSizeForm from '../boxsize/BoxSizeForm';
import ConfirmDialog from '../commonComponent/Confirm';


export default function BoxSize({ match }) {
    const cabinetId = match.params.id;
    const [boxes, setBoxes] = React.useState([]);

    const [open, setOpen] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);

    const [currentSize, setCurrentSize] = React.useState(null);


    useEffect(() => {
        loadBoxesInCabinet();
    }, []);

    const loadBoxesInCabinet = () => {
        API.getBoxesInCabinet(cabinetId)
            .then((response) => {
                if (response.data.statusCode == 200) {
                    console.log('load boxes ', response.data.data.length);
                    setBoxes(response.data.data);
                } else {
                    alert('Cant get Boxes in Cabinet !')
                }
            }).catch(e => console.log(e + "ERR Box in Cabinet"));

    }

    const setOpenForm = (currentSize) => {
        setOpen(true);
        setCurrentSize(currentSize);
    };


    const setCloseForm = () => {
        setOpen(false);
        setOpenConfirm(false);
    };




    const handleDetail = (currentSize) => {
        setOpenConfirm(true);
        if (currentSize) {
            setCurrentSize(currentSize);
        } else {
            setCurrentSize(null);
        }
    }
    const requestDelete = () => {
        API.deleteBoxSize(currentSize.id)
            .then((response) => {
                if (response.data.statusCode == 200) {
                    console.log(response.data, 'delete boxes ');

                    setBoxes(response.data.data);
                    loadBoxesInCabinet();
                } else {
                    alert('Cant Delete Size !')
                }
            }).catch(e => console.log(" ##  Delete Size ERR", e));
        setCloseForm();
    }

    return (



        <Aux>

            <Row>

                <Col md={6} xl={12}>
                    <Card className=''>
                        <Card.Header>
                            <Card.Title as='h5'>Box List</Card.Title>
                        </Card.Header>
                        <Card.Body className='px-3 py-2'>
                            <Row className="unread py-3 px-1 my-2 border-bottom border-light">

                                <Col md={3} className='text-left' >
                                    Box Number
                                </Col>

                                <Col md={2} className='text-left'>
                                    Rental Status
                                </Col>
                                <Col md={2} className='text-left '>
                                    Status
                                </Col>

                                <Col md={2} className='justify-content-center'>
                                </Col>
                            </Row>
                            {
                                boxes?.map(element =>
                                    <Row className="unread py-3 px-1 my-2 border-bottom border-light">

                                        <Col md={3} className='text-left d-flex align-items-center'>
                                            <h5 className="mb-1">{element.boxNum}</h5>
                                        </Col>

                                        <Col md={2} className='text-left '>
                                            <h5 className="d-flex align-items-center">


                                                {element.rentingStatusName}



                                            </h5>
                                        </Col>
                                        <Col md={2} className='text-left '>
                                            <h5 className=" d-flex align-items-center">


                                                {element.statusName}


                                            </h5>
                                        </Col>

                                        <Col md={2} className='d-flex justify-content-center '>
                                            <Button size="small" variant="dark" className="label text-white f-12" onClick={() => handleDetail(element)}>Delete</Button>
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