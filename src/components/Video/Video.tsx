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
    const [items, setItems] = useState<string[]>([]);

    const classificationMapping: { [key: number]: string } = {
        0: 'One',
        1: 'Two',
        2: 'Three',
        3: 'Four',
        4: 'Five',
        5: 'A',
        6: 'B',
        7: 'C',
        8: 'D',
        9: 'E',
        10: 'H',
        11: 'L',
        12: 'O',
        13: 'W',
        14: 'R',
    };
    
    const addItem = (input: string | undefined) => {
        const newItem = input ?? ""; // Replace undefined with an empty string
        const updatedItems = [...items, newItem];
    
        // Check if there are two consecutive empty strings
        const hasConsecutiveEmptyStrings = updatedItems.some((item, index) =>
          item === "" && updatedItems[index - 1] === ""
        );

        if (hasConsecutiveEmptyStrings) {
            setItems([]);
          } else {
            setItems(updatedItems);
          }

    }

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
                        addItem(response.data['classification'])
                        console.log(classification)
                        console.log(items)

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
                    } else {
                        console.log("Failed Api Request");
                    }
                } catch (error) {
                    console.error("Error processing frame", error);
                }
            }
            setIsProcessing(false);
        }
    }, [isProcessing]);

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
        const interval = setInterval(processFrame, 1000); // Process frame every second
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
                {items.length > 0 ? (
                <p>
                    {items
                    .map(item => classificationMapping[parseInt(item, 10)] || "")
                    .join("")}
                </p>
                ) : (
                <p>The array is empty.</p>
                )}

            </Container>
        </Container>
    );
}

export default Video;