import React, { useState, useEffect } from 'react';
import { Button, Modal, Figure, Form, Row, Col } from 'react-bootstrap';


function Options({ options, onApply }) {

    const [showModel, setShowModel] = useState(false);
    const [draftOptions, setDraftOptions] = useState(options);
    const [color, setColor] = useState('#fff');

    const [colorArray, setColorArray] = useState(options.colors);

    const [minFontSize, setMinFontSize] = useState(options.fontSizes[0]);
    const [maxFontSize, setMaxFontSize] = useState(options.fontSizes[1]);
    const [padding, setPadding] = useState(options.padding);
    const [rotations, setRotations] = useState(options.rotations);
    const [minRotationAngle, setMinRotationAngle] = useState(options.rotationAngles[0]);
    const [maxRotationAngle, setMaxRotationAngle] = useState(options.rotationAngles[1]);

    const handleChangeComplete = (color) => {
        setColor(color.hex);
        console.log(color.hex);
    }

    const handleClose = () => {
        setShowModel(false);
    }

    const handleShow = () => {
        setShowModel(true);
    }

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
        if (key === 'rotationAngles') {
            setMinRotationAngle(value[0]);
            setMaxRotationAngle(value[1]);
        }

    }

    const handleApplyOptions = () => {
        onApply(draftOptions);
        setShowModel(false);
    }

    const onChange = (e) => {
        setColor(e.target.value);
        console.log(e.target.value);
        console.log(options);
    }

    const handleUpdateColorArray = (value, index) => {
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
                type="color"
                id="exampleColorInput"
                defaultValue={color}
                title="Choose your color"
                onChange={e => handleUpdateColorArray(e.target.value, index)}
            />
        )
    }

    const model = (
        <Modal show={showModel} onSubmit={handleApplyOptions} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Change the Design of Word Cloud</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <SketchPicker color={color} onChangeComplete={handleChangeComplete} /> */}
                <Row>
                    <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
                    <Col xs="6">
                        {options.colors.map(renderColors)}
                    </Col>
                </Row>
                <Row style={{ marginTop: "20px" }}>
                    <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
                    <Col>
                        <Form.Control
                            type="color"
                            id="exampleColorInput"
                            defaultValue={colorArray[0]}
                            title="Choose your color"
                            onChange={e => handleUpdateColorArray(e.target.value, 0)}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="color"
                            id="exampleColorInput"
                            defaultValue={colorArray[1]}
                            title="Choose your color"
                            onChange={e => handleUpdateColorArray(e.target.value, 1)}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="color"
                            id="exampleColorInput"
                            defaultValue={colorArray[2]}
                            title="Choose your color"
                            onChange={e => handleUpdateColorArray(e.target.value, 2)}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="color"
                            id="exampleColorInput"
                            defaultValue={colorArray[3]}
                            title="Choose your color"
                            onChange={e => handleUpdateColorArray(e.target.value, 3)}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="color"
                            id="exampleColorInput"
                            defaultValue={colorArray[4]}
                            title="Choose your color"
                            onChange={e => handleUpdateColorArray(e.target.value, 4)}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="color"
                            id="exampleColorInput"
                            defaultValue={colorArray[5]}
                            title="Choose your color"
                            onChange={e => handleUpdateColorArray(e.target.value, 5)}
                        />
                    </Col>
                   
                </Row>
                <Form style={{ marginTop: "20px" }}>
                    <Form.Group as={Row}>
                        <Col xs="6">
                            <Form.Label htmlFor="exampleColorInput">Font Family</Form.Label>
                            <Form.Select defaultValue={options.fontFamily} aria-label="Default select example" onChange={e => { handleUpdateOptions('fontFamily', e.target.value) }}>
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
                            <Form.Label htmlFor="exampleColorInput">Font Style</Form.Label>
                            <Form.Select defaultValue={options.fontStyle} aria-label="Default select example" onChange={e => { handleUpdateOptions('fontStyle', e.target.value) }}>
                                <option value='italic'>Italic</option>
                                <option value='normal'>Normal</option>
                                <option value='oblique'>Oblique</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Form>
                <Form style={{ marginTop: "20px" }}>
                    <Form.Group as={Row}>
                        <Col xs="6">
                            <Form.Label htmlFor="exampleColorInput">Font Weight</Form.Label>
                            <Form.Select defaultValue={options.fontWeight} aria-label="Default select example" onChange={e => { handleUpdateOptions('fontWeight', e.target.value) }}>
                                <option value="bold">Bold</option>
                                <option value="normal">Normal</option>
                            </Form.Select>
                        </Col>
                        <Col xs="6">
                            <Form.Label htmlFor="exampleColorInput">Word Scale</Form.Label>
                            <Form.Select defaultValue={options.scale} aria-label="Default select example" onChange={e => { handleUpdateOptions('scale', e.target.value) }}>
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
                            <Form.Label>Min Font Size = {minFontSize} px</Form.Label>
                            <Form.Range
                                value={minFontSize}
                                onChange={e => handleUpdateOptions('fontSizes', [e.target.value, maxFontSize])} />
                        </Col>
                        <Col xs="6">
                            <Form.Label>Max Font Size = {maxFontSize} px</Form.Label>
                            <Form.Range
                                value={maxFontSize}
                                onChange={e => handleUpdateOptions('fontSizes', [minFontSize, e.target.value])} />
                        </Col>
                    </Form.Group>
                </Form>
                <Form style={{ marginTop: "20px" }}>
                    <Form.Group as={Row}>
                        <Col xs="6">
                            <Form.Label >Word Padding = {padding}</Form.Label>
                            <Form.Range
                                min={1}
                                max={5}
                                value={padding}
                                onChange={e => handleUpdateOptions('padding', e.target.value)} />
                        </Col>
                        <Col xs="6">
                            <Form.Label min={1} max={5}>Word Rotations = {rotations}</Form.Label>
                            <Form.Range
                                min={1}
                                max={5}
                                value={rotations}
                                onChange={e => handleUpdateOptions('rotations', e.target.value)} />
                        </Col>
                    </Form.Group>
                </Form>
                <Form style={{ marginTop: "20px" }}>
                    <Form.Group as={Row}>
                        <Col xs="6">
                            <Form.Label>Min Rotation Angle = {minRotationAngle}</Form.Label>
                            <Form.Range
                                min={0}
                                max={180}
                                value={minRotationAngle}
                                onChange={e => handleUpdateOptions('rotationAngles', [e.target.value, maxRotationAngle])} />
                        </Col>
                        <Col xs="6">
                            <Form.Label>Max Rotation Angle = {maxRotationAngle}</Form.Label>
                            <Form.Range
                                min={0}
                                max={180}
                                value={maxRotationAngle}
                                onChange={e => handleUpdateOptions('rotationAngles', [minRotationAngle, e.target.value])} />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button size="sm" variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button size="sm" variant="dark" onClick={handleApplyOptions}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal >
    );

    return (
        <>
            <Button size="sm" variant="dark" onClick={handleShow}>Options</Button>
            {model}
        </>


    );

}

export default Options;