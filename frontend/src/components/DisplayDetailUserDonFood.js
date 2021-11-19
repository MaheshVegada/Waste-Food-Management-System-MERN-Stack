/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
import React, {useState, useContext} from 'react';
import { Spinner, Button, Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useHttpClient } from '../hooks/http-hook';
import Moment from 'react-moment';
import { AuthContext } from "../context/auth-context";
import {BASE_API_URL} from '../api/api';

const DisplayDetailUserDonFood = props => {
    const auth = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [rejmessage, setrejmessage] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { sendRequest } = useHttpClient();
    const history = useHistory();
    let foodId;
    if (props.items.food.status === false) foodId = props.items.recdetail.foodId;
    else props.items.receiver = true;
    let print = false;
    if (props.items.receiver === true) print = true;

    function reject() {
        try {
            const responseData = sendRequest(
                BASE_API_URL+'/cancelledfood',
                'POST',
                JSON.stringify({
                    foodId,
                    rejmessage
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            history.push('/reqforfood');
        }
        catch (err) {
        }
    }

    function accept() {
        try {
            const responseData = sendRequest(
                BASE_API_URL+'/receivedfood',
                'POST',
                JSON.stringify({
                    foodId
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            history.push('/userdonfood');
        }
        catch (err) {
        }
    }

    return (
        <div>
            {/* food information */}
            <div className="container card mt-5 mb-5">
                <div className="row my-2">
                    <div className="col-lg-4 order-lg-1 text-center mt-4">
                        <div className="container mt-3">
                            <img src={props.items.food.Url} className="mx-auto img-fluid img-circle d-block" alt="avatar" />
                        </div>
                        <h3 className="mt-2">{props.items.food.name}</h3>
                    </div>
                    <div className="col-lg-8 order-lg-2 mt-3">
                        <div className="tab-content py-4">
                            <div className="tab-pane active" id="viewprofile">
                                <div className="row">
                                    <div className="col-md-12">
                                        <p><strong>Food Name : </strong>{props.items.food.name}</p>
                                        <p><strong>Function Name : </strong>{props.items.food.funcname}</p>
                                        <p><strong>Food Type : </strong>{props.items.food.foodtype}</p>
                                        <p><strong>Food Description : </strong>{props.items.food.description}</p>
                                        <p><strong>Donator Contact No : </strong>{props.items.food.mobile}</p>
                                        <p><strong>Food Quality : </strong>{props.items.food.quality}, <strong>Food Quantity : </strong>{props.items.food.quantity}</p>
                                        <p><strong>Food Cooked Time : </strong>
                                            <Moment format=" DD/MM  hh:mm A">
                                                {props.items.food.cookedtime}
                                            </Moment>, <strong>Food Expiry Time : </strong>
                                            <Moment format=" DD/MM  hh:mm A">
                                                {props.items.food.expirytime}
                                            </Moment></p>
                                        <p><strong>Food Address : </strong>{props.items.food.address}, {props.items.food.city}, {props.items.food.state}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane" id="editprofile">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            {print ?
                <div>
                    <div className="mt-5 mb-5 text-center">
                        <h4>
                            <Spinner
                                animation="border"
                                size="sm"
                                className="mb-1"
                            />{' '}
                            <strong>No one has yet requested for this food</strong>
                            {' '}<Spinner
                                animation="border"
                                size="sm"
                                className="mb-1"
                            />
                        </h4>
                    </div>
                </div> :
                <div>
                    {props.items.food.received ?
                        <div className="mt-5 mb-5 text-center">
                            <h5>
                                <Spinner
                                    animation="grow"
                                    size="sm"
                                    className="mb-1"
                                />{' '}
                                <strong>Congratulations </strong>Recipient <strong>{props.items.receiver.fullname}</strong> has successfully Collected your food
                                {' '}<Spinner
                                    animation="grow"
                                    size="sm"
                                    className="mb-1"
                                />
                            </h5>
                        </div> :

                        <div className="mt-5 mb-5 text-center">
                            <h5>
                                <strong>{props.items.receiver.fullname} </strong> has requested to receive this food. Kindly update status
                            </h5>
                            <a href="/userdonfood"><Button variant="primary" onClick={accept}>Collected</Button></a>{' '}
                            <Button variant="danger" onClick={handleShow}>Find another receiver</Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Why food wasn't collected by receiver?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body><textarea id="rejmess" name="rejmess" rows="3" cols="62"
                                value={rejmessage} onChange={(e) => setrejmessage(e.target.value)} required/></Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="danger" onClick={reject}>
                                        Send
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    }
                </div>
            }

            <hr />

            {/* Donator information */}
            {print ? <span></span> : <span>
                {!props.items.food.status ? <div className="row mt-5">
                    <div className="col-2 text-center"></div>
                    <div className="col-3 card mb-5">
                        <h3 className="text-danger text-center mt-4 mb-4">Donor Information</h3>
                        <p className="text-center"><img src={props.items.donator.Url} alt="image" style={{ width: 200, height: 200 }} /></p>
                        <p className="mt-4"><strong>FullName : </strong>{props.items.donator.fullname}</p>
                        <p><strong>Email : </strong>{props.items.donator.email}</p>
                        <p><strong>Contact No : </strong>{props.items.donator.mobile}</p>
                        <p><strong>Gender : </strong>{props.items.donator.gender}</p>
                        <p><strong>Type : </strong>{props.items.donator.type}</p>
                        <p><strong>Address : </strong>{props.items.donator.city}, {props.items.donator.state}</p>
                    </div>
                    {/* extra div for designing */}
                    <div className="col-2 text-center"></div>
                    {/* receiver information */}
                    <div className="col-3 card mb-5">
                        <h3 className="text-danger text-center mt-4 mb-4">Recipient Information</h3>
                        <p className="text-center"><img src={props.items.receiver.Url} alt="image" style={{ width: 200, height: 200 }} /></p>
                        <p className="mt-4"><strong>FullName : </strong>{props.items.receiver.fullname}</p>
                        <p><strong>Email : </strong>{props.items.receiver.email}</p>
                        <p><strong>Contact No : </strong>{props.items.receiver.mobile}</p>
                        <p><strong>Gender : </strong>{props.items.receiver.gender}</p>
                        <p><strong>Type : </strong>{props.items.receiver.type}</p>
                        <p><strong>Address : </strong>{props.items.receiver.city}, {props.items.receiver.state}</p>
                    </div>
                    <div className="col-2 text-center"></div>
                </div> :
                    <h5>No one has yet requested for this food</h5>
                }</span>}
        </div>
    );
};

export default DisplayDetailUserDonFood;
