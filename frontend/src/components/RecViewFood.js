/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { AuthContext } from '../context/auth-context';
import { useHistory } from "react-router-dom";
import { useHttpClient } from '../hooks/http-hook';
import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import MapFood from './MapFood';
import {BASE_API_URL} from '../api/api';

const RecViewFood = props => {

    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();

    let message = "";
    const [showmessage, setshowmessage] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const history = useHistory();
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [mobile, setmobile] = useState("");
    const [address, setaddress] = useState("");
    const [city, setcity] = useState("");
    const [state, setstate] = useState("");
    const [exptime, setexptime] = useState("");

    let donId;
    function checkId() {
        donId = props.items.userId;
        if (donId !== auth.userId) return true;
        return false;
    }


    const postdata = async (e) => {
        e.preventDefault();
        message = "";

        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + "-"
            + (currentdate.getMonth() < 10 ? "0" : "") + (currentdate.getMonth() + 1) + "-"
            + (currentdate.getDate() < 10 ? "0" : "") + currentdate.getDate() + "T"
            + (currentdate.getHours() < 10 ? "0" : "") + currentdate.getHours() + ":"
            + (currentdate.getMinutes() < 10 ? "0" : "") + currentdate.getMinutes();
        const dateIsSame = moment(datetime).isAfter(moment(exptime));
        const dateIsBefore = moment(props.items.cookedtime).isBefore(moment(exptime));
        const dateIsAfter = moment(props.items.expirytime).isAfter(moment(exptime));
        if (!dateIsBefore) message = message + "Your Expected Time to reach is earlier than Cooked time";
        if (!dateIsAfter) message = message + "Your Expected Time to reach exceeds Expiry time";
        if (dateIsSame && dateIsBefore) message = message + "Your Expected Time to reach is earlier than Current time";
        setshowmessage(message);
        if (message.length !== 0) {
            setShow(true);
        }
        else{
            try {
                const responseData = await sendRequest(
                    BASE_API_URL+'/acceptfood',
                    'POST',
                    JSON.stringify({
                        donId,
                        foodId: props.items.foodId,
                        name,
                        email,
                        mobile,
                        address,
                        exptime
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
    };

    return (
        <div>
            {checkId() && <div className=" ml-5 mt-5 mr-5">
                <div className="row">
                    <div className="col-6 card mb-5">
                        <MapFood items={props.items.coor} />
                    </div>
                    <div className="col-1"></div>
                    <div className="col-5 card mb-5">
                        <h3 className="text-danger text-center">Enter your details to receive {props.items.name}</h3>
                        <form className="row g-3" onSubmit={postdata}>
                            <div className="col-md-6 mt-2">
                                <label htmlFor="inputfirst4" className="form-label">Full Name</label>
                                <input type="text" className="form-control" id="inputfirst4" value={name}
                                    onChange={(e) => setname(e.target.value)} />
                            </div>
                            <div className="col-md-6 mt-2">
                                <label htmlFor="inputEmail4" className="form-label">Email</label>
                                <input type="email" className="form-control" id="inputEmail4" value={email}
                                    onChange={(e) => setemail(e.target.value)} />
                            </div>
                            <div className="col-md-6 mt-2">
                                <label htmlFor="phone" className="form-label">Mobile No</label>
                                <input type="tel" className="form-control" id="mobile" maxLength="10" value={mobile}
                                    onChange={(e) => setmobile(e.target.value)} />
                            </div>
                            <div className="col-md-6 mt-2">
                                <label htmlFor="exptime" className="form-label">Expected Reaching Time</label>
                                <input type="datetime-local" className="form-control" id="exptime" value={exptime}
                                    onChange={(e) => setexptime(e.target.value)} />
                            </div>
                            <div className="col-md-12 mt-2">
                                <label htmlFor="address1" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address1" value={address}
                                    onChange={(e) => setaddress(e.target.value)} />
                            </div>
                            <div className="col-md-6 mt-2">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" className="form-control" id="city" value={city}
                                    onChange={(e) => setcity(e.target.value)} />
                            </div>
                            <div className="col-md-6 mt-2">
                                <label htmlFor="state" className="form-label">State</label>
                                <input type="text" className="form-control" id="state" value={state}
                                    onChange={(e) => setstate(e.target.value)} />
                            </div>

                            <div>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className="text-danger">Invalid Time Entry!!!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body><p>{showmessage}</p></Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="danger" onClick={handleClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>

                            <div className="col-md-12 text-center mt-4">
                                <div className="container mt-1 mb-0 text-center text-danger" id="msg"></div>
                                <button type="submit" className="btn btn-danger align-self-center mt-2">Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default RecViewFood;