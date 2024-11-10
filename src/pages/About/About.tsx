import React from "react";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import NavBar from "../../components/Nav/Nav";

const About: React.FC = () => {
    return (
        <Container fluid>
            <NavBar/>
            <Row className="justify-content-center mt-5">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>About Us</Card.Title>
                            <Card.Text>
                                Welcome to SignLanguageAI! Our mission is to make learning sign language more accessible, personalized, and fun. We leverage the power of artificial intelligence to provide an interactive and engaging learning experience.
                            </Card.Text>
                            <Card.Text>
                                Our team is dedicated to creating innovative solutions that bridge the communication gap and promote inclusivity. Whether you are a beginner or looking to improve your skills, SignLanguageAI is here to support your journey.
                            </Card.Text>
                            <Card.Text>
                                Thank you for choosing SignLanguageAI. Together, we can make a difference!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default About;