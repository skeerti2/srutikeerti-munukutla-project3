import NavComp from './NavComp.jsx';
import { Container, Button, Row, Form } from 'react-bootstrap';



function Homepage() {
    return (
        <Container>
            <NavComp></NavComp>
            <Row>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Search Job Posting</Form.Label>
                        <Form.Control type="jobtitle" placeholder="Enter job title" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

export default Homepage;