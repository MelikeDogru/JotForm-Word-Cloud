import React, { useState, useEffect } from 'react';
import { Button, Modal, Figure, Form, Row, Col, ButtonGroup, Table } from 'react-bootstrap';

function OptionsAccordion({ options, onApply }) {

    const [showModel, setShowModel] = useState(false);
    const [intialoptions, setInitialOptions] = useState(options);
    const [draftOptions, setDraftOptions] = useState(options);

    const [colorArray, setColorArray] = useState(options.colors);

    const [minFontSize, setMinFontSize] = useState(options.fontSizes[0]);
    const [maxFontSize, setMaxFontSize] = useState(options.fontSizes[1]);
    const [padding, setPadding] = useState(options.padding);
    const [rotations, setRotations] = useState(options.rotations);

    useEffect(() => {
        console.log(options);
        setDraftOptions(options);
        setColorArray(options.colors);
    }, [options])

    const handleUpdateOptions = (key, value) => {
        const updatedOptions = {
            ...draftOptions, [key]: value,
        };
        setDraftOptions(updatedOptions);
        console.log(updatedOptions);
        console.log(draftOptions);

        handleApplyOptions(updatedOptions);

    }

    const handleApplyOptions = (up) => {
        onApply(up);
        console.log(up);
        setShowModel(false);
    }

    const handleUpdateColorArray = (value, index) => {
        colorArray[index] = value;
        setColorArray(colorArray);
        handleUpdateOptions('colors', colorArray);
    }

    const addColor = () => {
        colorArray.push("#080808");
        handleUpdateOptions('colors', colorArray);
    }

    const removeColor = () => {
        colorArray.pop();
        handleUpdateOptions('colors', colorArray);
    }

    const renderColors = (color, index) => {
        return (
            <Form.Control
                style={{ width: 60 }}
                type="color"
                id="exampleColorInput"
                value={color}
                title="Choose your color"
                onChange={e => handleUpdateColorArray(e.target.value, index)}
            />
        )
    }

    const style1 = {
        marginTop: "13px",
    }

    return (
        <div>
            <Row style={{ fontSize: 14, color: "#3B4248" }}>
                <Col>
                    <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
                    <Row style={{ marginLeft: "7px" }}>
                        {options.colors.map(renderColors)}
                    </Row>
                    <ButtonGroup style={{ marginTop: "10px" }} className="me-2" aria-label="First group">
                        <Button style={{ width: "30px" }} size="sm" variant="outline-secondary" onClick={removeColor}>-</Button>
                        <Button style={{ width: "30px" }} size="sm" variant="outline-secondary" onClick={addColor}>+</Button>
                    </ButtonGroup>
                </Col>
                <Col>
                    <Form.Label style={{ fontSize: 14 }} htmlFor="exampleColorInput">Font Family</Form.Label>
                    <Form.Select style={{ fontSize: 14, color: "#3B4248" }} value={options.fontFamily} aria-label="Default select example" onChange={e => { handleUpdateOptions('fontFamily', e.target.value) }}>
                        <option value="arial">Arial</option>
                        <option value="courier new">Courier New</option>
                        <option value="garamond">Garamond</option>
                        <option value="georgia">Georgia</option>
                        <option value="helvetica">Helvetica</option>
                        <option value="impact">Impact</option>
                        <option value="lucida console">Lucida Console</option>
                        <option value="times new roman">Times New Roman</option>
                        <option value="verdana">Verdana</option>
                    </Form.Select>
                    <Form.Label style={style1}>Min Font Size = {options.fontSizes[0]} px</Form.Label>
                    <Form.Range
                        min={1}
                        max={40}
                        variant={"dark"}
                        value={options.fontSizes[0]}
                        onChange={e => handleUpdateOptions('fontSizes', [e.target.value, options.fontSizes[1]])} />
                    <Form.Label style={style1}>Word Padding = {options.padding}</Form.Label>
                    <Form.Range
                        min={1}
                        max={5}
                        value={options.padding}
                        onChange={e => handleUpdateOptions('padding', e.target.value)} />
                </Col>
                <Col>
                    <Form.Label htmlFor="exampleColorInput">Word Scale</Form.Label>
                    <Form.Select style={{ fontSize: 14, color: "#3B4248" }} value={options.scale} aria-label="Default select example" onChange={e => { handleUpdateOptions('scale', e.target.value) }}>
                        <option value="linear">Linear</option>
                        <option value="log">Log</option>
                        <option value="sqrt">Sqrt</option>
                    </Form.Select>
                    <Form.Label style={style1}>Max Font Size = {options.fontSizes[1]} px</Form.Label>
                    <Form.Range
                        min={50}
                        max={100}
                        value={options.fontSizes[1]}
                        onChange={e => handleUpdateOptions('fontSizes', [options.fontSizes[0], e.target.value])} />
                    <Form.Label style={style1} min={1} max={5}>Word Rotations = {options.rotations}</Form.Label>
                    <Form.Range
                        min={1}
                        max={5}
                        value={options.rotations}
                        onChange={e => handleUpdateOptions('rotations', e.target.value)} />
                </Col>
            </Row>
        </div>

    );

}

export default OptionsAccordion;