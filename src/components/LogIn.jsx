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
            axios.post("http://localhost:8000/auth/logIn", userLogInDetails)
                .then(response => {
                    console.log(response)
                    sessionStorage.setItem('username', response.data.username);
                    navigate('/');

                    // setErrorMsg("successfully set username for: "+ response.data.username)
                        //do a redirect                    
                })
                .catch(error => {
                    console.log(error)
                    // setErrorMsg(error.response.data)
                })
        }
    }

    return (
        <Container>
             <NavComp></NavComp>
            <Row>
                <h1>{errorMsg}</h1>
                <h1>{inputValidation}</h1>
            </Row>
            <Row>
                <Form onSubmit={handleLogIn}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter user name</Form.Label>
                        <Form.Control type="username" placeholder="Enter your user name"
                            onChange={(e) => handleNameChange(e)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            onChange={(e) => handlePasswordChange(e)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Row>
           
            </Container>
    )
}

export default LogIn;