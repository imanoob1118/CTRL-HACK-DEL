import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import axios from 'axios';

const Video = () => {
    const video = useRef<HTMLVideoElement | null>(null);
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const [boundingBox, setBoundingBox] = useState<{ x: number, y: number, width: number, height: number } | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [cords, setCords] = useState<[number, number][] | null>(null);
    const [classification, setClassification] = useState<number | undefined>(undefined);
    const [outputs, setOutputs] = useState<string[]>([]);
    const [unknownCount, setUnknownCount] = useState(0);

    const classificationMapping: { [key: number]: string } = {
        0: 'Unknown',
        1: 'Closed',
        2: 'Point',
        3: 'Okay'
    };

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (video.current) {
                    video.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error Accessing Camera", error);
            }
        };

        startCamera();

        return () => {
            if (video.current && video.current.srcObject) {
                const stream = video.current.srcObject as MediaStream;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const processFrame = useCallback(async () => {
        if (canvas.current && video.current && !isProcessing) {
            setIsProcessing(true);
            const context = canvas.current.getContext('2d');

            if (context) {
                // Set canvas dimensions to match video dimensions
                canvas.current.width = video.current.videoWidth;
                canvas.current.height = video.current.videoHeight;

                context.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height);
                const image = canvas.current.toDataURL('image/png');

                try {
                    const response = await axios.post('http://127.0.0.1:5000/readImage', { image_data: image });
                    if (response.status === 200) {
                        const { box, cords } = response.data;
                        console.log(response.data['classification'])
                        setClassification(response.data['classification'])
                        if (box) {
                            setBoundingBox(box);
                        } else {
                            setBoundingBox(null);
                        }
                        if (cords) {
                            setCords(cords);
                        } else {
                            setCords(null);
                        }
                        const classificationText = classification !== undefined ? classificationMapping[classification] : "Unknown";
                        setOutputs(prevOutputs => [...prevOutputs, classificationText]);

                        if (classificationText === "Unknown") {
                            setUnknownCount(prevCount => prevCount + 1);
                        } else {
                            setUnknownCount(0);
                        }

                        if (unknownCount >= 2) {
                            setOutputs([]);
                            setUnknownCount(0);
                        }



                    } else {
                        console.log("Failed Api Request");
                    }
                } catch (error) {
                    console.error("Error processing frame", error);
                }
            }
            setIsProcessing(false);
        }
    }, [isProcessing, unknownCount, outputs]);

    const draw = useCallback(() => {
        if (canvas.current && video.current) {
            const context = canvas.current.getContext('2d');

            if (context) {
                // Clear the canvas before drawing the bounding box and points
                context.clearRect(0, 0, canvas.current.width, canvas.current.height);

                // Draw points and connect them if they exist
                if (cords) {
                    context.strokeStyle = 'yellow';
                    context.lineWidth = 1;

                    // Define the connections for a hand model
                    const connections = [
                        [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
                        [0, 5], [5, 6], [6, 7], [7, 8], // Index finger
                        [0, 9], [9, 10], [10, 11], [11, 12], // Middle finger
                        [0, 13], [13, 14], [14, 15], [15, 16], // Ring finger
                        [0, 17], [17, 18], [18, 19], [19, 20] // Pinky finger
                    ];

                    // Draw the connections
                    connections.forEach(([start, end]) => {
                        context.beginPath();
                        context.moveTo(cords[start][0], cords[start][1]);
                        context.lineTo(cords[end][0], cords[end][1]);
                        context.stroke();
                    });

                    // Draw the points as hollow circles
                    context.strokeStyle = 'red';
                    cords.forEach((point) => {
                        context.beginPath();
                        context.arc(point[0], point[1], 5, 0, 2 * Math.PI);
                        context.stroke();
                    });
                }
            }
        }

        requestAnimationFrame(draw);
    }, [boundingBox, cords]);

    useEffect(() => {
        const interval = setInterval(processFrame, 200); // Process frame every second
        const animationFrameId = requestAnimationFrame(draw); // Start the drawing loop
        return () => {
            clearInterval(interval);
            cancelAnimationFrame(animationFrameId);
        };
    }, [processFrame, draw]);

    return (
        <Container className="justify-content-center align-items-center">
            <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                {/* Play Video */}
                <video
                    ref={video}
                    autoPlay
                    playsInline
                    className="video-size"
                    style={{ width: '100%', height: 'auto', transform: 'scaleX(-1)' }}
                />
                {/* Capture Video */}
                <canvas
                    ref={canvas}
                    className="video-size"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none'
                    }}
                />
            </div>
            {/* Display AI response */}
            <Container>
                <h3>AI Response:</h3>
                <p>{classification !== undefined ? classificationMapping[classification] : "Unknown"}</p>
                {boundingBox && (
                    <div>
                        <p>Bounding Box: {JSON.stringify(boundingBox)}</p>
                    </div>
                )}
            </Container>
        </Container>
    );
}

export default Video;