import { Navbar, Nav, Container, Col, Button } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import '../../pages/Home/Home.css';
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';



export default function NavBar() {

    const navigate = useNavigate();

    return (
        <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
            <Container fluid>
                <Navbar.Brand href="/" className="mx-5 custom-green-txt-color">SignLanguageAI</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Col xs='auto'>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/" className="mx-3">About</Nav.Link>
                            <ScrollLink to="about-section" smooth={true} duration={500} className="nav-link mx-3">Learn</ScrollLink>
                            <Nav.Link href="/features" className="mx-3">AI</Nav.Link>
                            <Nav.Link href="/pricing" className="mx-3">Links</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Col>
            </Container>
        </Navbar>
    );
}