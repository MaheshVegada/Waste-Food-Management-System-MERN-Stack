const ViewUser = props => {
    return (
        <div>
            <div className="container">
                <div className="row my-2">
                    <div className="col-lg-4 order-lg-1 text-center">
                        <div className="container mt-3">
                            <img src={props.items.Url} className="mx-auto img-fluid img-circle d-block" alt="avatar" />
                        </div>
                        <h3 className="mt-2">{props.items.name}</h3>
                        <a href="/editprofile">
                            <button type="submit" className="btn btn-primary align-self-center mt-2">Edit Profile</button>
                        </a>
                    </div>
                    <div className="col-lg-8 order-lg-2 mt-3">
                        <div className="tab-content py-4">
                            <div className="tab-pane active" id="viewprofile">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Email</h6>
                                        <p>{props.items.email}</p>
                                        <hr />
                                        <h6>Contact Number</h6>
                                        <p>+91 {props.items.mobile}</p>
                                        <hr />
                                        <h6>Gender</h6>
                                        <p>{props.items.gender}</p>
                                        <hr />
                                        <h6>Type</h6>
                                        <p>{props.items.type}</p>
                                        <hr />
                                        <h6>Address</h6>
                                        <p>{props.items.address}</p>
                                        <hr />
                                        <h6>City, State</h6>
                                        <p>{props.items.city}, {props.items.state}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane" id="editprofile">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewUser;