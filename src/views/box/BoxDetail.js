import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Tabs, Tab, Button } from 'react-bootstrap';
import API from '../../utils/adminApi'
import Aux from "../../hoc/_Aux";


export default function BoxSize(props) {
    const { handleDetail, id, w, h, bgColor, item, boxes } = props;


    console.log("boxes", boxes, id);

    return (

        <div
            className={"p-1 m-1 d-flex align-items-center justify-content-center font-weight-light  " + bgColor}
            style={{ width: `${w + 100}px`, height: `${h + 100}px`, border: '0.5px solid black' }}
            onClick={() => {
                console.log("in detail", boxes);
                handleDetail(id, boxes)
            }}

        >
            <div className="row d-flex">
                <div className="text-center w-100 h-100" >
                    <div className="text-dark text-center d-flex align-items-center justify-content-center  f-20">
                        {(item?.status == 0) && <span class="material-icons">lock</span>}
                        {(item?.status == 1) && <span class="material-icons"> lock_open </span>}
                        {(item?.status == 2) && <span class="material-icons">gavel</span>}
                        {(item?.status == 3) && <span class="material-icons">verified_user</span>}


                    </div>
                    <div className="text-dark text-center f-20 font-weight-bold" >
                        {` Box ${item.boxNum}`}

                    </div>
                    <div className="text-dark text-center f-20" >
                        {(item?.rentingStatus == 0) && 'FREE'}
                        {(item?.rentingStatus == 1) && 'RENTING'}
                        {(item?.rentingStatus == 2) && 'EXPIRED'}

                    </div>
                </div>
            </div>
        </div>


    );
}