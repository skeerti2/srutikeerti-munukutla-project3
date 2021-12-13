import NavComp from './NavComp.jsx';
import { useState } from 'react';
import axios from 'axios';
import { Container, Button, Row, Form, Card } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';

function Homepage(props) {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState('Enter job title');
    const [jobResults, setJobSearchResults] = useState([]);
    
    function handleSubmit(event) {
        event.preventDefault();
        console.log('formValue is: ', formValue)
        axios.get('http://localhost:8000/api/job/getJobLikeTitle/' + formValue)
            .then(response => setJobSearchResults(response.data))
            .catch(error => console.log(error))
    }

    function cardClickSubmit(event) {
        event.preventDefault()
        const jobValue = event.target.value
        axios.get('http://localhost:8000/api/job/getJobByTitle/' + jobValue)
            .then(response => setJobSearchResults(response.data))
            .catch(error => console.log(error))

    }

    //NOT SURE
    let jobsListCards = jobResults.map(job => {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{job.companyName}</Card.Subtitle>
                    <Card.Text>
                        <icon class="fas fa-map-marker-alt"></icon>{job.location}
                    </Card.Text>
                    <Button onClick={() => {
                        axios.get('http://localhost:8000/api/job/getJobById/' + job._id)
                        .then(response => {
                            console.log(response.data)
                            props.toSetJobDetails(response.data)
                        })
                        .catch(error => console.log(error))
                    }}>View Details </Button>
                </Card.Body>
            </Card>
        )
    })

    return (
        <Container>
            <NavComp></NavComp>
            <h1>Hi there, {sessionStorage.getItem('username')}</h1>
            <Row className="topBox">
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

            <Row className="topBox">
                <h1>Showing jobs for: {formValue === '' ? '' : formValue}</h1>
                {jobsListCards}
            </Row>

        </Container>
    )
}

export default Homepage;