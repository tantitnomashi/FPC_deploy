import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Image, Form, FormControl, InputGroup } from 'react-bootstrap';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function UserForm(props) {
    const { open, handleClickClose, currentCabinet } = props;
    const [type, setType] = useState(0);
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


    console.log(currentCabinet);

    return (
        <div>

            <Dialog maxWidth={'lg'} className="dialog-userForm" open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{currentCabinet ? "Update" : "Create Cabinet"}</DialogTitle>
                <DialogContent>
                    <DialogContentText fullWidth >
                        To {currentCabinet ? "update" : "create"} Cabinet, please fill all fields below.
                            </DialogContentText>

                    <Form>
                        <Form.Row>

                            <Col md={6} xl={6}>
                                <Form.Label column lg={12}>Name    </Form.Label>
                                <Form.Control className="my-1" id="name"
                                    label="Name"
                                    type="Text" placeholder="" />

                                <Form.Label column lg={12}>Address    </Form.Label>

                                <InputGroup className="my-1 mb-2" id="address">

                                    <FormControl id="inlineFormInputGroup" name='location' placeholder="" />
                                    <InputGroup.Append>
                                        <InputGroup.Text><span class="material-icons">room</span></InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>

                                <Form.Label column lg={12}>Base Price</Form.Label>
                                <Form.Control className="my-1" id="base-price"
                                    type="number" min="1" />


                                {/* <div style={{ border: '1px solid darkblue', background: 'none', color: 'darkblue', width: '100%', padding: '30px' }}>

                                <h4>Boxs </h4>
                                <div>
                                    
                                </div>
                                <Button style={{ border: '2px dashed darkblue', background: 'none', color: 'darkblue', width: '100%', height: '50px' }}>
                                    <span class="material-icons" style={{ verticalAlign: 'middle' }}>add</span>
                                    <span style={{ verticalAlign: 'middle' }}> Add box</span>
                                </Button>
                            </div> */}


                                <DialogActions>
                                    <Button onClick={handleClickClose} variant="secondary">
                                        Cancel
                                    </Button>
                                    <Button className='px-4' onClick={handleClickClose} color="primary">
                                        Save
                                      </Button>
                                </DialogActions>

                            </Col>
                            <Col md={6} xl={6}>
                                <div>
                                    <Image size='sm' src={demoType[type].url} fluid />
                                </div>
                                <div>
                                    <p>Choose cabinet template</p>
                                    <div>
                                        {demoType.map((value, index) =>
                                            <div style={{
                                                position: 'relative', display: 'inline-block', width: '80px', height: '50px', marginRight: '3px'
                                            }} onClick={() => setType(index)}>
                                                <img width='80' src={value.url} fluid />

                                                {type == index && <div style={{ position: 'absolute', top: '0', right: '0', color: 'greenyellow' }}>
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
