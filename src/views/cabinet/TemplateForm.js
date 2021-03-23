import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Image, Form, FormControl, InputGroup } from 'react-bootstrap';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import API from '../../utils/adminApi'

export default function TemplateForm(props) {
    const { open, handleClickClose, currentProfile } = props;
    const [type, setType] = useState(0);
    const [imagePreviewUrl, setImagePreviewUrl] = useState();
    const [boxAmount, setBoxAmount] = useState(4);
    const [arrBox, setArrBox] = useState([]);
    const loadAdminBoxSize = () => {
        API.getBoxSizes()
            .then((response) => {
                if (response.data.statusCode == 200) {
                    console.log('load size ', response.data.data);
                    setSize(response.data.data);
                } else {
                    alert('Cant get Cabi !')
                }
            }).catch(e => console.log(e + "hihi"));

    }
    const [size, setSize] = React.useState([]);

    useEffect(() => {
        loadAdminBoxSize();
    }, []);

    let demoType = [
        {
            name: 'type1', url: "https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/97269736_142953457288217_8401398378247749632_o.jpg?_nc_cat=101&ccb=3&_nc_sid=8bfeb9&_nc_ohc=kOiU3ULuLboAX_OpGWG&_nc_ht=scontent.fsgn5-1.fna&oh=e829f31e03c8abd9f7d4ab203390dc5d&oe=60612261",
        },

        {
            name: 'type1', url: "https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/97042505_532974404278525_4949978640755458048_n.jpg?_nc_cat=102&ccb=3&_nc_sid=b9115d&_nc_ohc=slymvmO6FzoAX9q-loe&_nc_ht=scontent.fsgn5-4.fna&oh=8fc98c52c54585cf868b8d94c704d4ef&oe=60610B59",
        },
        {
            name: 'type1', url: "https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/96421545_532974430945189_8328042359761666048_n.jpg?_nc_cat=100&ccb=3&_nc_sid=b9115d&_nc_ohc=BeHO91DYm-YAX-JcZPE&_nc_ht=scontent.fsgn5-5.fna&oh=2762401bd0544e4b7bfbf52cec7bc0a3&oe=6061C07A",
        }
    ]
    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {

            setImagePreviewUrl(reader.result);
        }

        reader.readAsDataURL(file)
    }
    const handleBoxAmountChange = (e) => {
        e.preventDefault();


        let amount = e.target.value;
        setBoxAmount(amount);

    }
    const handleAddBoxToCabinet = () => {
        let arr = [];

        for (var i = 0; i < boxAmount; i++) {

            let sampleDiv = <div>
                <Row className="py-2">

                    <Col md={3} xl={3} style={{
                        display: 'flex',
                        alignItems: "center",
                        fontSize: "1.2em"
                    }}>Box {i + 1} </Col>
                    <Col md={6} xl={4}>

                        <div className="btn-group" role="group">

                            <select id={"size" + i} class="form-select" aria-label="Default select example">
                                {

                                    size?.map((value, index) =>
                                        <option value={value.id} selected={index == 0 ? true : false}>{value.sizeName}</option>
                                    )
                                }
                            </select>
                        </div>
                    </Col>
                    <Col md={3} xl={4}>
                        <div className="btn-group d-flex align-items-center justify-content-start" role="group">
                            <label htmlFor={"position" + i} className="mr-2">Position</label>
                            <input type="text" className="form-control" name={'position' + i} id={"position" + i} />
                        </div>
                    </Col>
                </Row>

            </div>
            arr.push(sampleDiv);
        }

        setArrBox(arr);

    }

    const sumbitFormTemplate = () => {
        let boxConfigs = [];

        for (var i = 0; i < boxAmount; i++) {
            var e = document.getElementById("size" + i);
            var value = e.options[e.selectedIndex].value;
            let tmp = {
                boxSizeTypeId: parseInt(value),
                topLeftPosition: document.getElementById('position' + i).value,
                boxNum: i
            }
            boxConfigs.push(tmp);
        }

        let tmp = {
            name: document.getElementById('name').value,
            boxCnt: parseInt(boxAmount),
            rowsCnt: 3,
            colsCnt: 3,
            imgUrl: 'https://picsum.photos/300/400',
            boxConfigurations: boxConfigs,

        }
        console.log("### Box Configs:", tmp);
        API.createCabinetTemplate(tmp).then((response) => {
            console.log("create: ", response.data.statusCode);
        }).catch(e => console.log("###create Cabinet Template ERR", e));

        handleClickClose();
    }


    console.log(currentProfile);

    return (

        <Dialog maxWidth={'lg'} fullWidth={true} className="dialog-userForm" open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{currentProfile ? "Update" : "Create Cabinet"}</DialogTitle>
            <div>

            </div>
            <DialogContent>
                <DialogContentText   >
                    To {currentProfile ? "update" : "create"} Cabinet, please fill all fields below.
                            </DialogContentText>

                <Form>
                    <Row>

                        <Col md={8} xl={7}>
                            <Form.Label column lg={12}>Name </Form.Label>
                            <Form.Control className="my-1" id="name" name="cabinet-name"
                                label="Name"
                                type="Text" placeholder="" />

                            <Form.Label column lg={12}>Box Amount</Form.Label>
                            <Form.Control className="my-1" id="base-price" onChange={(e) => handleBoxAmountChange(e)}
                                type="number" min="1" name="base-price" />

                            <Button onClick={handleAddBoxToCabinet} variant="dark">
                                Generate
                                 </Button>

                            <div style={{ overflowY: 'scroll', overflowX: 'hidden', maxHeight: '400px' }}>
                                {
                                    arrBox.map((value, index) => value)
                                }
                            </div>



                        </Col>
                        {/* <Col md={4} xl={5}>

                            <img src={imagePreviewUrl} size='sm'
                                style={{ width: '600px', height: '380px', objectFit: 'scale-down' }}
                            />

                            <div>
                                <Form.Group>
                                    <Form.File
                                        onChange={(e) => { handleImageChange(e) }}
                                        variant="secondary" id="chooseFile" label="Upload template image" />
                                </Form.Group>

                            </div>

                        </Col> */}

                        <Col md={4} xl={5}>

                            <img src={imagePreviewUrl} size='sm'
                                style={{ width: '600px', height: '380px', objectFit: 'scale-down' }}
                            />

                            <div>
                                <Form.Group>
                                    <Form.File
                                        onChange={(e) => { handleImageChange(e) }}
                                        variant="secondary" id="chooseFile" label="Upload template image" />
                                </Form.Group>

                            </div>

                        </Col>

                    </Row>


                </Form>
            </DialogContent >


            <DialogActions>
                <Button onClick={handleClickClose} variant="secondary">
                    Cancel
              </Button>
                <Button className='px-4' onClick={sumbitFormTemplate} variant="dark">
                    Save
              </Button>
            </DialogActions>
        </Dialog >
    );
}
