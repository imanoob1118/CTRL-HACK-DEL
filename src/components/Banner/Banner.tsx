import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Banner.css'; // Import the CSS file

function Banner() {
    return (
        <Container fluid className="container">
            <Row>
                <Col>
                    <h1 className="banner-heading">Welcome to SignLanguageAI</h1>
                    <p className="banner-paragraph">
                        Your gateway to learning and mastering sign language with AI-powered tools.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export { Banner };