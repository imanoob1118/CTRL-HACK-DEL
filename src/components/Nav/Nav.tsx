import { Navbar, Nav, Container, Col, Button } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import '../../pages/Home/Home.css';
import "../../pages/Home/Home.css";


export default function NavBar() {

    return (
        <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
            <Container fluid>
                <Navbar.Brand href="/" className="mx-5 custom-green-txt-color">SignLanguageAI</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Col xs='auto'>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/" className="mx-3">Home</Nav.Link>
                            <Nav.Link href="/about" className="mx-3">About</Nav.Link>
                            <Nav.Link href="/features" className="mx-3">Features</Nav.Link>
                            <Nav.Link href="/pricing" className="mx-3">Pricing</Nav.Link>
                            <Button href="/Ai" variant="success" type="submit" className="ml-auto mx-3 custom-button">Begin Now <Icon.ArrowRight /></Button>
                        </Nav>
                    </Navbar.Collapse>
                </Col>
            </Container>
        </Navbar>
    );
}