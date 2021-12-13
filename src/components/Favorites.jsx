import axios from 'axios';
import { useEffect, useState } from 'react';
import NavComp from '../components/NavComp'
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'


function Favorites() {
    const sessionUser = sessionStorage.getItem('username');
    const [favoriteJobs, setFavoriteJobs] = useState([])

    function getFavoriteJobsForUser() {
        console.log("calling function")
        axios.get('/api/user/getAllFavorites/'+ sessionUser)
            .then(response => {
                console.log(response.data)
                setFavoriteJobs(response.data.favoriteJobs)
            })
            .catch(error => console.log(error))
    }

    useEffect(getFavoriteJobsForUser, []);

    const favoritesTodisplay = favoriteJobs.map(item => {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{item.companyName}</Card.Subtitle>
                    <Card.Text>
                        <icon class="fas fa-map-marker-alt"></icon>{item.location}
                    </Card.Text>
                    <Button onClick={() => {
                        axios.get('/api/job/getJobById/' + item._id)
                        .then(response => {
                            console.log(response.data)

                            //props.toSetJobDetails(response.data)
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
            {console.log("calling inside return")}
            <Row className="topBox">
                <h1>{sessionUser}, here are your favorite jobs</h1>
                {favoritesTodisplay}
            </Row>
        </Container>
    )
}

export default Favorites;