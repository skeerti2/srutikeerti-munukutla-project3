import NavComp from "./NavComp";
import { Container, Button, Row, Form, Card } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

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
            <Row className="topRow">
                <h1>{errorMsg}</h1>
                <h1>{inputValidation}</h1>
            </Row>

            <Card className="shadow-lg p-3 mb-5 bg-white rounded authFormCard">
            <Row>
                <Form onSubmit={handleSignUp}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter user name</Form.Label>
                        <Form.Control required type="username" placeholder="Enter your user name"
                            onChange={(e) => handleNameChange(e)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter Email Address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter your email address"
                            onChange={(e) => handleEmailChange(e)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
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

export default SignUp;