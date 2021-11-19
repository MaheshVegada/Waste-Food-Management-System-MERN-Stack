/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Spinner } from 'react-bootstrap';
import Moment from 'react-moment';

const DisplayDetailUserRecFood = props => {

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

            <hr/>

            {props.items.food.received ? <div className="mt-5 mb-5 text-center">
                    <h5>
                    <Spinner
                        animation="grow"
                        size="sm"
                        className="mb-1"
                    />{' '}
                    <strong>Congratulations </strong>You have performed one more good deed. Keep up the good work.
                    {' '}<Spinner
                        animation="grow"
                        size="sm"
                        className="mb-1"
                    />
                </h5>
            </div> : 

            <div className="mt-5 mb-5 text-center">
                <h5>
                <Spinner
                        animation="border"
                        size="sm"
                        className="mb-1"
                    />{' '}
                    You are expected to reach there before 
                    <strong><Moment format=" DD/MM  hh:mm A">
                        {props.items.recdetail.exptime}
                    </Moment></strong>
                    {' '}to collect the food or else your Request will be Rejected{' '}
                    <Spinner
                        animation="border"
                        size="sm"
                        className="mb-1"
                    />{' '}
                </h5>
            </div>}

            <hr/>

            {/* Donator information */}
            <div className="row mt-5">
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
                <div className="col-2 text-center"></div>
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
            </div>
        </div >
    );
};

export default DisplayDetailUserRecFood;
