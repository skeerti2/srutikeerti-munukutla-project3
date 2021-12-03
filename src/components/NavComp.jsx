import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';

function NavComp() {
    return (
        <Container>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Switch Up</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Button><Nav.Link href="#home">Log In</Nav.Link></Button>
                        <Button><Nav.Link href="#link">Sign Up</Nav.Link></Button>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </Container>
    )
}


export default NavComp;