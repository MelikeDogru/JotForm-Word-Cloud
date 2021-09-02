import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';


const Header = (props) => {
    return (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">JotForm Word Cloud </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <div>
                        {props.login ?
                        <Nav className="me-auto"> 
                            <Nav.Link href="/myforms">My Forms</Nav.Link>
                            <NavDropdown title={props.name} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav> :  <Nav></Nav>}
                    </div>
                    </Navbar.Collapse> 
                </Container>
            </Navbar>

        </div>
    )
}

export default Header;
