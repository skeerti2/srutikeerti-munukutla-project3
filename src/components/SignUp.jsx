import NavComp from "./NavComp";
import { Container, Button, Row, Form, Card } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import setCurrentUser from '../actions/User';
import { useNavigate } from "react-router";

function SignUp() {
    const [inputValidation, setbadInputValidation] = useState("")
    const [errorMsg, setErrorMsg] = useState('');



    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
        email: ''
    })

    const navigate = useNavigate();

    function handleNameChange(e) {
        const username = e.target.value
        setUserDetails({
            ...userDetails,
            username: username
        })
    }

    function handlePasswordChange(e) {
        const password = e.target.value
        setUserDetails({
            ...userDetails,
            password: password
        })
    }

    function handleEmailChange(e) {
        const email = e.target.value
        setUserDetails({
            ...userDetails,
            email: email
        })
    }

    function badInputErrors() {
        return (
            <Row>
                <h1>Please enter a valid username/password</h1>
            </Row>
        )
    }

    function handleSignUp(event) {
        event.preventDefault();
        console.log("post request from front end")
        if (!userDetails.username && !userDetails.password) {
            setbadInputValidation("username/password cannot be empty")
        } else {
            axios.post("/auth/signUp", userDetails, {
            headers: {
                'Content-Type': 'application/json'
              }
            },
              { withCredentials: true })
                .then(response => {
                    console.log("received a good response")
                    sessionStorage.setItem('username', response.data.username);
                    navigate("/")
                })
                .catch(error => {
                    //
                    if (error.response) {
                        console.log(error.response.data)
                        setErrorMsg(error.response.data)
                    }
                })
        }
    }

    // setErrorMsg("successfully registered new user", newUser)
    
    return (
        <Container>
            <NavComp></NavComp>
            <Row>
                <h1>{sessionStorage.getItem('username')}</h1>
                <h1>{inputValidation}</h1>
            </Row>
            <Row>
                <Form onSubmit={handleSignUp}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter user name</Form.Label>
                        <Form.Control type="username" placeholder="Enter your user name"
                            onChange={(e) => handleNameChange(e)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email address"
                            onChange={(e) => handleEmailChange(e)} />
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

export default SignUp;