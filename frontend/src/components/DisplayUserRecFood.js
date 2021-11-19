import React from 'react';
import { Spinner, Button, Card } from 'react-bootstrap';
require('dotenv').config();

const DisplayUserRecFood = props => {

    if (props.items.foods.length === 0) {
        return (
            <div>
                <div className="d-flex justify-content-center align-items-center font-weight-bold mt-5">
                    <Card style={{ width: '22rem' }}>
                        <Card.Img variant="top" src = {process.env.REACT_APP_REC} />
                        <Card.Body>
                            <Card.Title>Want to Receive Food?</Card.Title>
                            <Card.Text>
                                YOUR SUPPORT MATTERS CONTRIBUTE TO HELP US PROVIDE ESSENTIAL FOOD SUPPORT TO THOSE IN NEED
                            </Card.Text>
                            <div className="d-flex justify-content-center align-items-center mt-1">
                                <a href="/reqforfood"><Button variant="danger">Receive Now</Button></a>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                
            </div>
        );
    }

    return (
        <div>
            <div className="row mt-5 ml-5">
                {props.items.foods.map(food => (
                    <div className="ml-4 col-md-2 mb-4 shadow">
                        <a href={`detailuserrecfood/${food.id}/${food.userId}`}>
                            <div className="container" >
                                <img src={food.Url} alt="Sample" style={{ width: "100%", height: 200 }} />
                            </div>
                        </a>
                        <div className="text-center">
                            <div className="container">
                                <h5>{food.name}</h5></div>
                            {!food.received && <Button variant="danger" disabled>
                                Requested{' '}
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            </Button>}
                            {food.received && <Button variant="success" disabled>
                                Collected{' '}
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
            <div className="container pb-5 mb-5"/>
        </div>
    );
};

export default DisplayUserRecFood;