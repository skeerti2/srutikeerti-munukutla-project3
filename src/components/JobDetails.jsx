import NavComp from './NavComp';
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


function JobDetails() {

    const [jobDetails, setJobDetails] = useState(null)
    const navigate = useNavigate()
    let { jobId } = useParams();
    const [isFavorite, setIsFavorite] = useState(false)

    function getJobFromId() {
        axios.get('/api/job/getJobById/' + jobId)
            .then(response => {
                console.log(response)

                setJobDetails(response.data)
            })
            .catch(error => console.log(error))
    }

    function getUserFavorites() {
        console.log("calling function")
        if (jobId) {
            axios.get('/api/user/getAllFavorites/' + sessionStorage.getItem('username'))
                .then(response => {
                    console.log(response.data)
                    response.data.favoriteJobs.forEach(job => {
                        if (jobId === job._id) {
                            console.log("ok, favorited")
                            setIsFavorite(true)
                        }
                    });
                })
                .catch(error => console.log(error))
        }
    }

    useEffect(getJobFromId, [])
    useEffect(getUserFavorites, [])

    console.log(jobId);


    function addJobToFavourites() {
        //NOTE: using local state gives null for favorite details. Accessing immediately after setting local state
        // fails since its asynchronous. So this making this a local variable instead
        //Use localState only if it is for display/rendering
        const favoriteDetails = { username: sessionStorage.getItem('username'), jobDetails: jobDetails }
        if (sessionStorage.getItem('username')) {
            console.log('before axios')
            console.log(favoriteDetails);
            axios.put("/api/user/addToUserFavourite", favoriteDetails)
                .then(response => {
                    setIsFavorite(true)
                    console.log(response)
                })
                .catch(error => console.log(error))
        }
    }

    function redirectToLogIn() {
        navigate('/logIn')
    }

    function editJobDetails() {
        navigate('/createJob/' + jobDetails._id)
    }

    //
    function deleteForm() {
        console.log("delete the job")
        // axios.delete('/api/job/deleteByjobId/'+jobId)
        // .then(response => console.log(response))
        // .catch(error => console.log(error));
    }

    function showEditDetails() {
        console.log("jobDetails.createdBy: " + jobDetails.createdBy)
        if (sessionStorage.getItem('username') === jobDetails.createdBy) {
            return (
                <div className="detailsButtons">
                    <Button variant="outline-dark" type="submit" onClick={editJobDetails}
                        id="buttonEdit">
                        Edit Job
                </Button>

                    <Button variant="outline-dark" type="submit" onClick={deleteForm} id="buttonDelete">
                        Delete Job
                </Button>
                </div>
            )
        }
    }

    function loggedInCard() {
        if (jobDetails) {
            return (
                <Container>
                    <NavComp></NavComp>
                    <Row className="topBox">
                        <Card >
                            <Card.Header> <h2> {jobDetails.companyName} &nbsp;
                            {
                                    isFavorite ?
                                        <Button variant="outline-dark">
                                            Favorite &nbsp;
                                <FontAwesomeIcon icon={solidHeart}
                                            />
                                        </Button>
                                        :
                                        <Button variant="outline-dark" onClick={addJobToFavourites}>
                                            Add Job to Favorites &nbsp;
                            <FontAwesomeIcon icon={faHeart}
                                            />
                                        </Button>
                                }
                            </h2>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{jobDetails.title}</Card.Title>
                                <Card.Text>
                                    <div>
                                        <h5>Description: {jobDetails.description}</h5>
                                        <h5>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        &nbsp;
                                     {jobDetails.location}</h5>
                                        <p>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        &nbsp;
                                    {jobDetails.employerMailContact}</p>
                                        <p>More: {jobDetails.companyWebsite}</p>
                                    </div>

                                </Card.Text>
                                {showEditDetails()}
                            </Card.Body>
                            <Card.Footer className="text-muted">Posted On: {jobDetails.postingDate}</Card.Footer>
                        </Card>
                    </Row>
                </Container>
            )
        } else {
            return (
                <Container>
                    <NavComp>
                        <Row>
                            <h1>Job Details: </h1>
                        </Row>
                    </NavComp>
                </Container>
            )
        }
    }

    function loggedOutCard() {
        if (jobDetails) {
            return (
                <Container>
                    <NavComp></NavComp>
                    <Row className="topBox">
                        <Card >
                            <Card.Header> <h2> {jobDetails.companyName} &nbsp;
                            <Button variant="outline-dark" onClick={redirectToLogIn}>
                                    Add Job to Favorites &nbsp;
                                <FontAwesomeIcon icon={faHeart}
                                    />
                                </Button>
                            </h2>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{jobDetails.title}</Card.Title>
                                <Card.Text>
                                    <div>
                                        <h5>Description: {jobDetails.description}</h5>
                                        <h5>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                                            &nbsp;
                                         {jobDetails.location}</h5>
                                        <p>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                            &nbsp;
                                        {jobDetails.employerMailContact}</p>
                                        <p>More: {jobDetails.companyWebsite}</p>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">Posted On: {jobDetails.postingDate}</Card.Footer>
                        </Card>
                    </Row>
                </Container>
            )
        } else {
            return (
                <Container>
                    <NavComp>
                        <Row>
                            <h1>Job Details: </h1>
                        </Row>
                    </NavComp>
                </Container>
            )
        }
    }

    if (sessionStorage.getItem('username')) {
        return loggedInCard()
    } else {
        return loggedOutCard()
    }
}


export default JobDetails;