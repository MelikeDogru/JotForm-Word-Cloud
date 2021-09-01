import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import { Button, Container, Row, Col, Form, ListGroup, Card } from 'react-bootstrap';
import Header from './components/Header';
import ReactWordcloud from 'react-wordcloud';
import WordCloud from './WordCloud'

const Submissions = () => {

    const jotform = window.JF;
    const [formId, setFormId] = useState('');
    const [submissionslist, setSubmissionsList] = useState([]);
    let history = useHistory();
    const params = useParams();
    const initialapikey = localStorage.getItem('apikey');
    const [apikey, setApikey] = useState(initialapikey === "null" ? null : initialapikey);
    const [submissionsText, setSubmissionsText] = useState('');
    const [cleanText, setCleanText] = useState('');
    const [submissionsArray, setSubmissionsArray] = useState([]);
    const [tempCleanArray, setTempCleanArray] = useState([]);

    const controlArray = [
        { type: 'control_head', text: 'false' },
        { type: 'control_button', text: 'false' },
        { type: 'control_fullname', text: 'prettyFormat' },
        { type: 'control_email', text: 'answer' },
        { type: 'control_address', text: 'prettyFormat' },
        { type: 'control_phone', text: 'false' },
        { type: 'control_datetime', text: 'false' },
        { type: 'control_appointment', text: 'false' },
        { type: 'control_signature', text: 'false' },
        { type: 'control_inline', text: 'false' },
        { type: 'control_payment', text: 'false' },
        { type: 'control_textbox', text: 'answer' },
        { type: 'control_textarea', text: 'answer' },
        { type: 'control_text', text: 'false' },
        { type: 'control_dropdown', text: 'answer' },
        { type: 'control_radio', text: 'answer' },
        { type: 'control_checkbox', text: 'prettyFormat' },
        { type: 'control_number', text: 'false' },
        { type: 'control_image', text: 'false' },
        { type: 'control_fileupload', text: 'false' },
        { type: 'control_time', text: 'false' },
        { type: 'control_captcha', text: 'false' },
        { type: 'control_spinner', text: 'false' },
        { type: 'control_matrix', text: 'false' },
        { type: 'control_rating', text: 'false' },
        { type: 'control_scale', text: 'false' },
        { type: 'control_divider', text: 'false' }
    ]

    //console.log(controlArray[0].type);

    const words = [
        {
            text: 'told',
            value: 64,
        },
        {
            text: 'mistake',
            value: 11,
        },
        {
            text: 'thought',
            value: 16,
        },
        {
            text: 'bad',
            value: 17,
        },
    ]


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
    //get array of submissions to obtain a text
    const submission = (response) => {
        setSubmissionsList(response);
        console.log(response);
        for (var i = 0; i < response.length; i++) {
            const object = response[i].answers;
            for (const j in object) {
                for (var k = 0; k < controlArray.length; k++) {
                    if (object[j].type == controlArray[k].type) {
                        if (controlArray[k].text !== 'false') {
                            if (controlArray[k].text == 'prettyFormat') {
                                //setSubmissionsText(submissionsText.concat(object[j].prettyFormat));
                                setSubmissionsArray(submissionsArray => [...submissionsArray, object[j].prettyFormat]);
                            }
                            if (controlArray[k].text == 'answer') {
                                setSubmissionsArray(submissionsArray => [...submissionsArray, object[j].answer]);
                            }
                        }
                    }
                }
            }
        }
    }

    //get text of submissions, convert submissions array to string
    useEffect(() => {
        setSubmissionsText(submissionsArray.join(' '));
        //removeStopwords(submissionsText);
    }, [submissionsArray])

    /*
    useEffect(() => {
        const sss = "you you are my helloo"
        //removeStopwords(submissionsText);
        removeStopwords(sss);
        console.log(cleanText);
    }, [submissionsText]) */

    //Clean stop words
    /*
    const removeStopwords = (str) => {
        const words = str.split(' ');
        console.log(words);
        for (var i = 0; i < words.length; i++) {
            const word_clean = words[i];
            console.log(word_clean);
            if (!stopwords.includes(word_clean)) {
                console.log(word_clean);
                setTempCleanArray(tempCleanArray => [...tempCleanArray, word_clean]);
            }
        }
        setCleanText(tempCleanArray.join(' '));
        console.log(str);
        console.log("remove");
    }*/

    //api function get form submissions
    useEffect(() => {
        jotform.getFormSubmissions(formId, submission);
    }, [formId]);

    
    //onClick for card 
    const cardClick = (data) => {
        console.log(submissionsText);
        console.log(submissionsArray);
        console.log(cleanText);
        //var str = submissionsArray.join(' ');
        //console.log(str);
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
                                    <WordCloud data={submissionsText} />
                                    {/*<ReactWordcloud words={words} />*/}
                                </Card.Body>
                                <Card.Text>{cleanText}</Card.Text>
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