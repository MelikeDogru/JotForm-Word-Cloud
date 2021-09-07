import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useHistory } from "react-router-dom";


const Header = (props) => {

    let history = useHistory();
    const jotform = window.JF;

    const logoutClick = () => {
        console.log("logout");
        jotform.logout();
        localStorage.removeItem('apikey');
        history.push('/');
    }

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
                                <NavDropdown.Item onClick={logoutClick}>Logout</NavDropdown.Item>
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
