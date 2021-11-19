/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { AuthContext } from '../context/auth-context';
import { useHistory } from "react-router-dom";
import { useHttpClient } from '../hooks/http-hook';
import { Button, Modal, Carousel } from 'react-bootstrap';
import {BASE_API_URL} from '../api/api';
import moment from 'moment';
import image7 from '../images/image7.png';
import image8 from '../images/image88.jpg';
import MapNew from "../components/MapNew";
require('dotenv').config();

function Donate() {

  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  let message = "";
  const [showmessage, setshowmessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const history = useHistory();
  const [funcname, setfuncname] = useState("");
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState("");
  const [quality, setquality] = useState("5");
  const [foodtype, setFoodType] = useState("Beverage");
  const [cookedtime, setcookedtime] = useState("");
  const [expirytime, setexpirytime] = useState("");
  const [image, setimage] = useState("");
  const [Url, setUrl] = useState("");
  const [map, setMap] = useState({});

  const handleChange = (e) => {
    setquality(e.target.value)
  }

  const handleChangeType = (e) => {
    setFoodType(e.target.value)
  }

  const mapChangeType = (e) => {
    setMap(e)
  }

  function setMapValue(data) {
    mapChangeType(data);
  }

  async function postDetails() {
    
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.REACT_APP_IMG_UPLOAD);
    data.append("cloud_name", process.env.REACT_APP_IMG_CLOUD);
    const res_a = await fetch(process.env.REACT_APP_IMG_URL , {
      method: "post",
      body: data
    })
    .catch((error) => {
      console.log(error);
  });
    const data_a = await res_a.json();
    return data_a;
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

    var dateIsBefore = moment(cookedtime).isBefore(moment(expirytime));
    var dateIsBeforeExpTime = moment(datetime).isBefore(moment(expirytime));
    var dateIsAfter = moment(datetime).isAfter(moment(cookedtime));
    if (!dateIsBefore) message = message + "Your Cooked Time is earlier than Expiry Time...";
    if (!dateIsBeforeExpTime) message = message + "You must enter Valid Expiry Time...";
    if (!dateIsAfter) message = message + "Your must enter Cooked Time less than Current Time...";
    console.log("Current "+datetime);
    console.log("CookedTime "+ cookedtime);
    console.log("ExpiryTime "+ expirytime);

    setshowmessage(message);
    if (message.length !== 0) {
      setShow(true);
    }
    else {
      let a = postDetails();
      a.then((data) => {
        setUrl(data.url);
        responseData(data.url);
      })
    }
  };

  async function responseData(Url1) {
    const responseNew = await sendRequest(
      BASE_API_URL+'/donate',
      'POST',
      JSON.stringify({
        funcname,
        name,
        mobile,
        description,
        quantity,
        quality,
        foodtype,
        cookedtime,
        expirytime,
        address: map.address,
        city: map.city,
        state: map.state,
        lat: map.mapPosition.lat,
        lng: map.mapPosition.lng,
        Url: Url1
      }),
      {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token
      }
    );

    try {
      if (!responseNew.userId) {
        document.getElementById("msg").innerHTML = "<span>" + responseNew + "</span>";
        return;
      }
      history.push('/reqforfood');
    }
    catch (err) {
    }
  }

  return (
    <div>
      {/* Required meta tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      {/* Bootstrap CSS */}
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
      <title>We Don't Waste Food</title>

      <Carousel>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={image7}
            alt="First slide"
          />
          <Carousel.Caption>
            <h1 className="fs-1 fw-bold">OUR MISSION</h1>
            <h2 className="fs-1 fw-bold">
              Make India Hunger Free
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={image8}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h1 className="fs-1 fw-bold">YOUR SUPPORT MATTERS</h1>
            <h2 className="fs-1 fw-bold">
            Contribute to help us provide essential food support to those in need
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="container mt-3">
        <div className="row">
          <div className="col" />
          <div className="col-md-6 card">
              <h4 className="text-danger text-center mt-4 mb-4">Enter following details to Donate Food</h4>
            <form className="row g-3 form-group" onSubmit={postdata}>
              <div className="col-md-6">
                <label htmlFor="inputfirst4" className="form-label">Function Name</label>
                <input type="text" className="form-control" id="inputfirst4" value={funcname}
                  onChange={(e) => setfuncname(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputfirst4" className="form-label">Food Name</label>
                <input type="text" className="form-control" id="inputfirst4" value={name}
                  onChange={(e) => setname(e.target.value)} required />
              </div>
              <div className="col-md-6 mt-2">
                <label htmlFor="inputmobile4" className="form-label">Mobile No.</label>
                <input type="text" className="form-control" id="inputmobile4" value={mobile}
                  onChange={(e) => setmobile(e.target.value)} required />
              </div>
              <div className="col-md-6 mt-2">
                <label htmlFor="inputEmail4" className="form-label">Description</label>
                <input type="text" className="form-control" id="inputEmail4" value={description}
                  onChange={(e) => setdescription(e.target.value)} required />
              </div>
              <div className="col-md-6 mt-2">
                <label htmlFor="exampleInputPassword1" className="form-label">How many Persons can feed?</label>
                <input type="text" className="form-control" id="exampleInputPassword1" value={quantity}
                  onChange={(e) => setquantity(e.target.value)} required />
              </div>

              <div className="col-md-3 mt-3">
                <label htmlFor="qaulity" className="form-label">Hygiene Level</label>
                <div className="d-flex justify-content-center">
                  <select value={quality} onChange={handleChange}>
                    <option name="5">5</option>
                    <option name="4">4</option>
                    <option name="3">3</option>
                    <option name="2">2</option>
                    <option name="1">1</option>
                  </select>
                </div>
              </div>

              <div className="col-md-3 mt-3">
                <label htmlFor="qaulity" className="form-label">Food Type</label>
                <select value={foodtype} onChange={handleChangeType}>
                  <option name="beverage">Beverage</option>
                  <option name="dinner">Dinner</option>
                  <option name="lunch">Lunch</option>
                  <option name="other">Other</option>
                </select>
              </div>

              <div className="col-md-6 mt-2">
                <label htmlFor="dob1" className="form-label">Cooked Time</label>
                <input type="datetime-local" className="form-control" id="dob1" value={cookedtime}
                  onChange={(e) => setcookedtime(e.target.value)} required />
              </div>
              <div className="col-md-6 mt-2">
                <label htmlFor="dob1" className="form-label">Expected Expiry Time</label>
                <input type="datetime-local" className="form-control" id="dob1" value={expirytime}
                  onChange={(e) => setexpirytime(e.target.value)} required />
              </div>

              <div className="col-md-12 mt-2">
                <label htmlFor="exampleFormControlFile1">
                  Upload Food Image
                </label>
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                  onChange={(e) => setimage(e.target.files[0])}
                  required
                />
              </div>

              <div className="col-md-12 text-center mt-4 mb-5">
                <MapNew
                  mapValueFunc={
                    setMapValue.bind()
                  }
                />
              </div>

              <div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title className="text-danger">Invalid Time Entry</Modal.Title>
                  </Modal.Header>
                  <Modal.Body><p>{showmessage}</p></Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>

              <div className="col-md-12 text-center mt-5 mb-3">
                <button type="submit" className="btn btn-danger align-self-center">Donate</button>
              </div>
            </form>
          </div>
          <div className="col" />
        </div>
        <div className="container pb-5 mb-5"/>
        <div className="container pb-5 mb-5"/>
        <div className="container pb-5 mb-5"/>
        <div className="container pb-5 mb-5"/>
      </div>
    </div>
  )
}
export default Donate;