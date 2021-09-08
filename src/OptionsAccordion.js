import React, { useState, useEffect } from 'react';
import { Button, Modal, Figure, Form, Row, Col, ButtonGroup } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import RangeSlider from 'react-bootstrap-range-slider';

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
        if (key === 'fontSizes') {
            setMinFontSize(value[0]);
            setMaxFontSize(value[1]);
        }
        if (key === 'padding') {
            setPadding(value);
        }
        if (key === 'rotations') {
            setRotations(value);
        }

        handleApplyOptions(updatedOptions);

    }

    const handleApplyOptions = (up) => {
        onApply(up);
        setShowModel(false);
    }


    const handleUpdateColorArray = (value, index) => {
        //setColorArray(options.colors);
        console.log(colorArray);
        colorArray[index] = value;
        console.log(colorArray);
        setColorArray(colorArray);
        handleUpdateOptions('colors', colorArray);
    }

    const renderColors = (color, index) => {
        //console.log("hello");
        //console.log(color);
        //console.log(index);
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

    return (
        <div>

            <Row style={{ marginLeft: "1px" }}>
                <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
                {options.colors.map(renderColors)}
                <ButtonGroup className="me-2" aria-label="First group">
                    <Button size="sm" variant="outline-secondary">-</Button>
                    <Button size="sm" variant="outline-secondary">+</Button>
                </ButtonGroup>
            </Row>
            {/*
            <Row style={{ marginTop: "5px" }}>
                <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
                <Col>
                    <Form.Control
                        type="color"
                        id="exampleColorInput"
                        value={options.colors[0]}
                        title="Choose your color"
                        onChange={e => handleUpdateColorArray(e.target.value, 0)}
                    />
                </Col>
                <Col>
                    <Form.Control
                        type="color"
                        id="exampleColorInput"
                        value={options.colors[1]}
                        title="Choose your color"
                        onChange={e => handleUpdateColorArray(e.target.value, 1)}
                    />
                </Col>
                <Col>
                    <Form.Control
                        type="color"
                        id="exampleColorInput"
                        value={options.colors[2]}
                        title="Choose your color"
                        onChange={e => handleUpdateColorArray(e.target.value, 2)}
                    />
                </Col>
                <Col>
                    <Form.Control
                        type="color"
                        id="exampleColorInput"
                        value={options.colors[3]}
                        title="Choose your color"
                        onChange={e => handleUpdateColorArray(e.target.value, 3)}
                    />
                </Col>
                <Col>
                    <Form.Control
                        type="color"
                        id="exampleColorInput"
                        value={options.colors[4]}
                        title="Choose your color"
                        onChange={e => handleUpdateColorArray(e.target.value, 4)}
                    />
                </Col>
                <Col>
                    <Form.Control
                        type="color"
                        id="exampleColorInput"
                        value={options.colors[5]}
                        title="Choose your color"
                        onChange={e => handleUpdateColorArray(e.target.value, 5)}
                    />
                </Col>
</Row> */}
            <Form style={{ marginTop: "20px" }}>
                <Form.Group as={Row}>
                    <Col xs="6">
                        <Form.Label htmlFor="exampleColorInput">Font Family</Form.Label>
                        <Form.Select value={options.fontFamily} aria-label="Default select example" onChange={e => { handleUpdateOptions('fontFamily', e.target.value) }}>
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
                    </Col>
                    <Col xs="6">
                        <Form.Label htmlFor="exampleColorInput">Word Scale</Form.Label>
                        <Form.Select value={options.scale} aria-label="Default select example" onChange={e => { handleUpdateOptions('scale', e.target.value) }}>
                            <option value="linear">Linear</option>
                            <option value="log">Log</option>
                            <option value="sqrt">Sqrt</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
            </Form>
            <Form style={{ marginTop: "20px" }}>
                <Form.Group as={Row}>
                    <Col xs="6">
                        <Form.Label>Min Font Size = {options.fontSizes[0]} px</Form.Label>
                        <Form.Range
                            value={options.fontSizes[0]}
                            onChange={e => handleUpdateOptions('fontSizes', [e.target.value, options.fontSizes[1]])} />
                    </Col>
                    <Col xs="6">
                        <Form.Label>Max Font Size = {options.fontSizes[1]} px</Form.Label>
                        <Form.Range
                            value={options.fontSizes[1]}
                            onChange={e => handleUpdateOptions('fontSizes', [options.fontSizes[0], e.target.value])} />
                    </Col>
                </Form.Group>
            </Form>
            <Form style={{ marginTop: "20px" }}>
                <Form.Group as={Row}>
                    <Col xs="6">
                        <Form.Label >Word Padding = {options.padding}</Form.Label>
                        <Form.Range
                            min={1}
                            max={5}
                            value={options.padding}
                            onChange={e => handleUpdateOptions('padding', e.target.value)} />
                    </Col>
                    <Col xs="6">
                        <Form.Label min={1} max={5}>Word Rotations = {options.rotations}</Form.Label>
                        <Form.Range
                            min={1}
                            max={5}
                            value={options.rotations}
                            onChange={e => handleUpdateOptions('rotations', e.target.value)} />
                    </Col>
                </Form.Group>
            </Form>
        </div>

    );

}

export default OptionsAccordion;