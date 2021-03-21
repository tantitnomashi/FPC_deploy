import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Tabs, Tab, Button } from 'react-bootstrap';
import API from '../../utils/adminApi'

import Aux from "../../hoc/_Aux";
import BoxSizeForm from '../boxsize/BoxSizeForm';
import ConfirmDialog from './ActionDialog';
import { element } from 'prop-types';


export default function BoxSize({ match }) {

    const cabinetId = match.params.id;

    // list box from Api 
    const [boxes, setBoxes] = React.useState([]);

    const [open, setOpen] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);

    const [currentBox, setcurrentBox] = React.useState(null);
    const [currentCabinet, setCurrentCabinet] = React.useState(null);
    const [dataTemplateArr, setDataTempleteArr] = useState([]);

    //demo obj 
    let tmp = {
        id: 1016,
        boxCnt: 9,
        createdAt: "2021-03-16T22:37:23.067",
        updatedAt: "2021-03-16T22:37:23.067",
        rowsCnt: 5,
        colsCnt: 3,
        imgUrl: "nothing to show",
        boxConfigurations: [
            {
                id: 1124,
                topLeftPosition: "1,1",
                boxNum: 1,
                boxSizeType: {
                    id: 1016,
                    sizeName: "Small",
                    virtualWidth: 1,
                    virtualHeight: 1,
                    actualWidth: 30,
                    actualHeight: 30,
                    priceWeight: 1.2
                }
            },
            {
                id: 1125,
                topLeftPosition: "1,2",
                boxNum: 2,
                boxSizeType: {
                    id: 1017,
                    sizeName: "Medium Potrait",
                    virtualWidth: 1,
                    virtualHeight: 2,
                    actualWidth: 30,
                    actualHeight: 60,
                    priceWeight: 1.7
                }
            },
            {
                id: 1126,
                topLeftPosition: "1,3",
                boxNum: 3,
                boxSizeType: {
                    id: 1017,
                    sizeName: "Medium Potrait",
                    virtualWidth: 1,
                    virtualHeight: 2,
                    actualWidth: 30,
                    actualHeight: 60,
                    priceWeight: 1.7
                }
            },
            {
                id: 1127,
                topLeftPosition: "2,1",
                boxNum: 4,
                boxSizeType: {
                    id: 1019,
                    sizeName: "Large Potrait",
                    virtualWidth: 1,
                    virtualHeight: 3,
                    actualWidth: 30,
                    actualHeight: 90,
                    priceWeight: 2.2
                }
            },
            {
                id: 1128,
                topLeftPosition: "4,2",
                boxNum: 5,
                boxSizeType: {
                    id: 1016,
                    sizeName: "Small",
                    virtualWidth: 1,
                    virtualHeight: 1,
                    actualWidth: 30,
                    actualHeight: 30,
                    priceWeight: 1.2
                }
            },
            {
                id: 1129,
                topLeftPosition: "4,3",
                boxNum: 6,
                boxSizeType: {
                    id: 1016,
                    sizeName: "Small",
                    virtualWidth: 1,
                    virtualHeight: 1,
                    actualWidth: 30,
                    actualHeight: 30,
                    priceWeight: 1.2
                }
            },
            {
                id: 1130,
                topLeftPosition: "5,1",
                boxNum: 7,
                boxSizeType: {
                    id: 1016,
                    sizeName: "Small",
                    virtualWidth: 1,
                    virtualHeight: 1,
                    actualWidth: 30,
                    actualHeight: 30,
                    priceWeight: 1.2
                }
            },
            {
                id: 1131,
                topLeftPosition: "5,2",
                boxNum: 8,
                boxSizeType: {
                    id: 1016,
                    sizeName: "Small",
                    virtualWidth: 1,
                    virtualHeight: 1,
                    actualWidth: 30,
                    actualHeight: 30,
                    priceWeight: 1.2
                }
            },
            {
                id: 1132,
                topLeftPosition: "5,3",
                boxNum: 9,
                boxSizeType: {
                    id: 1016,
                    sizeName: "Small",
                    virtualWidth: 1,
                    virtualHeight: 1,
                    actualWidth: 30,
                    actualHeight: 30,
                    priceWeight: 1.2
                }
            }
        ]
    }

    //demo => 
    const [exampleTemplate, setExampleTemplate] = useState(tmp);

    useEffect(() => {
        console.log("### Reload data..")
        loadBoxesInCabinet();
    }, []);

    const loadBoxesInCabinet = () => {
        API.getTemplateByCabinetId(cabinetId)
            .then((response) => {

                if (response.data.statusCode == 200) {
                    // force setting current Example immediately
                    console.log("##Checklist current example", response.data.data);
                    //setCurrentExample(response.data.data);

                    //print --> true 
                    setExampleTemplate(response.data.data);

                    API.getBoxesInCabinet(cabinetId)
                        .then((response) => {
                            if (response.data.statusCode == 200) {
                                console.log("##Checklist", response.data.data);
                                setBoxes(response.data.data);
                                let dataView = generateView(response.data.data);
                                setDataTempleteArr(dataView);
                            } else {
                                alert('Cant get Boxes in Cabinet !')
                            }
                        }).catch(e => console.log("ERR Box in Cabinet", e));

                } else {
                    alert('Cant get Template  !')
                }
            }).catch(e => console.log("ERR Cabinet Template", e));


        //get template




    }






    // for generate view




    const setOpenForm = (currentBox) => {
        setOpen(true);
        setcurrentBox(currentBox);
    };


    const setCloseForm = () => {
        setOpen(false);
        setOpenConfirm(false);
    };

    const setCurrentB = (obj) => {
        if (obj) {
            setcurrentBox(obj);
        }
    }
    const setCurrentExample = (arr) => {
        if (arr.length) {
            setExampleTemplate(arr);
        }
    }


    const handleDetail = (boxId) => {

        // boxes is emty
        console.log("NNN", boxes)
        boxes.map(element => console.log("$$$", element.id));
        const found = boxes.find(element =>
            element.id == boxId
        );
        alert("box" + boxId);

        if (found) {
            setCurrentB(found);
        } else {
            setCurrentB(null);
        }
        setOpenConfirm(true);


    }



    const requestDelete = () => {
        API.deleteBoxSize(currentBox.id)
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

    const generateView = (items) => {
        let view = [];
        let data4View = [];
        for (let i = 0; i < exampleTemplate.colsCnt; i++) {
            view.push([]);
            data4View.push([]);
        }
        console.log("Boxes", boxes);
        console.log("##Checklist current example", exampleTemplate);

        exampleTemplate.boxConfigurations.map((c) => {
            let index = c.topLeftPosition.indexOf(",");
            let top = parseInt(c.topLeftPosition.substr(0, index), 10);
            let left = parseInt(c.topLeftPosition.substr(index + 1, c.topLeftPosition.length), 10);

            let boxView = data4View[left - 1];
            let numBox = (c.boxSizeType.actualHeight) / 30;
            boxView.push({
                id: c.id,
                name: c.topLeftPosition,
                sizeName: c.boxSizeType.sizeName,
                top: top,
                numBox: numBox,
                w: c.boxSizeType.actualWidth,
                h: c.boxSizeType.actualHeight
            });

        });

        data4View.map((e, i) => {
            let currentIndex = 1;
            e.map((e1, iArr) => {
                let boxView = view[i];
                let indexTmp = e1.numBox;
                if (e1.top != currentIndex) {
                    for (let iL = 0; iL < e1.top - currentIndex; iL++) {

                        boxView.push(Box(null, iArr, 30, 30));
                    }
                    currentIndex = e1.top;
                }
                currentIndex += indexTmp;
                if (e1.sizeName === "Large Potrait") {
                    e1.h *= 3.05;
                }
                if (e1.sizeName === "Medium Potrait") {
                    e1.h *= 2.4;
                }
                boxView.push(Box(items, e1, e1.w, e1.h));
            })
        });
        return view;
    }

    const Box = (boxNums, e, w, h) => {
        if (e?.id && boxNums?.length > 2) {
            return <div key={e.id}>
                {boxNums?.map((item) => {
                    let bgColor = item.rentingStatus === 1 ? "bg-warning" : item.rentingStatus === 2 ? "bg-danger" : "bg-primary"

                    if (e.id == item.positionId) {
                        return <div
                            id={item.id}
                            className={"p-1 m-1 d-flex align-items-center justify-content-centern " + bgColor}
                            style={{ width: `${w + 100}px`, height: `${h + 100}px`, border: '0.5px solid black' }}
                            onClick={() => handleDetail(item.id)}

                        >
                            <div className="row d-flex">
                                <div className="text-center w-100 h-100" >
                                    <div className="text-dark text-center f-20">
                                        {`Box ${item.boxNum}`}

                                    </div>
                                    <div className="text-dark text-center f-20" >
                                        {item.rentingStatus === 1 ? "RENTING" : item.rentingStatus === 2 ? "EXPIRED" : "FREE"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    } else {
                        return null;
                    }
                })
                }
            </div>
        } else {
            return <div className="p-1 m-1 d-flex align-items-center justify-content-center" id={e.id} style={{ width: `${w + 100}px`, height: `${h + 96}px`, border: '0.5px solid black', backgroundColor: 'grey' }}>

            </div>
        }
    }












    return (


        < Aux >
            <div className="d-flex flex-row">
                {
                    dataTemplateArr.map((e, i) => (
                        <div key={i}>
                            {e.map((b) => b)}
                        </div>
                    ))
                }
            </div>


            <ConfirmDialog open={openConfirm}
                tilte="Box Detail " currentBox={currentBox} message={"Choose action for this box " + currentBox?.boxNum} onAccess={setCloseForm} onCancel={setCloseForm} />

            {/* <Row>

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




            </Row> */}

        </Aux >
    );
}