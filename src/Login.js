import React, { Component } from 'react';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import Header from './components/Header';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "a",
            password: "b"
        }

        this.login_check = this.login_check.bind(this);
        this.onChange = this.onChange.bind(this);
    
    }

    login_check(){
        console.log("Login Function");
        console.log(this.state);
    }

    onChange(e){
        console.log("coming here");
        this.setState({[e.target.name]:e.target.value});
        console.log(this.state);
    }

    render() {
        return (
            <div className="Login">
                <Header />
                <div className="">
                    <Container>
                        <Row style={{ marginTop: "100px" }}>
                            <Col></Col>
                            <Col>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Enter Username</Form.Label>
                                        <Form.Control name="username" type="text" placeholder="Username" onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Enter Password</Form.Label>
                                        <Form.Control name="password" type="password" placeholder="Password" onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Check box" />
                                    </Form.Group>
                                    <Button variant="dark" type="submit" onClick={this.login_check} >
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
}

export default Login;