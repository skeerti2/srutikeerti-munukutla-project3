import NavComp from './NavComp';
import axios from 'axios';
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




function JobCreate() {
    let { jobId } = useParams();
    const navigate = useNavigate()
    const [jobDetails, setJobDetails] = useState(null);
    const [fileName, setFileName] = useState("Upload Company Logo File");
    const [jobPostingDate, setJobPostingDate] = useState(new Date());
    console.log(jobId === "null")

    function getJobDetails() {
        if (jobId !== "null") {
            axios.get('/api/job/getJobById/' + jobId)
                .then(response => setJobDetails(response.data))
                .catch(error => console.log(error))
        }
    }

    useEffect(getJobDetails, [])

    function handleTitleChange(e) {
        const title = e.target.value
        setJobDetails({
            ...jobDetails,
            title: title
        })
    }

    function handleCompanyChange(e) {
        const company = e.target.value
        setJobDetails({
            ...jobDetails,
            companyName: company
        })
    }

    function handleJobPostingDateChange(e) {
        const jobPostingDate = e.target.value
        setJobDetails({
            ...jobDetails,
            postingDate: jobPostingDate
        })
    }

    function handleFileUpload(event) {
        console.log(event.target.files[0])
        setFileName(event.target.files[0])
        setJobDetails({
            ...jobDetails,
            companyImage: fileName
        })
    }

    function handleLocationChange(e) {
        const location = e.target.value
        setJobDetails({
            ...jobDetails,
            location: location
        })
    }

    function handleJobDescription(e) {
        const description = e.target.value
        setJobDetails({
            ...jobDetails,
            description: description
        })
    }

    function handleEmployerEmailChange(e) {
        const employerEmail = e.target.value
        setJobDetails({
            ...jobDetails,
            employerMailContact: employerEmail
        })
    }

    function handleCompanyWebsiteChange(e) {
        const companyWebsite = e.target.value
        setJobDetails({
            ...jobDetails,
            companyWebsite: companyWebsite
        })
    }


    function handleCreateJob(event) {
        event.preventDefault();
        setJobDetails({
            ...jobDetails,
            createdBy: sessionStorage.getItem('username')
        })

        console.log("post request from front end", jobDetails)
        axios.post("/api/job/createjob", jobDetails)
            .then(response => {
                console.log(response.data)
                navigate('/jobDetails/' + response.data._id)

            })
            .catch(error => {
                console.log(error)
                // setErrorMsg(error.response.data)
            })
    }

    function handleUpdateJob(event) {
        event.preventDefault();
        console.log("put request from front end", jobDetails)
        setJobDetails({
            ...jobDetails,
            createdBy: sessionStorage.getItem('username')
        })
        axios.put("/api/job/updateJob", jobDetails)
            .then(response => {
                console.log(response.data)
                navigate('/jobDetails/' + response.data._id)

            })
            .catch(error => {
                console.log(error)
                // setErrorMsg(error.response.data)
            })
    }

   


    if (jobId !== "null") {
        if (!jobDetails) {
            return (
                <Container>
                    <NavComp>
                    </NavComp>
                    <Row>
                        <h1>Create a Job</h1>
                    </Row>
                </Container>
            )
        } else {
            return (
                <Container>
                    <NavComp></NavComp>
                    <Row className="topBox">
                        <Form onSubmit={handleUpdateJob}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control required type="title" placeholder={jobDetails.title}
                                        value={jobDetails.title}
                                        onChange={(e) => handleTitleChange(e)} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCompanyName">
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control required type="company" placeholder={jobDetails.companyName}
                                        value={jobDetails.companyName}
                                        onChange={(e) => handleCompanyChange(e)} />
                                </Form.Group>
                            </Row>

                            {/* <Form.Group className="mb-3" controlId="formJobPostingDate">
                                    <Form.Label>Job Posting Date</Form.Label>
                                    <DatePicker required selected={jobPostingDate} onChange={(date) => setJobPostingDate(date)} />
                                    {/* <Form.Control type="jobPostingDate" placeholder="Enter Posting Date" 
                                    onChange={(e) => handleJobPostingDateChange(e)}/> 
                                </Form.Group> */}

                            <Form.Group className="mb-3" controlId="formGridLocation">
                                <Form.Label>Location</Form.Label>
                                <Form.Control required type="location" placeholder={jobDetails.location}
                                    value={jobDetails.location}
                                    onChange={(e) => handleLocationChange(e)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control required type="description" placeholder={jobDetails.description}
                                    value={jobDetails.description}
                                    onChange={(e) => handleJobDescription(e)} />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmployerEmail">
                                    <Form.Label>Employer Email Contact</Form.Label>
                                    <Form.Control required type="employerEmail" placeholder={jobDetails.employerMailContact}
                                        value={jobDetails.employerMailContact}
                                        onChange={(e) => handleEmployerEmailChange(e)} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formCompanyWebsite">
                                    <Form.Label>Company Website</Form.Label>
                                    <Form.Control required type="companyWebsite" placeholder={jobDetails.companyWebsite}
                                        value={jobDetails.companyWebsite}
                                        onChange={(e) => handleCompanyWebsiteChange(e)} />
                                </Form.Group>
                            </Row>

                            {/* <Form.Group className="mb-3" id="formGridCheckbox">
                                    <Form.Check type="checkbox" label="Favourite" />
                                </Form.Group> */}

                            <Button variant="outline-dark" type="submit">
                                Update Job
                                </Button>
                        </Form>
                    </Row>
                </Container>
            )
        }
    } else {
        return (
            <Container>
                <NavComp></NavComp>
                <Row className="topBox">
                    <Form onSubmit={handleCreateJob}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control required type="title" placeholder="Enter job title"
                                    onChange={(e) => handleTitleChange(e)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCompanyName">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control required type="company" placeholder="Enter Company Name"
                                    onChange={(e) => handleCompanyChange(e)} />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Default file input example</Form.Label>
                            <Form.Control type="file"  onChange={handleFileUpload}/>
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="formJobPostingDate">
                                <Form.Label>Job Posting Date</Form.Label>
                                <DatePicker required selected={jobPostingDate} onChange={(date) => setJobPostingDate(date)} />
                                {/* <Form.Control type="jobPostingDate" placeholder="Enter Posting Date" 
                                onChange={(e) => handleJobPostingDateChange(e)}/> 
                            </Form.Group> */}

                        <Form.Group className="mb-3" controlId="formGridLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control required type="location" placeholder="Enter Location of Job"
                                onChange={(e) => handleLocationChange(e)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control required type="description" placeholder="Enter job description"
                                onChange={(e) => handleJobDescription(e)} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmployerEmail">
                                <Form.Label>Employer Email Contact</Form.Label>
                                <Form.Control required type="employerEmail" placeholder="Enter Employer contact Email"
                                    onChange={(e) => handleEmployerEmailChange(e)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formCompanyWebsite">
                                <Form.Label>Company Website</Form.Label>
                                <Form.Control required type="companyWebsite" placeholder="Enter company details"
                                    onChange={(e) => handleCompanyWebsiteChange(e)} />
                            </Form.Group>
                        </Row>

                        {/* <Form.Group className="mb-3" id="formGridCheckbox">
                                <Form.Check type="checkbox" label="Favourite" />
                            </Form.Group> */}

                        <Button variant="primary" type="submit">
                            Submit
                            </Button>
                    </Form>
                </Row>
            </Container>
        )
    }
}


export default JobCreate;