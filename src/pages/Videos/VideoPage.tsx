import React, { useState } from 'react';
import './VideoPage.css';
import { Button, Card, Container } from 'react-bootstrap';
import numberOne from "../../photos/number01.jpg";
import NavBar from '../../components/Navbar/Navbar';
import B from "../../photos/b.png";
import A from "../../photos/a1.jpg"

const images = [
    numberOne,
    A,
    B,
];

const VideoPage: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <Container fluid>
            <NavBar />

            <Container className='align-items-center'>
                <Card className='align-items-center no-border'>
                    <Card.Text className='mt-5 fs-1' >
                        Learn From Our Videos:
                    </Card.Text>
                </Card>
                <br />
                <br /><br />
            </Container>
            <Container fluid className="justify-content-center align-items-center slideshow-container">
                <Button onClick={prevImage}>Previous</Button>
                <img src={images[currentIndex]} alt="Slideshow" className="slideshow-image" />
                <Button onClick={nextImage}>Next</Button>
            </Container>
        </Container>

    );
};

export default VideoPage;