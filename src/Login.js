import React, { Component, useContext, useState, useEffect } from 'react';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import Header from './components/Header';


function Login() {

    /*
    constructor(props) {
        super(props);
        this.state = {
            username: "a",
            password: "b"
        }

        this.login_check = this.login_check.bind(this);
        this.onChange = this.onChange.bind(this);
        this.loadJS = this.loadJS.bind(this);

    }

    login_check() {
        console.log("Login Function");
        console.log(this.state);
    }*/

    /*
    onChange(e) {
        console.log("coming here");
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }
    fillWord = () => {
    }*/
    /*
    loadJS(src) {
        const ref = window.document.getElementsByTagName("script")[0];
        const script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
        console.log(ref);
    }*/

    /*
    componentDidMount() {
        const url = "https://js.jotform.com/JotForm.js";
        const ref = window.document.getElementsByTagName("script")[0];
        const script = window.document.createElement("script");
        script.src = url;
        //script.async = true; 
        ref.parentNode.insertBefore(script, ref);
        console.log(ref);
        console.log(script);
        console.log("componentdidmount");
        const jf = require('jotform');

        jf.options({
            debug: true,
            apiKey: "c27e9dbfa8ffd39413ea24626f6c340c"
        });
    
        jf.getUser()
            .then(function (r) {
            /* successful response after request 
            console.log(r);
            })
            .fail(function (e) {
            /* handle error 
            console.log("error");
        })
    } */

    const jotform = window.JF;

    const [formid, setFormid] = useState(null);

    const getuser = (resp) => {
        console.log(resp);
    }

    const getforms = (response) => {
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].title);
            setFormid(response[2].id);
            console.log(response[2].id);
        }
    }

    const success = () => {
        jotform.getUser(getuser);
        const apiKey = jotform.getAPIKey();
        console.log(apiKey);
        jotform.initialize({ apiKey: apiKey });
        console.log("success");
    }

    const fail = () => {
        console.log("fail");
    }


    const onclick = () => {

        //jotform.initialize({ apiKey: '27bccbb572680c8d86ec95397b1b7289' });
        jotform.login(success, fail);
        jotform.getForms(getforms);
        console.log("get forms success");

    }

    const getsub = () => {
        jotform.getFormSubmissions(formid, submission);
    }

    const submission = (response) => {
        for(var i=0; i<response.length; i++){
            console.log(response[i].answers)
            //document.write(response[i].answers);
        } 
    }


    return (
        <div className="Login" >
            <Header />
            <div className="">
                <Container>
                    <Row style={{ marginTop: "100px" }}>
                        <Col></Col>
                        <Col>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Enter Username</Form.Label>
                                    <Form.Control name="username" type="text" placeholder="Username" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Enter Password</Form.Label>
                                    <Form.Control name="password" type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check box" />
                                </Form.Group>
                                <Button variant="dark" onClick={onclick} >
                                    Login
                                </Button>
                                <Button variant="dark" onClick={onclick} style={{marginLeft: "5px"}} onClick={getsub} >
                                    get submission
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