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
    let history = useHistory();
    const params = useParams();
    console.log(params.formid);
    const initialapikey = localStorage.getItem('apikey');
    const [apikey, setApikey] = useState(initialapikey === "null" ? null : initialapikey);

    useEffect(() => {
        if (apikey !== null) {
            jotform.initialize({ apiKey: apikey });   
        }
    }, []);
    

    useEffect(() => {
        setFormId(params.formid);
    }, []);


    const submission = (response) => {
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].answers)
            //document.write(response[i].answers);
        }
    }

    useEffect(() => {
        jotform.getFormSubmissions(formId, submission);
    });


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
                                    <Card.Title>submissions</Card.Title>
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