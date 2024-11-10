import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "../Home/Home.css";
import Video from '../../components/Video/Video';

const AI: React.FC = () => {
    return (
        <Container fluid>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <Video />
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default AI;