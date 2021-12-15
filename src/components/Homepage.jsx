import NavComp from './NavComp.jsx';
import { useState } from 'react';
import axios from 'axios';
import { Container, Button, Row, Form, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLevelUpAlt } from '@fortawesome/free-solid-svg-icons'

import { useNavigate} from 'react-router-dom';

function Homepage(props) {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState('Enter job title');
    const [jobResults, setJobSearchResults] = useState([]);
    
    function handleSubmit(event) {
        event.preventDefault();
        console.log('formValue is: ', formValue)
        axios.get('/api/job/getJobLikeTitle/' + formValue,  {withCredentials: true})
            .then(response => setJobSearchResults(response.data))
            .catch(error => console.log(error))
    }

    function cardClickSubmit(event) {
        event.preventDefault()
        const jobValue = event.target.value
        axios.get('/api/job/getJobByTitle/' + jobValue,  {withCredentials: true})
            .then(response => setJobSearchResults(response.data))
            .catch(error => console.log(error))

    }

    //NOT SURE
    let jobsListCards = jobResults.map(job => {
        return (
            <Card className="searchResultCard" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{job.companyName}</Card.Subtitle>
                    <Card.Text>
                        <icon class="fas fa-map-marker-alt"></icon>{job.location}
                    </Card.Text>
                    <Button variant="outline-dark" onClick={() => {
                            navigate('/jobDetails/' + job._id)
                    }}>View Details </Button>
                </Card.Body>
            </Card>
        )
    })

    console.log(jobResults.length)
    let displayJobsListCards = jobResults.length > 0 ? 
            <Row className="topBox">
                <h1>Showing jobs for: {formValue === '' ? '' : formValue}</h1>
                        {jobsListCards}
            </Row> : ''

    return (
        <Container>
            <NavComp></NavComp>
            <Row>
                <section class="banner">
                    <h1 className="banner-title">Switch<FontAwesomeIcon icon={faLevelUpAlt}/>Up  </h1>
                    <h5>Making dreams a reality</h5>
                </section>
            </Row>
            {/* <h1>Hi there, {sessionStorage.getItem('username')}</h1> */}
            <Row className="topBox">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Search Job Posting</Form.Label>
                        <Form.Control className="search-control" type="title" placeholder={formValue}
                            onChange={(e) =>
                                setFormValue(e.target.value)} />
                    </Form.Group>
                    <Button type="submit" variant="outline-dark">
                        Submit
                    </Button>
                </Form>
            </Row>
            {displayJobsListCards}
        
        </Container>
    )
}

export default Homepage;