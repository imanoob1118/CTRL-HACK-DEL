import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const features = [
    { title: 'Hand Gesture Recognition', description: 'Our model will be able to determine which hand gesture you are showing up and will tell you which hand sign you are doing. It uses advanced machine learning algorithms to accurately recognize and interpret various hand gestures in real-time. This feature is designed to be highly responsive and works seamlessly across different environments and lighting conditions, providing a reliable and intuitive user experience.' },
    { title: 'Personalized Learning Experience', description: 'Our platform offers a personalized learning experience tailored to each user\'s needs. It adapts to individual learning styles and paces, providing customized content and recommendations. With interactive tutorials, real-time feedback, and progress tracking, users can effectively learn new skills and knowledge. This feature ensures that learning is engaging, efficient, and suited to each user\'s unique preferences and goals.' },
    { title: 'Intuitive User Interface', description: 'Our platform features an intuitive user interface designed to provide a seamless and enjoyable user experience. This feature includes a clean and modern design, easy navigation, and user-friendly controls. Users can quickly access the tools and information they need without any steep learning curve. The interface is responsive and adapts to different devices and screen sizes, ensuring a consistent experience across desktops, tablets, and smartphones. This feature is aimed at enhancing user satisfaction and productivity by making the platform easy to use and visually appealing.' },
];

const Features: React.FC = () => {
    return (
        <>
            <Container fluid className="mt-5">
                <Row className="text-center mb-4">
                    <Col>
                        <h1>Our Features</h1>
                        <p>Discover the amazing features we offer.</p>
                    </Col>
                </Row>
                <Row>
                    {features.map((feature, index) => (
                        <Col md={4} className="mb-3 mt-5" key={index}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{feature.title}</Card.Title>
                                    <Card.Text>
                                        {feature.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default Features;