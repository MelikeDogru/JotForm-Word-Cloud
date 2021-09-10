import React, { useState, useEffect, useRef, useMemo } from 'react';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import { Button, Container, Row, Col, Card, Modal, Tooltip, OverlayTrigger, Accordion, Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { Resizable } from "re-resizable";
import html2canvas from 'html2canvas';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import Options from './Options';
import OptionsAccordion from './OptionsAccordion';
import { v4 as uuidv4 } from 'uuid';

const WordCloud = (props) => {

    const [submissions, setSubmissions] = useState('');
    const [tempCleanArray, setTempCleanArray] = useState([]);
    const [cleanText, setCleanText] = useState('');
    const [wordsArray, setWordsArray] = useState([]);
    const componentRef = useRef();
    const [embedButtonString, setEmbedButtonString] = useState('</> Embed Code');
    const [showEmbedCodeModel, setShowEmbedCodeModel] = useState(false);
    const [embedCode, setEmbedCode] = useState('');
    const [open, setOpen] = useState(false);
    const [randomSeed, setRandomSeed] = useState(uuidv4());


    const stopwords = ['would', 'i', 'me', 'my', 'myself', 'we', 'we\'re', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'];

    //Clean stop words and punctuation
    //create words array for word cloud
    const removeStopwords = (str) => {
        const regex = /[!"'#$%&'()*+,-./:;<=>?@[\]^_`{|}~123456789]/g;
        str = str.replace(regex, '');
        str = str.toString().toLowerCase();
        const words = str.split(' ');
        setTempCleanArray([]);
        for (var i = 0; i < words.length; i++) {
            const word_clean = words[i];
            if (!stopwords.includes(word_clean)) {
                setTempCleanArray(tempCleanArray => [...tempCleanArray, word_clean]);
            }
        }
        setCleanText(tempCleanArray.join(' '));
        const map = tempCleanArray.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
        const arr = [...map].map(([text, value]) => ({ text, value }))
        setWordsArray(arr);
    }

    useEffect(() => {
        setSubmissions(props.data);
        removeStopwords(submissions);
    }, [props.data]);

    useEffect(() => {
        //console.log(cleanText)
    }, [submissions]);

    const callbacks = {
        //getWordColor: word => word.value > 50 ? "blue" : "red",
        //onWordClick: console.log,
        //onWordMouseOver: console.log,
        //getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
    }
    const intialoptions = {
        colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
        enableTooltip: true,
        deterministic: true,
        fontFamily: "times new roman",
        fontSizes: [15, 90],
        fontStyle: "normal",
        fontWeight: "normal",
        padding: 1,
        rotations: 3,
        rotationAngles: [0, 90],
        scale: "sqrt",
        spiral: "archimedean",
        transitionDuration: 1000
    };
    const size = [600, 400];

    const [options, setOptions] = useState(intialoptions);

    useEffect(() => {
        console.log(options);
    }, [options])

    const resizeStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "solid 1px #ddd",
        background: "#f0f0f0"
    };

    const renderTooltips = (props) => (
        <Tooltip {...props}>Use this code in order to embed your word cloud in an iFrame within your page.</Tooltip>
    );

    //For Embed code
    const exportAsPicture = () => {
        var html = document.getElementsByTagName('HTML')[0]
        var body = document.getElementsByTagName('BODY')[0]
        var htmlWidth = html.clientWidth;
        var bodyWidth = body.clientWidth;

        var data = document.getElementById('exportContainer')
        var newWidth = data.scrollWidth - data.clientWidth


        if (newWidth > data.clientWidth) {
            htmlWidth += newWidth
            bodyWidth += newWidth
        }

        html.style.width = htmlWidth + 'px'
        body.style.width = bodyWidth + 'px'


        html2canvas(data).then((canvas) => {
            var image = canvas.toDataURL('image/png', 0.5);
            console.log(image);
            setEmbedCode("<iframe id=\"JotformWordCloud\" width=\"600\" height=\"400\" src=\"" + image + "\"></iframe>");
            //let encoded = base64_encode(image);
            //console.log(encoded);
            return image
        }).then((image) => {
            //saveAs(image, 'exported-vis.png') 
            html.style.width = null
            body.style.width = null
        })
    }

    const handleClose = () => {
        setShowEmbedCodeModel(false);
    }
    const handleShow = () => {
        exportAsPicture();
        setShowEmbedCodeModel(true);
    }
    const handleCompyEmbedCode = () => {
        navigator.clipboard.writeText(embedCode);
        setShowEmbedCodeModel(false);
    }

    const embedCodeModal = (
        <Modal show={showEmbedCodeModel} onHide={handleClose} centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>IFRAME</Modal.Title>
            </Modal.Header>
            <Modal.Body>{embedCode}</Modal.Body>
            <Modal.Footer>
                <Button size="sm" variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button size="sm" variant="dark" onClick={handleCompyEmbedCode}>
                    Copy Code
                </Button>
            </Modal.Footer>
        </Modal>
    );


    const handleRefresh = () => {
        setOptions(intialoptions);
    }

    const wordcloudOptions = useMemo(
        () => ({
            ...options,
            randomSeed,
        }),
        [options, randomSeed],
    );

    function handleAnimate() {
        setRandomSeed(uuidv4());
    }


    return (
        <div>
            <div id="exportContainer" ref={componentRef} style={{ width: "100%", height: "100%", marginTop: "5px" }}>
                <ReactWordcloud words={wordsArray} callbacks={callbacks} options={wordcloudOptions} />
            </div>
            <Accordion style={{ marginTop: "15px", marginBottom: "15px" }}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header style={{ color: "#262626" }}>Change the Design of Word Cloud</Accordion.Header>
                    <Accordion.Body>
                        <OptionsAccordion options={options} onApply={setOptions} />
                        <Button style={{ marginTop: "5px" }} size="sm" variant="secondary" onClick={handleAnimate}>
                            Relocate the Words
                        </Button>
                        <Button style={{ marginTop: "5px", marginLeft: "7px" }} size="sm" variant="secondary" onClick={handleRefresh}>
                            Reload the First Settings
                        </Button>

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div style={{ marginTop: "5px" }}>
                <Row>
                    {/*
                    <Col>
                        <Options options={options} onApply={setOptions} />
                    </Col> */}
                    <Col>
                        <Button size="sm" style={{ marginLeft: "0px" }} variant="dark" onClick={handleShow}>{embedButtonString}</Button>
                        {embedCodeModal}
                    </Col>
                    <Col>
                        <Button size="sm" style={{ marginLeft: "0px" }} variant="dark" onClick={() => exportComponentAsJPEG(componentRef)}>Save as JPEG</Button>
                    </Col>
                    <Col>
                        <Button size="sm" style={{ marginLeft: "0px" }} variant="dark" onClick={() => exportComponentAsPNG(componentRef)}>Save as PNG</Button>
                    </Col>
                </Row>
            </div>
        </div>

    );
}

export default WordCloud;