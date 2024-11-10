import React from "react";
import NavBar from "../../components/Nav/Nav";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import './Home.css';
import SignLangaugePhoto from "../../photos/SignLanguageCartoon.jpg";
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";
import About from "../About/About";
import { useRef } from "react";


const Home: React.FC = () => {

    const aboutRef = useRef<HTMLDivElement | null>(null);

    const handleScrollToAbout = () => {
        if (aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(`/${path}`);
    };

    return (
        <Container fluid className="no-overflow">
            <NavBar />
            <Container fluid className="bg-body-light">
                <Row className="no-gutters">
                    <Col xs={10} md={7} lg={2}></Col>
                    <Col xs={12} md={8} lg={6} className="mx-auto justify-content-between align-items-center">
                        <Card className="border-0 page-size">
                            <Card.Body className="bg-body-light">
                                <br></br>
                                <Card.Text className="display-5 mt-5 custom-font semi-bold">
                                    <span className="custom-green-txt-color no-space">
                                        TEACH SIGN LANGUAGE WITH AI
                                    </span>
                                    <br />
                                    FOR YOUR VILLAGE
                                </Card.Text>
                                <Card.Text>
                                    Make learning Sign Language more accessible, personalized and fun!
                                </Card.Text>
                                <Button onClick={() => { handleNavigation('Ai') }} variant="success" type="submit" className="ml-auto custom-button">Start Learning Now! </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={9} md={5} lg={4} className="px-5">
                        <Image src={SignLangaugePhoto} className="img-fluid" />
                    </Col>
                </Row>
            </Container>
            <br /><br /><br /><br /><br />
            <Container fluid className="d-flex justify-content-center align-items-center bounce">
                <Button variant="light" onClick={handleScrollToAbout}>
                    <Icon.ArrowDownCircle size={40} color="#28CB8B" />
                </Button>
            </Container>

            <div ref={aboutRef}>
                <About />
            </div>
            {/* <div ref={featuresRef}>
                <Features/>
            </div>
            <div ref={pricingRef}>
                <Pricing/>
            </div> */}
        </Container>
    );
}

export default Home;