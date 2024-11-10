import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Pricing.css';
import NavBar from '../../components/Nav/Nav';

const Pricing: React.FC = () => {
    return (
        <Container fluid>
            <NavBar />
            <Row className="text-center mb-4 mt-5">
                <Col>
                    <h1>Our Pricing Plans</h1>
                    <p>Choose the plan that best suits your needs.</p>
                </Col>
            </Row>
            <Row>
                <Col md={4} className="mb-4">
                    <Card className="pricing-card">
                        <Card.Body>
                            <Card.Title>Standard</Card.Title>
                            <Card.Text>$20/month</Card.Text>
                            <ul>
                                <li>Unlimited Cat GIFs</li>
                                <li>Access to Meme Library</li>
                                <li>Daily Dad Jokes</li>
                                <li>Priority Support from Our Pet Hamster</li>
                            </ul>
                            <Button variant="primary">Choose Plan</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card className="pricing-card">
                        <Card.Body>
                            <Card.Title>Premium</Card.Title>
                            <Card.Text>$30/month</Card.Text>
                            <ul>
                                <li>Unlimited Cat GIFs</li>
                                <li>Access to Meme Library</li>
                                <li>Daily Dad Jokes</li>
                                <li>Priority Support from Our Pet Hamster</li>
                                <li>Exclusive Access to Unicorn Rides</li>
                            </ul>
                            <Button variant="primary">Choose Plan</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card className="pricing-card">
                        <Card.Body>
                            <Card.Title>Ultimate</Card.Title>
                            <Card.Text>$50/month</Card.Text>
                            <ul>
                                <li>Unlimited Cat GIFs</li>
                                <li>Access to Meme Library</li>
                                <li>Daily Dad Jokes</li>
                                <li>Priority Support from Our Pet Hamster</li>
                                <li>Exclusive Access to Unicorn Rides</li>
                                <li>Personalized Fortune Cookies</li>
                                <li>Monthly Alien Abduction Insurance</li>
                                <li>Complimentary Time Travel Consultation</li>
                                <li>VIP Access to Secret Lair</li>
                            </ul>
                            <Button variant="primary">Choose Plan</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Pricing;