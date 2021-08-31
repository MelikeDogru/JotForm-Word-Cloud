import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import { Button, Container, Row, Col, Form, Card } from 'react-bootstrap';
import Header from './components/Header';



function Login() {

    const jotform = window.JF;
    const [loginState, setLoginState] = useState(null);
    const initialapikey = localStorage.getItem('apikey');
    const [apikey, setApikey] = useState(initialapikey === "null" ? null : initialapikey);
    console.log(apikey);
    let history = useHistory();

    //localStorage.setItem("mytime", Date.now());
    //var currentColor = localStorage.getItem('bgcolor');

    useEffect(() => {
        console.log(loginState);
        if (loginState === true) {
            console.log("true");
            history.push('/myforms');
        }
        if (loginState === false) {
            console.log("false");         
        }
        else {
            console.log("null");
        }
    }, [loginState]);

    useEffect(() => {
        if (apikey !== null) {
            jotform.initialize({ apiKey: apikey });
            history.push('/myforms');
        }
    }, []);


    const getuser = (resp) => {
        console.log(resp);
    }

    const success = () => {
        jotform.getUser(getuser);
        const apiKey = jotform.getAPIKey();
        setApikey(apiKey);
        localStorage.setItem("apikey", apiKey);
        console.log(apikey);
        jotform.initialize({ apiKey: apiKey });
        setLoginState(true);
    }

    const fail = () => {
        setLoginState(false);
        console.log("fail");
    }

    const loginOnclick = () => {
        if(apikey == null){
            jotform.login(success, fail);
        }
    }


    return (
        <div className="Login" >
            <Header />
            <div className="main-conteiner">
                <Container>
                    <Row style={{ marginTop: "100px" }}>
                        <Col></Col>
                        <Col xs={8}>
                            <Card border="secondary" className="text-center">
                                <Card.Body>
                                    <Card.Title>Welcome to JotForm Word Cloud Tool!</Card.Title>
                                    <Card.Text>
                                        You need to login and give permission of the access before start to use this tool.
                                    </Card.Text>
                                    <Button variant="dark" onClick={loginOnclick} >
                                        Login
                                    </Button>
                                    {/*
                                    <div>
                                        {loginState ?
                                            <Button variant="dark" onClick={direct} >
                                                Login
                                            </Button> : <Button variant="dark" onClick={loginOnclick} >
                                                Login
                                            </Button>}
                                        </div> */}
                                    {/*
                                    <Button variant="dark" onClick={loginOnclick} >
                                        Login
                                    </Button>
                                    <Button variant="dark" onClick={onclick} style={{ marginLeft: "5px" }} onClick={getsub} >
                                        get submission
                                    </Button>
                                    {loginState ? <Button>Truee</Button> : <Button>false</Button>} 
                                   */}

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
            {/*}
            <div className="invisible" style={{ height:"0px"}}>
                <MyForms data={state.res}/>
                                </div> */}
        </div>


    );

}

export default Login;