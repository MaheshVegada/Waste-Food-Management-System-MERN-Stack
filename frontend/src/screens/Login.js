import React, { useState, useContext } from "react";
import { AuthContext } from '../context/auth-context';
import { useHistory } from "react-router-dom";
import { useHttpClient } from '../hooks/http-hook';
import {BASE_API_URL} from '../api/api';

function Login() {

    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();

    const history = useHistory();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const postdata = async (e) => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(
                BASE_API_URL+'/login',
                'POST',
                JSON.stringify({
                    email,
                    password
                }),
                {
                    'Content-Type': 'application/json',
                }
            );
            if (responseData.userId) {
                auth.login(
                    responseData.userId,
                    responseData.token
                );
                history.push('/');
            }
            else{
                document.getElementById("msg").innerHTML = "<h6>Invalid Email or Password</h6>";
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
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col" />
                    <div className="col-md-4 card">
                        <form className="form-group" onSubmit={postdata}>
                            <h2 className="text-primary text-center mt-2">Login</h2>
                            <div className="col-xs-2">
                                <label htmlFor="inputEmail4" className="form-label">Email</label>
                                <input type="email" className="form-control" id="inputEmail4" value={email}
                                    onChange={(e) => setemail(e.target.value)} required/>
                            </div>
                            <div className="col-xs-2 mt-2">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" value={password}
                                    onChange={(e) => setpassword(e.target.value)} required/>
                            </div>
                            <div className="text-center mt-3 mb-2">
                                <div className="container mt-1 mb-0 text-center text-danger" id="msg"></div>
                                <button type="submit" className="btn btn-primary mt-3 text-center">Login</button>
                            </div>
                            <div className="text-center">
                                <div className="container mt-1 mb-0 text-center text-danger" >
                                    <a className="text-danger" href="/reset-password">Forgot Password?</a>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="container mt-1 mb-0 text-center text-danger" >
                                    <a href="/signup">Don't have an account? Register</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col" />
                </div>
            </div>
            <div className="container pb-5 mb-5"/>
        </div>
    )
}

export default Login;