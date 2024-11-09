import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../../components/Nav/Nav';
import "../Home/Home.css";
import Video from '../../components/Video/Video';

const AI: React.FC = () => {
    return (
        <Container fluid>
            <NavBar />
            <Container className="mt-5">
                <Row>
                    <Col>
                    <Video/>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default AI;