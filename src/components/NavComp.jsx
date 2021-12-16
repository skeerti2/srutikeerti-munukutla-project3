import axios from 'axios';
import { Navbar, Container, Nav, NavDropdown, Button, Form, FormControl} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLevelUpAlt } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../jobportal.css';

function NavComp() {
    const user = sessionStorage.getItem('username');
    const navigate = useNavigate()

    function handleLogout(event) {
        console.log("handle logout")
        axios.get('/auth/logout', {withCredentials: true})
        .then(response =>
            {
                sessionStorage.removeItem('username')
                sessionStorage.clear()
                navigate('/')
            })
        .catch(error => console.log(error))
    }

    console.log("rendering navbar");
    if (user) {
        return (
            <Navbar className="nav" expand="lg">
                <Container>
                    <Navbar.Brand className="brand-icon-text" href="/">Switch<FontAwesomeIcon icon={faLevelUpAlt}/>Up</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link href="/favorites">Favorites</Nav.Link>
                            <NavDropdown title={"Hi!  " + user} id="basic-nav-dropdown">
                            <NavDropdown.Item href={'/createJob/' + null}>Create a Job</NavDropdown.Item>
                                {/* <NavDropdown.Item href="#action/3.1">View Favorites</NavDropdown.Item> */}
                                {/* <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item> */}
                                {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <Button type="submit" onClick={handleLogout}variant="outline-success">Logout</Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    } else {
        return (
            <Container>

                <Navbar className="nav" expand="lg">
                    <Container>
                    <Navbar.Brand className="brand-icon-text" href="/">Switch<FontAwesomeIcon icon={faLevelUpAlt}/>Up</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">

                                <Button className="logInButton" variant="outline-light">
                                    <LinkContainer to="/logIn">
                                        <Nav.Link>Log In</Nav.Link>
                                    </LinkContainer>
                                </Button>
                                <Button className="submitButton" variant="outline-light">
                                    <LinkContainer to="/signUp">
                                        <Nav.Link>Sign Up</Nav.Link>
                                    </LinkContainer>
                                </Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
        )
    }
}


export default NavComp;