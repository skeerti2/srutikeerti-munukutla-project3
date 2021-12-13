import NavComp from './NavComp';
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap';
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios';


function JobDetails(props) {

    const [favoriteDetails, setFavoriteDetails] = useState(null)
    function displayEdit(){
        console.log(props.jobDetails.createdBy)
        console.log(sessionStorage.getItem('username'))
        if(props.jobDetails.createdBy === sessionStorage.getItem('username')){
            return (
            <Button variant="primary" type="submit">
                Edit
            </Button>
            )
        }
    }
    
    function addJobToFavourites(){
        //NOTE: using local state gives null for favorite details. Accessing immediately after setting local state
        // fails since its asynchronous. So this making this a local variable instead
        //Use localState only if it is for display/rendering
        const favoriteDetails = {username: sessionStorage.getItem('username'), jobDetails: props.jobDetails}
        if(sessionStorage.getItem('username')){
            console.log('before axios')
            console.log(favoriteDetails);
            axios.put("http://localhost:8000/api/user/addToUserFavourite", favoriteDetails)
            .then(response => console.log(response))
            .catch(error => console.log(error))
        }
    }
    function loggedInCard() {
        return (
            <Container>
                <NavComp></NavComp>
                <Row className="topBox">
                    <Card >
                        <Card.Header><h2>{props.jobDetails.companyName}</h2>
                        <Button variant="outline-dark" onClick={addJobToFavourites}>
                            Add Job to Favorites <FontAwesomeIcon icon={faHeart} />
                        </Button>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{props.jobDetails.title}</Card.Title>
                            <Card.Text>
                                <div>
                                    <h5>Description: {props.jobDetails.description}</h5>
                                    <h5><FontAwesomeIcon icon={faMapMarkerAlt} />  {props.jobDetails.location}</h5>
                                    <p><FontAwesomeIcon icon={faEnvelope} /> {props.jobDetails.employerMailContact}</p>
                                    <p>More: {props.jobDetails.companyWebsite}</p>
                                </div>
                            
                            </Card.Text>
                            {displayEdit}
                            </Card.Body>
                        <Card.Footer className="text-muted">Posted On: {props.jobDetails.postingDate}</Card.Footer>
                    </Card>
                </Row>
            </Container>
        )
    }

    function loggedOutCard() {
        return (
            <Container>
                <NavComp></NavComp>
                <Row>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Title: {props.jobDetails.title} </Form.Label>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCompanyName">
                                <Form.Label>Company Name: {props.jobDetails.companyName}</Form.Label>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formJobPostingDate">
                            <Form.Label>Job Posting Date: {props.jobDetails.postingDate}</Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control placeholder={props.jobDetails.location} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmployerEmail">
                                <Form.Label>Employer Email Contact</Form.Label>
                                <Form.Control placeholder={props.jobDetails.employerMailContact} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formCompanyWebsite">
                                <Form.Label>Company Website</Form.Label>
                                <Form.Control placeholder={props.jobDetails.companyWebsite} />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
        )
    }

    if (sessionStorage.getItem('username')) {
        return loggedInCard()
    } else {
        return loggedOutCard()
    }
}


export default JobDetails;