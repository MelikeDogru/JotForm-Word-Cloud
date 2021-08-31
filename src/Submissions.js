import React, { useContext, useState, useEffect } from 'react';
//import './App.css';
import { Redirect, useHistory, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import { Button, Container, Row, Col, Form, ListGroup, Card } from 'react-bootstrap';
import Header from './components/Header';


const Submissions = () => {

    const jotform = window.JF;
    const [formId, setFormId] = useState('');
    const [submissionslist, setSubmissionsList] = useState([]);
    let history = useHistory();
    const params = useParams();
    const initialapikey = localStorage.getItem('apikey');
    const [apikey, setApikey] = useState(initialapikey === "null" ? null : initialapikey);

    //initialize apikey to get submissions
    useEffect(() => {
        if (apikey !== null) {
            jotform.initialize({ apiKey: apikey });
        }
    }, []);

    //get form id to obtain submissions
    useEffect(() => {
        setFormId(params.formid);
    }, []);

    //sbfunction for getFormSubmissions function
    const submission = (response) => {
        setSubmissionsList(response);
        console.log(response);
        //console.log(response[1].answers);
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].answers)
        }
    }

    //api function get form submissions
    useEffect(() => {
        jotform.getFormSubmissions(formId, submission);
    }, [formId]);

    //onClick for card 
    const cardClick = (data) => {
        
    }

    //rendering submissions as a card item
    const renderCard = (card, index) => {
        return (
            <Card style={{ width: '18rem' }} key={index}>
                <Card.Body>
                    <Card.Title>{card.id}</Card.Title>
                    <Card.Text>
                        {card.id}
                    </Card.Text>
                    <Button variant="dark" onClick={() => cardClick(card.id)}>Button</Button>
                </Card.Body>
            </Card>
        )
    }


    return (
        <div className="Submissions">
            <Header />
            <div className="">
                <Container>
                    <Row style={{ marginTop: "100px", marginBottom: "100px" }}>
                        <Col>
                        </Col>
                        <Col xs={8}>
                            <Card border="secondary" className="text-center">
                                <Card.Body>
                                    <Card.Title>Submissions</Card.Title>
                                    <div>
                                        {submissionslist.map(renderCard)}
                                    </div>
                                </Card.Body>
                                <Card.Text>{formId}</Card.Text>
                            </Card>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>

        </div>


    );
}

export default Submissions;