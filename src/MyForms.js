import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import Header from './components/Header';


function MyForms() {

    const jotform = window.JF;
    const [formlist, setFormlist] = useState([]);
    const [username, setUsername] = useState('');
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
        console.log(response);
    }

    //api function for getting forms 
    useEffect(() => {
        jotform.getForms(getforms);
        jotform.getUser(getuser);
    });

    const getuser = (resp) => {
        console.log(resp);
        setUsername(resp.name);
    }

    //onClick for card item to get formid
    const cardClick = (data) => {
        setFormid({ id: data });
        history.push('/submissions/' + data);
    }

    //rendering forms as a card item
    const renderCard = (card, index) => {
        if (card.status == "ENABLED") {
            return (
                <Card style={{ width: "100%", height: "100%" }} key={index}>
                    <Row style={{ height: "45px", width: "100%", marginTop: "15px", marginLeft: "15px" }}>
                        <Col sm={8} >
                            <Card.Title style={{ marginTop: "3px" }}>
                                {card.title}
                            </Card.Title>
                        </Col>
                        <Col sm={4}>
                            <Button size="sm" style={{ marginLeft: "35px" }} variant="dark" onClick={() => cardClick(card.id)}>Get Word Cloud</Button>
                        </Col>
                        <Card.Body>
                        </Card.Body>
                    </Row>
                </Card>
            )
        }
        else {
            return;
        }
    }

    return (
        <div className="MyForms">
            <Header login={true} name={username}/>
            <div className="">
                <Container>
                    <Row style={{ marginTop: "100px", marginBottom: "100px" }}>
                        <Col>
                        </Col>
                        <Col xs={8}>
                            <Card border="secondary" >
                                <Card.Body>
                                    <Card.Title className="text-center">My Forms</Card.Title>
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