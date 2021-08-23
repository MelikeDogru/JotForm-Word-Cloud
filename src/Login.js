import React from 'react';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import Header from './components/Header';

function Login() {
    return (
        <div className="Login">
            <Header />
            <div className="">
                <Container>
                    <Row style={{marginTop: "100px"}}>
                        <Col></Col>
                        <Col>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Enter Username</Form.Label>
                                    <Form.Control type="text" placeholder="Username" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Enter Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check box" />
                                </Form.Group>
                                <Button variant="dark" type="submit">
                                    Login
                                </Button>
                            </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        </div>


    );
}

export default Login;