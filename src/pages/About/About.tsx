import React from "react";
import { Container, Row, Col, Card, } from "react-bootstrap";
import NavBar from "../../components/Navbar/Navbar";

const About: React.FC = () => {
    return (
        <Container fluid>
            <NavBar />
            <Row className="justify-content-center mt-5">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                        <Card.Title 
                                className="display-5 fw-bold my-4 text-center" style={{ color: 'green' }}>About Us</Card.Title>
                            <Card.Text className="text-center">
                                Welcome to SignLanguageAI! Our mission is to make learning sign language more accessible, personalized, and fun. We leverage the power of artificial intelligence to provide an interactive and engaging learning experience.
                            </Card.Text>
                            <Card.Text className="text-center">
                                Our team is dedicated to creating innovative solutions that bridge the communication gap and promote inclusivity. Whether you are a beginner or looking to improve your skills, SignLanguageAI is here to support your journey.
                            </Card.Text>
                            <Card.Text className="text-center">
                                Thank you for choosing SignLanguageAI. Together, we can make a difference!
                            </Card.Text>
                            <Card.Text>
                            </Card.Text>

                            <Card.Title className="display-6 fw-bold my-4 text-center">Inspiration</Card.Title>
                            <Card.Text className="text-center">
                                The idea for AI Sign Language was inspired by the need for accessible and interactive resources for people who want to learn sign language, whether for personal interest, professional development, or to communicate with loved ones who are Deaf or hard of hearing. Traditional learning resources often require in-person instruction or expensive programs, which aren’t feasible for everyone. We wanted to leverage AI and machine learning to make sign language learning more interactive, accessible, and fun for learners.
                            </Card.Text>

                            <Card.Title className="display-6 fw-bold my-4 text-center">What it does</Card.Title>
                            <Card.Text className="text-center">
                                AI Sign Language provides an interactive platform where users can learn American Sign Language (ASL) through AI-driven video analysis, and real-time feedback. Users can learn simple sign positions and then practice by recording through their webcam. The AI system analyzes the user's gestures, compares them with correct signing techniques, and improve accuracy.
                            </Card.Text>

                            <Card.Title className="display-6 fw-bold my-4 text-center">How we built it</Card.Title>
                            <Card.Text className="text-center">
                                The platform was developed using a combination of front-end and back-end using react typescript and python respectively, with a focus on machine learning and computer vision for gesture recognition. Using Python and TensorFlow a custom-trained model trained by our hackers can recognize ASL signs from video input. The model was trained on a dataset of frames of data points and refined with calculations to improve accuracy across different hand shapes, angle and position. For the website itself, we used React for a responsive and interactive user experience, and Flask for server-side handling of video uploads and real-time feedback processing.
                            </Card.Text>

                            <Card.Title className="display-6 fw-bold my-4 text-center">Challenges we faced</Card.Title>
                            <Card.Text className="text-center">
                                Building an accurate gesture recognition model for ASL presented several challenging problems. Firstly, there’s the complexity of distinguishing subtle hand movements and shapes, especially when differentiating signs that are visually similar. This can be solved by having the model take in more data set. Additionally, having the AI learn different feature that were very similar cause conflicting issues. The biggest challenge that took us the most time was creating a pipeline between the model and the website.
                            </Card.Text>

                            <Card.Title className="display-6 fw-bold my-4 text-center">Our Accomplishments</Card.Title>
                            <Card.Text className="text-center">
                                We’re particularly proud of achieving a high level of accuracy in sign recognition, which was accurate enough to differentiate different gestures. Creating an interactive learning experience that feels responsive and personalized gave us satisfaction as was developing a platform that we hope will lower barriers for ASL learners. We're also proud of creating an inclusive tool that could help bridge communication gaps and promote a more accessible world.
                            </Card.Text>

                            <Card.Title className="display-6 fw-bold my-4 text-center">What we learned</Card.Title>
                            <Card.Text className="text-center">
                                We gained valuable experience in machine learning, particularly in working with gesture recognition and video processing. This project taught us the importance of data diversity and model tuning when working with human movements and how essential it is to balance accuracy with real-time performance for a positive user experience. Additionally, we learned about the intricacies of ASL and the unique considerations in designing for accessibility, especially for Deaf and hard-of-hearing communities.
                            </Card.Text>

                            <Card.Title className="display-6 fw-bold my-4 text-center">Next step?</Card.Title>
                            <Card.Text className="text-center">
                                In the future, we hope to expand the platform to support additional sign languages from around the world, enabling people to learn and practice sign languages that are regionally specific. We also plan to enhance the AI’s capabilities to understand more complex phrases and sentence structures, enabling users to learn not only vocabulary but also grammar and conversational skills in ASL. Additionally, we’d love to incorporate a social feature, where users can practice signing with each other in real-time, and to partner with Deaf educators and organizations to continuously improve and expand the platform.
                            </Card.Text>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default About;