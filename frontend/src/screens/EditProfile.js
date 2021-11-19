/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import { useHistory } from "react-router-dom";
import {BASE_API_URL} from '../api/api';
require('dotenv').config();

const EditProfile = () => {

  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const history = useHistory();
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [type, settype] = useState("NGO");
  const [gender, setgender] = useState("Male");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [image, setimage] = useState("")
  const [Url, setUrl] = useState("")

  const handleChangeGender = (e) => {
    setgender(e.target.value);
  };
  const handleChangeType = (e) => {
    settype(e.target.value);
  };

  async function postDetails() {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", process.env.REACT_APP_IMG_UPLOAD)
    data.append("cloud_name", process.env.REACT_APP_IMG_CLOUD)
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
    let a = postDetails();
    a.then((data) => {
      setUrl(data.url);
      responseData(data.url);
    }
    )
  };

  async function responseData(Url1) {
    const responseNew = await sendRequest(
      BASE_API_URL+'/editprofile',
      'POST',
      JSON.stringify({
        fullname,
        email,
        mobile,
        type,
        gender,
        address,
        city,
        state,
        Url: Url1
      }),
      {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token
      }
    );

    try {
      if (!responseNew) {
        document.getElementById("msg").innerHTML = "<span>" + responseNew + "</span>";
        return;
      }
      if (responseNew) {
        history.push('/viewprofile');
      }
    }
    catch (err) {
    }
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col" />
          <div className="col-md-6">
          <h3 className="text-center text-danger mb-5" style={{ fontFamily: 'monaco' }}><strong>Edit Your Profile</strong></h3>
            <form className="row g-3" onSubmit={postdata}>
              <div className="col-md-6">
                <label htmlFor="inputfirst4" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="inputfirst4" value={fullname}
                  onChange={(e) => setfullname(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail4" value={email}
                  onChange={(e) => setemail(e.target.value)} />
              </div>
              <div className="col-md-6 mt-2">
                <label htmlFor="phone" className="form-label">Mobile No</label>
                <input type="tel" className="form-control" id="mobile" maxLength="10" value={mobile}
                  onChange={(e) => setmobile(e.target.value)} />
              </div>
              <div className="col-md-3 mt-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select value={gender} onChange={handleChangeGender}>
                  <option name="male"> Male</option>
                  <option name="female">Female</option>
                  <option name="others">Others</option>
                </select>
              </div>
              <div className="col-md-3 mt-3">
                <label htmlFor="type" className="form-label">Type</label>
                <select value={type} onChange={handleChangeType}>
                  <option name="ngo">NGO</option>
                  <option name="restaurant">Restaurant</option>
                  <option name="team">Team</option>
                  <option name="individual">Individual</option>
                  <option name="others">Others</option>
                </select>
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

              <div className="col-md-12 mt-2">
                <label htmlFor="exampleFormControlFile1">
                  Upload Your Image
                </label>
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                  onChange={(e) => setimage(e.target.files[0])}
                />
              </div>

              <div className="col-md-12 text-center mt-4 mb-5">
                    <div className="container mb-0 text-center text-danger" id="msg"></div>
                    <button type="submit" className="btn btn-danger align-self-center mt-2">Update</button>
              </div>
            </form>
          </div>
          <div className="col" />
        </div>
      </div>
    </div>
  )
}

export default EditProfile;