import React, { useState, useContext } from "react";
import { AuthContext } from '../context/auth-context';
import {BASE_API_URL} from '../api/api';
import { useHistory, useParams } from "react-router-dom";
import { useHttpClient } from '../hooks/http-hook';

function NewPassword() {

    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    const { token } = useParams();

    const history = useHistory();
    const [password, setpassword] = useState("");
    const [confpassword, setconfpassword] = useState("");

    const postdata = async (e) => {
        e.preventDefault();
        if (password !== confpassword) {
            document.getElementById("msg").innerHTML = "<h5>Password hasn't matched</h5>";
            return;
        }
        try {
            const responseData = await sendRequest(
                BASE_API_URL+'/new-password',
                'POST',
                JSON.stringify({
                    password,
                    token                    
                }),
                {
                    'Content-Type': 'application/json',
                }
            );
            if (responseData) {
                auth.login(
                    responseData.userId,
                    responseData.token
                );
                history.push('/login'); 
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
                            <h3 className="text-primary text-center mt-3 mb-4">Enter New Password</h3>
                            <div className="col-xt-2">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" value={password}
                                onChange={(e) => setpassword(e.target.value)} />
                            </div>
                            <div className="col-xt-2">
                                <label htmlFor="exampleInputPassword2" className="form-label mt-3">Confirm Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword2" value={confpassword}
                                onChange={(e) => setconfpassword(e.target.value)} />
                            </div>
                            <div className="text-center">
                            <div className="container mt-3 text-center text-danger" id="msg"></div>
                                <button type="submit" className="btn btn-primary mt-3 text-center">Reset Password</button>
                            </div>
                        </form>
                    </div>
                    <div className="col" />
                </div>
            </div>
        <div className="container pb-5 mb-5"/>
        <div className="container pb-5 mb-5"/>
        </div>
    )
}

export default NewPassword;

