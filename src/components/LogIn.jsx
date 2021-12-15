import NavComp from "./NavComp";
import { Container, Button, Row, Form, Card } from 'react-bootstrap';
import axios, { Axios } from 'axios';
import { useState} from 'react'
import {useNavigate} from 'react-router-dom'

function LogIn() {
    const [inputValidation, setbadInputValidation] = useState("")
    const [errorMsg, setErrorMsg] = useState('');
    const [userLogInDetails, setUserDetails] = useState({
        username: '',
        password: '',
    })
    const navigate = useNavigate();

    function handleNameChange(e) {
        const username = e.target.value
        setUserDetails({
            ...userLogInDetails,
            username: username
        })
    }

    function handlePasswordChange(e) {
        const password = e.target.value
        setUserDetails({
            ...userLogInDetails,
            password: password
        })
    }


    function handleLogIn(event) {
        event.preventDefault();
        console.log("post request from front end", userLogInDetails)
        if (!userLogInDetails.username && !userLogInDetails.password) {
            setbadInputValidation("username/password cannot be empty")
        } else {
            axios.post("/auth/logIn", userLogInDetails, {withCredentials: true})
                .then(response => {
                    console.log(response)
                    sessionStorage.setItem('username', response.data.username);
                    navigate('/');

                    // setErrorMsg("successfully set username for: "+ response.data.username)
                        //do a redirect                    
                })
                .catch(error => {
                    console.log(error)
                    setErrorMsg(error.response.data)
                })
        }
    }

    return (
        <Container>
             <NavComp></NavComp>
            <Row className="topRow">
                <h1>{errorMsg}</h1>
                <h1>{inputValidation}</h1>
            </Row>

            <Card className="shadow-lg p-3 mb-5 bg-white rounded authFormCard">
            <Row>
                <Form onSubmit={handleLogIn}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Please enter user name</Form.Label>
                        <Form.Control required type="username" placeholder="Enter your user name"
                            onChange={(e) => handleNameChange(e)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Enter password</Form.Label>
                        <Form.Control required type="password" placeholder="Password"
                            onChange={(e) => handlePasswordChange(e)} />
                    </Form.Group>
                    <Button variant="outline-dark" type="submit">
                        Submit
                    </Button>
                </Form>
            </Row>
            </Card>
           
            </Container>
    )
}

export default LogIn;