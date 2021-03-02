import React, { useState } from 'react';
import { Row, Col, Card, Table, Tabs, Tab, Button } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import CabinetForm from './CabinetForm';
import CabinetTempalteForm from './TemplateForm';
import ConfirmDialog from '../commonComponent/confirm';
import TemplateForm from './TemplateForm';

var test = require('../../sampleData.json');

export default function Dashboard() {

    console.log(test[0].age + "aaaa");



    const [users, setUser] = React.useState(test);

    const [open, setOpen] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [openTemplate, setOpenTemplate] = React.useState(false);

    const [currentCabinet, setCurrentProfile] = React.useState(null);

    const setOpenForm = (currentCabinet) => {
        setOpen(true);
        setCurrentProfile(currentCabinet);
    };

    const setOpenTemplateForm = () => {
        setOpenTemplate(true);
    };

    const setCloseForm = () => {
        setOpen(false);
        setOpenConfirm(false);
        setOpenTemplate(false);
    };


    let demoProfile = {
        fullName: "Tran Minh Tan",
        username: "tantitnomashi"
    }

    const handleDelete = (currentCabinet) => {
        setOpenConfirm(true);
        if (currentCabinet) {
            setCurrentProfile(currentCabinet);
        } else {
            setCurrentProfile(null);
        }
    }
    const requestDelete = (username) => {
        setTimeout(() => {

            setOpenConfirm(true);
        }, 2000);
    }
    const tabContent = (
        <Aux>
            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table">
                    <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></a>
                </div>
                <div className="media-body">
                    <h6 className="m-0 d-inline">Silje Larsen</h6>
                    <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green" />3784</span>
                </div>
            </div>
            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table">
                    <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></a>
                </div>
                <div className="media-body">
                    <h6 className="m-0 d-inline">Julie Vad</h6>
                    <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green" />3544</span>
                </div>
            </div>
            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table">
                    <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" /></a>
                </div>
                <div className="media-body">
                    <h6 className="m-0 d-inline">Storm Hanse</h6>
                    <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red" />2739</span>
                </div>
            </div>
            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table">
                    <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></a>
                </div>
                <div className="media-body">
                    <h6 className="m-0 d-inline">Frida Thomse</h6>
                    <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red" />1032</span>
                </div>
            </div>
            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table">
                    <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></a>
                </div>
                <div className="media-body">
                    <h6 className="m-0 d-inline">Silje Larsen</h6>
                    <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green" />8750</span>
                </div>
            </div>
            <div className="media friendlist-box align-items-center justify-content-center">
                <div className="m-r-10 photo-table">
                    <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" /></a>
                </div>
                <div className="media-body">
                    <h6 className="m-0 d-inline">Storm Hanse</h6>
                    <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red" />8750</span>
                </div>
            </div>
        </Aux>
    );
    return (



        <Aux>
            <CabinetForm open={open} handleClickClose={setCloseForm} currentCabinet={currentCabinet} />
            <TemplateForm open={openTemplate} handleClickClose={setCloseForm} />

            <ConfirmDialog open={openConfirm}
                tilte="Delete Confirm" message={"Are your sure to delete " + currentCabinet?.fullName} onAccess={() => requestDelete(currentCabinet?.username)} onCancel={setCloseForm} />
            <Row>
                <Col md={6} xl={8}>

                </Col>

                <Col md={6} xl={4}>
                    <div className="text-right mb-3">
                        <Button className="mx-2" size="small" onClick={() => setOpenForm()}>
                            Create Cabinet
                        </Button>
                        <Button className="mx-2" size="small" variant="dark" onClick={() => setOpenTemplateForm()}>
                            Template Mangement
                        </Button>

                    </div>


                </Col>
            </Row>
            <Row>

                <Col md={6} xl={12}>
                    <Card className='Cabinet List'>
                        <Card.Header>
                            <Card.Title as='h5'>Cabinet List</Card.Title>
                        </Card.Header>
                        <Card.Body className='px-0 py-2'>
                            <Table responsive hover>
                                <tbody>
                                    {console.log(users)}
                                    {
                                        users.map(user =>
                                            <tr className="unread">
                                                <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></td>
                                                <td>
                                                    <h6 className="mb-1">{user.name}</h6>
                                                    <p className="m-0">{user.email}</p>
                                                </td>
                                                <td>
                                                    <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{user.registered}</h6>
                                                </td>
                                                <td>
                                                    <Button size="small" className="label theme-bg2 text-white f-12" onClick={() => handleDelete(user)}>Delete</Button>
                                                    <Button size="small" className="label theme-bg text-white f-12" onClick={() => setOpenForm(user)}>Details</Button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></td>
                                        <td>
                                            <h6 className="mb-1">Tan Tran M.</h6>
                                            <p className="m-0">Description of the header…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />11 MAY 12:56</h6>
                                        </td>
                                        <td>
                                            <Button size="small" className="label theme-bg2 text-white f-12" onClick={() => handleDelete(demoProfile)}>Delete</Button>
                                            <Button size="small" className="label theme-bg text-white f-12" onClick={() => setOpenForm(demoProfile)}>Details</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} xl={6}>
                    <Card className='card-social'>
                        <Card.Body className='border-bottom'>
                            <div className="row align-items-center justify-content-center">
                                <div className="col-auto">
                                    <i className="fa fa-users text-c-black f-36" />
                                </div>
                                <div className="col text-right">
                                    <h3>11,200</h3>
                                    <h5 className="text-c-purple mb-0">+6.2% <span className="text-muted">Total Users</span></h5>
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Body>
                            <div className="row align-items-center justify-content-center card-active">
                                <div className="col-6">
                                    <h6 className="text-center m-b-10"><span className="text-muted m-r-5">User Active:</span>2,650</h6>
                                    <div className="progress">
                                        <div className="progress-bar progress-c-green" role="progressbar" style={{ width: '40%', height: '6px' }} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Customer Retention:</span>800</h6>
                                    <div className="progress">
                                        <div className="progress-bar progress-c-blue" role="progressbar" style={{ width: '70%', height: '6px' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" />
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className='card-social'>
                        <Card.Body className='border-bottom'>
                            <div className="row align-items-center justify-content-center">
                                <div className="col-auto">
                                    <i className="fa fa-google-plus text-c-red f-36" />
                                </div>
                                <div className="col text-right">
                                    <h3>10,500</h3>
                                    <h5 className="text-c-blue mb-0">+5.9% <span className="text-muted">Total Likes</span></h5>
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Body>
                            <div className="row align-items-center justify-content-center card-active">
                                <div className="col-6">
                                    <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Target:</span>25,998</h6>
                                    <div className="progress">
                                        <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '80%', height: '6px' }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>900</h6>
                                    <div className="progress">
                                        <div className="progress-bar progress-c-theme2" role="progressbar" style={{ width: '50%', height: '6px' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" />
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} xl={8} className='m-b-30'>
                    {/* <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
                        <Tab eventKey="today" title="Today">
                            {tabContent}
                        </Tab>
                        <Tab eventKey="week" title="This Week">
                            {tabContent}
                        </Tab>
                        <Tab eventKey="all" title="All">
                            {tabContent}
                        </Tab>
                    </Tabs> */}
                </Col>
            </Row>
            {/* <Modal open={openForm}> */}
            {/* </Modal> */}

        </Aux>
    );
}