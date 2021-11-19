import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useHttpClient } from '../hooks/http-hook';
import {BASE_API_URL} from '../api/api';

function ResetPassword() {
    const { sendRequest } = useHttpClient();

    const history = useHistory();
    const [email, setemail] = useState("");

    const postdata = async (e) => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(
                BASE_API_URL+'/reset-password',
                'POST',
                JSON.stringify({
                    email,
                }),
                {
                    'Content-Type': 'application/json',
                }
            );
            if (responseData.message === "check your email") {
                alert("Check your mail id to reset password");
                history.push('/');
            }
            else{
                document.getElementById("msg").innerHTML = "<h5> No User found </h5>";
                return;
              }            
        }
        catch (err) {
        }
    };

    return (
        <div>
            {/* Required meta tags */}
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            {/* Bootstrap CSS */}
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
            <title>We Don't Waste Food</title>
            <div className="container mt-5">
                <div className="row">
                    <div className="col" />
                    <div className="col-md-4 card">
                        <form className="form-group" onSubmit={postdata}>
                            <h3 className="text-danger text-center mt-3 mb-3">Reset Password</h3>
                            <div className="col-xs-2">
                                <label htmlFor="inputEmail4" className="form-label">Email</label>
                                <input type="email" className="form-control" id="inputEmail4" value={email}
                                    onChange={(e) => setemail(e.target.value)} />
                            </div>
                            <div className="text-center">
                                <div className="container text-center text-danger mt-3" id="msg"></div>
                                <button type="submit" className="btn btn-danger mt-3 text-center">Verify</button>
                            </div>
                        </form>
                    </div>
                    <div className="col" />
                </div>
            </div>
            <div className="container pb-5 mb-5"/>
            <div className="container pb-5 mb-5"/>
            <div className="container pb-5 mb-5"/>
        </div>
    )
}

export default ResetPassword;

