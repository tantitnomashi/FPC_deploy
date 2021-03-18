import React, { useState, useEffect } from 'react';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch } from '@material-ui/core';
import { Row, Col, Button, Image, Form, FormControl, InputGroup } from 'react-bootstrap';
import API from '../../utils/adminApi'

export default function TransactionDetail(props) {
    var sapmle = require('../../sampleData/transactionStatus.json');

    const { open, handleClickClose, currentTransaction } = props;
    const [statusList, setStatusList] = useState(sapmle);
    const [selectedStatus, setSelectedStatus] = useState();






    const submitForm = () => {
        if (selectedStatus != '') {
            API.updateTransactionStatus(currentTransaction.id, selectedStatus).then((response) => {
                console.log("rs update status: ", response.data.statusCode);
            }).catch(e => console.log("update Status ERR", e))
        }
        setTimeout(handleClickClose, 200);
        // handleClickClose();
    }
    return (
        <div>

            <Dialog maxWidth={'xs'} fullWidth={true} className="dialog-userForm" open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> Change Status</DialogTitle>
                <DialogContent>

                    <Form>
                        <Form.Row>

                            <Col md={12} xl={12}>
                                <Form.Label column lg={12}>Status    </Form.Label>
                                <Form.Control as="select" defaultValue={currentTransaction?.status} custom
                                    onChange={(e) => {
                                        let text = e.target.value;
                                        setSelectedStatus(text)
                                        console.log("change status..from", text);

                                    }}
                                >

                                    {
                                        statusList.map(value =>
                                            <option value={value.status}>{value.statusName}</option>
                                        )
                                    }

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
