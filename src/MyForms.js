import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import Header from './components/Header';


function MyForms() {

    const jotform = window.JF;
    const [formlist, setFormlist] = useState([]);
    const [formid, setFormid] = useState({ id: "" });
    let history = useHistory();
    const initialapikey = localStorage.getItem('apikey');
    const [apikey, setApikey] = useState(initialapikey === "null" ? null : initialapikey);

    //initialize apikey to get forms
    useEffect(() => {
        if (apikey !== null) {
            jotform.initialize({ apiKey: apikey });
        }
    }, []);

    //subfunction of getForms
    const getforms = (response) => {
        setFormlist(response);
    }

    //api function for getting forms 
    useEffect(() => {
        jotform.getForms(getforms);
    });

    //onClick for card item to get formid
    const cardClick = (data) => {
        setFormid({ id: data });
        history.push('/submissions/' + data);
    }

    //rendering forms as a card item
    const renderCard = (card, index) => {
        return (
            <Card style={{ width: '18rem' }} key={index}>
                <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>
                        {card.status}
                    </Card.Text>
                    <Button variant="dark" onClick={() => cardClick(card.id)}>Submissions</Button>
                </Card.Body>
            </Card>
        )
    }

    return (
        <div className="MyForms">
            <Header />
            <div className="">
                <Container>
                    <Row style={{ marginTop: "100px", marginBottom: "100px" }}>
                        <Col>
                        </Col>
                        <Col xs={8}>
                            <Card border="secondary" className="text-center">
                                <Card.Body>
                                    <Card.Title>My Forms</Card.Title>
                                    <div>
                                        {formlist.map(renderCard)}
                                    </div>
                                </Card.Body>
                            </Card>
                            {/*
                            <Submissions me={name} /> */}
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        </div>


    );
}

export default MyForms;