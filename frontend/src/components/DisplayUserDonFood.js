import React from 'react';
import { Spinner, Button, Card } from 'react-bootstrap';
require('dotenv').config();

const DisplayUserDonFood = props => {

    if (props.items.foods.length === 0) {
        return (
            <div>
                <div className="d-flex justify-content-center align-items-center font-weight-bold mt-5">
                    <Card style={{ width: '22rem' }}>
                        <Card.Img variant="top" src = {process.env.REACT_APP_DON}/>
                        <Card.Body>
                            <Card.Title>Want to Donate Food?</Card.Title>
                            <Card.Text>
                                YOUR SUPPORT MATTERS CONTRIBUTE TO HELP US PROVIDE ESSENTIAL FOOD SUPPORT TO THOSE IN NEED
                            </Card.Text>
                            <div className="d-flex justify-content-center align-items-center mt-1">
                                <a href="/donate"><Button variant="danger">Donate Now</Button></a>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="container pb-5 mb-5"/>
            </div>
        );
    }

    return (
        <div>
            <div className="row mt-5 ml-5">
                {props.items.foods.map(food => (
                    <div className="ml-4 col-md-2 mb-4 shadow">
                        <a href={`detailuserdonfood/${food.id}/${food.userId}`}>
                            <div className="container" >
                                <img src={food.Url} alt="Sample" style={{ width: "100%", height: 200 }} />
                            </div>
                        </a>
                        <div className="text-center">
                            <div className="container">
                                <h5>{food.name}</h5></div>
                            {food.status && <Button variant="danger" className="mt-1 mb-3" disabled>
                                NOT YET Requested{' '}
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            </Button>}
                            {!food.status && food.received && <Button variant="success" className="mt-1 mb-3" disabled>
                            Collected{' '}
                            </Button>}
                            {!food.status && !food.received && <Button variant="primary" className="mt-1 mb-3" disabled>
                            Requested{' '}
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            </Button>}
                        </div>
                    </div>
                )
                )}
            </div>
            <div className="container pb-5 mb-5"/>
        </div>
    );
};

export default DisplayUserDonFood;
