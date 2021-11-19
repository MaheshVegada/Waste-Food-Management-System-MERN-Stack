import React from "react";

function Contact() {
    return (
        <div>
            {/* Required meta tags */}
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            {/* Bootstrap CSS */}
            <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                crossOrigin="anonymous"
            />
            <title>We Don't Waste Food</title>
            {/* navbar */}
            <div className="container my-4">
                <h2>Contact Us</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="name@example.com"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">
                            Select your Query
                        </label>
                        <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                        >
                            <option>Query 1</option>
                            <option>Query 2</option>
                            <option>Query 3</option>
                            <option>Query 4</option>
                        </select>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-2">Are you a Donator?</div>
                        <div className="col-sm-10">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="gridCheck1"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="gridCheck1"
                                >
                                    Yes
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-2">Are you a Receiver?</div>
                        <div className="col-sm-10">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="gridCheck2"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="gridCheck2"
                                >
                                    Yes
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">
                            Tell us about yourself
                        </label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            defaultValue={''}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea2">
                            Elaborate Your Concern
                        </label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea2"
                            rows={3}
                            defaultValue={''}
                        />
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Contact;