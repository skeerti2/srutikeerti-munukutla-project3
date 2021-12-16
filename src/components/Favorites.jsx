import axios from 'axios';
import { useEffect, useState } from 'react';
import NavComp from '../components/NavComp'
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'


function Favorites() {
    const sessionUser = sessionStorage.getItem('username');
    const [favoriteJobs, setFavoriteJobs] = useState([])
    const navigate = useNavigate()
    function getFavoriteJobsForUser() {
        console.log("calling function")
        axios.get('/api/user/getAllFavorites/'+ sessionUser, {withCredentials: true})
            .then(response => {
                console.log(response.data)
                setFavoriteJobs(response.data.favoriteJobs)
            })
            .catch(error => console.log(error))
    }

    useEffect(getFavoriteJobsForUser, []);

    const favoritesTodisplay = favoriteJobs.map(item => {
        return (
            <Card style={{ width: '18rem' }} className="shadow p-3 mb-5 bg-white rounded">
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{item.companyName}</Card.Subtitle>
                    <Card.Text>
                        <icon class="fas fa-map-marker-alt"></icon>{item.location}
                    </Card.Text>
                    <Button variant="outline-dark" onClick={() => {
                        navigate('/jobDetails/'+item._id)
                    }}>View Details </Button>
                </Card.Body>
            </Card>
        )
    })

    function display(){
        if(favoritesTodisplay.length !== 0){
            return (
                <h1>{sessionUser}, here are your favorite jobs</h1>
            )
        }else{
            return(
            <div className="topRow">
            <h1>{sessionUser}, you have no favorite jobs yet!</h1>
            <h1> <FontAwesomeIcon icon={faFrown}/></h1>
            </div>
            
            )
        }
    }

    return (
        <Container>
            <NavComp></NavComp>
            <Row className="topBox">
                {display()}
                <div className="searchCards">
                    {favoritesTodisplay}
                </div>
            </Row>
        </Container>
    )
}

export default Favorites;