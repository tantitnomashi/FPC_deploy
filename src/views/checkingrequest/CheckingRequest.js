import React, { useState, useEffect } from 'react';
import {
    Row, Col, Card, Table, Tabs, Button, Form, FormControl,
    Collapse, InputGroup
} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import ConfirmDialog from '../commonComponent/Confirm';
import RequestForm from './RequestForm';
import API from '../../utils/adminApi';


export default function Request() {
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [currentRequest, setCurrentRequest] = React.useState(null);
    const [requestList, setRequestList] = React.useState([]);
    const [isBasic, setIsBasic] = useState(false);
    // var sapmle = require('../../sampleData/transactionStatus.json');

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
    // for details
    const [open, setOpen] = React.useState(false);
    const setOpenForm = (currentReq) => {
        setOpen(true);
        setCurrentRequest(currentReq);
    };

    const setCloseForm = () => {
        setOpen(false);
        loadData();
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        console.log("###reload data...")
        API.getCheckingRequest()
            .then((response) => {
                if (response.data.statusCode == 200) {
                    let tmp = response.data.data;
                    tmp = tmp.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    })
                    setRequestList(tmp);
                    // setFilterList(tmp)
                } else {
                    alert('Cant get Checking request !')
                }
            }).catch(e => console.log(e + "##ERR load data Checkign req"));

    }


    // for confirm diaglog
    const handleDelete = (currentRequest) => {
        setOpenConfirm(true);
        if (currentRequest) {
            setCurrentRequest(currentRequest);
        } else {
            setCurrentRequest(null);
        }
    }
    const requestDelete = (username) => {
        setTimeout(() => {

            setOpenConfirm(true);
        }, 2000);
    }
    const setCloseConfirmForm = () => {
        setOpenConfirm(false);

    };


    //for filter 
    var sample = require('../../sampleData/transactionStatus.json');
    const [filterList, setFilterList] = useState(sapmle);
    const [activeFilter, setActiveFilter] = useState([]);

    const onFilterChange = (filter) => {

        if (filter === "ALL") {
            if (activeFilter.length === filterList.length) {
                setActiveFilter([]);

            } else {
                setActiveFilter(filterList.map(filter => filter.statusName));
            }
        } else {
            if (activeFilter.includes(filter)) {
                const filterIndex = activeFilter.indexOf(filter);
                const newFilter = [...activeFilter];
                newFilter.splice(filterIndex, 1);
                setActiveFilter(newFilter);

            } else {
                setActiveFilter([...activeFilter, filter]);
            }
            setTimeout(console.log("active filter", activeFilter)
                , 200);

        }
    }



    let filteredList;
    if (
        activeFilter.length === 0 ||
        activeFilter.length === filterList.length
    ) {
        filteredList = requestList;
        console.log("show res", filteredList);

    } else {
        filteredList = requestList.filter(item =>
            activeFilter.includes(item.name)
        );
        console.log("show res", filteredList);
    }

    return (
        <Aux>
            <RequestForm open={open} handleClickClose={setCloseForm} currentRequest={currentRequest} />

            <ConfirmDialog open={openConfirm}
                tilte="Delete Confirm" message={"Are your sure to delete this request:  " + currentRequest?._id} onAccess={() => requestDelete(currentRequest?._id)} onCancel={setCloseConfirmForm} />


            <Row className="pb-3">
                <Col className="text-left" md={6} xl={6}>
                    <Button variant="outline-secondary" onClick={() => setIsBasic(!isBasic)}>Filter Status</Button>
                    <Collapse in={isBasic}>
                        <Row>

                            <Col md={12}>

                                <div id="basic-collapse">
                                    <div>
                                        <Form className="text-dark">

                                            <input
                                                className="mx-1" type="checkbox"
                                                type="checkbox"
                                                onClick={() => onFilterChange("ALL")}
                                                checked={activeFilter.length === filterList.length}
                                            />
                                            <label className="mx-1" type="checkbox"
                                                htmlFor="myInput">All</label>

                                            {filterList.map(filter => (
                                                <React.Fragment className="f-15">

                                                    <input
                                                        className="mx-1" type="checkbox"
                                                        checked={activeFilter.includes(filter.name)}
                                                        onClick={() => onFilterChange(filter.name)}
                                                    />
                                                    <label htmlFor={filter.type}>{filter.name}</label>
                                                </React.Fragment>
                                            ))}
                                        </Form>

                                    </div>
                                </div>

                            </Col>


                        </Row>
                    </Collapse>

                </Col>
                <Col className="text-right justify-content-end" md={6} xl={6}>
                    <div className="text-right mb-3">
                        <Button className="mx-2" variant="primary" size="small" onClick={() => setOpenForm()}>
                            Create New Request
                        </Button>

                    </div>

                </Col>
            </Row>

            <Row>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>Daily Request</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> $248.95</h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">50%</p>
                                </div>
                            </div>
                            <div className="progress m-t-30" style={{ height: '7px' }}>
                                <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>Monthly Request</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-down text-c-red f-30 m-r-5" /> $2.942.32</h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">36%</p>
                                </div>
                            </div>
                            <div className="progress m-t-30" style={{ height: '7px' }}>
                                <div className="progress-bar progress-c-theme2" role="progressbar" style={{ width: '35%' }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100" />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>Total</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> $8.638.32</h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">70%</p>
                                </div>
                            </div>
                            <div className="progress m-t-30" style={{ height: '7px' }}>
                                <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '70%' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={12}>
                    <Card className='Recent-Users'>
                        <Card.Header>
                            <Card.Title as='h5'>Recent Checking Request</Card.Title>
                        </Card.Header>
                        <Card.Body className='px-0 py-2'>
                            <Table responsive hover>
                                <tbody>

                                    {
                                        filteredList.map(request =>

                                            <tr className="unread row">
                                                <td className="col-md-1 justify-content-center text-center d-flex align-items-center">
                                                    <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                                                </td>
                                                <td className="col-md-3 ">
                                                    <h6 className="mb-1"> {request.cabinetName} - Box {request.boxNum}</h6>
                                                    <p className="m-0 d-flex align-items-center">
                                                        {(request?.requestType == 0) && <span>Check Box</span>}
                                                        {(request?.requestType == 1) && <span>Check Connection</span>}
                                                        {(request?.requestType == 2) && <span>Check Expired Items</span>}
                                                        <span class="material-icons f-20 px-2">
                                                            assignment_ind
                                                        </span>

                                                        {request.userName}

                                                    </p>
                                                </td>
                                                <td className="col-md-2 d-flex align-items-center">
                                                    <h6 className="">

                                                        <i className={request.done == 1 ?
                                                            "fa fa-circle text-c-green f-10 m-r-15" :
                                                            "fa fa-circle text-c-red f-10 m-r-15"} />

                                                        {request.createdAt}

                                                    </h6>

                                                </td>
                                                <td className="col-md-2 d-flex align-items-center">
                                                    <span class="material-icons f-20 mr-2">
                                                        query_builder
                                                    </span>
                                                    {request.rentDuration}
                                                </td>
                                                <td className="col-md-2 d-flex align-items-center">
                                                    {request.statusName}
                                                </td>
                                                <td className="col-md-2 d-flex align-items-center">
                                                    {/* <Button size="small" className="label theme-bg2 text-white f-12" onClick={() => handleDelete(request)}>Delete</Button> */}
                                                    <Button size="small" className="label theme-bg text-white f-12" onClick={() => setOpenForm(request)}>More</Button>
                                                </td>
                                            </tr>


                                        )


                                    }

                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Aux>
    );

}

