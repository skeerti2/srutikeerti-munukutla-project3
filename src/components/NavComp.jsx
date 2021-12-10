import axios from 'axios';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect, useState } from 'react';

function NavComp(props) {
    // const [currentUser, setCurrentUser] = useState('');
    const user = localStorage.getItem('username');

    // function getLoggedIn() {
    //     axios.get('http://localhost:8000/auth/isLoggedIn')
    //         .then(response => {
    //             console.log("/isLoggedIn response:", response)
    //             console.log("current user is:", response.data.username)
    //             let newUser = response.data.username
    //             setCurrentUser(newUser);
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    // getLoggedIn()
    // // useEffect(getLoggedIn, []);
    // // useEffect(currentUser, "")

    function displayLoggedInDetails() {
            
    }

    console.log("rendering navbar");
    if(user){
        console.log("user is logged in and details are: " + user)
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Switch Up</Navbar.Brand>
                    <Container>
                        <Navbar.Brand>Hi! {user}</Navbar.Brand>
                    </Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">View Favorites</NavDropdown.Item>
                                {/* <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item> */}
                                {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }else{
    return (
        <Container>

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Switch Up</Navbar.Brand>
                    <Navbar bg="light">
                        
                    </Navbar>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Button>
                                <LinkContainer to="/logIn">
                                    <Nav.Link>Log In</Nav.Link>
                                </LinkContainer>
                            </Button>
                            <Button>
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