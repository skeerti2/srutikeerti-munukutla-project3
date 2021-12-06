import NavComp from './NavComp.jsx';
import { useState } from 'react';
import axios, { Axios } from 'axios';
import { Container, Button, Row, Form, Card, H1 } from 'react-bootstrap';

function Homepage() {
    const [formValue, setFormValue] = useState('Enter job title');
    const [jobResults, setJobSearchResults] = useState([])
    function handleSubmit(event) {
        event.preventDefault();
        console.log('formValue is: ', formValue)
        axios.get('http://localhost:8000/api/job/getJobByTitle/' + formValue)
            .then(response => setJobSearchResults(response.data))
            .catch(error => console.log(error))
    }

    function cardClickSubmit(event){
        event.preventDefault()
        axios.get('http://localhost:8000/api/job/getJobByTitle/' + formValue)
            .then(response => setJobSearchResults(response.data))
            .catch(error => console.log(error))

    }

    //NOT SURE
    let jobsListCards = jobResults.map(job => {
        return (
                <Card onClick={cardClickSubmit} style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{job.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{job.companyName}</Card.Subtitle>
                        <Card.Text>
                        <icon class="fas fa-map-marker-alt"></icon>{job.location}
                         </Card.Text>
                            <Card.Link href="/JobDetails">View Job Details</Card.Link>
                    </Card.Body>
                </Card>
        )
    })

    return (
        <Container>
            <NavComp></NavComp>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Search Job Posting</Form.Label>
                        <Form.Control type="title" placeholder={formValue}
                            onChange={(e) =>
                                setFormValue(e.target.value)} />

                    </Form.Group>
                    <Button type="submit">
                        Submit
                    </Button>
                </Form>
                </Row>

            <Row>
                <h1>Showing jobs for: {formValue === '' ? '' : formValue}</h1>
                {jobsListCards}
            </Row>
                
        </Container>
    )
}

export default Homepage;