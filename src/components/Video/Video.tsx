import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import axios from 'axios';

const Video = () => {

    const video = useRef<HTMLVideoElement | null>(null);
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const [AiResponse, setAiResponse] = useState("");
    const [boundingBox, setBoundingBox] = useState<{ x: number, y: number, width: number, height: number } | null>(null);



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
        }

        startCamera();

        return () => {
            if (video.current && video.current.srcObject) {
                const stream = video.current.srcObject as MediaStream;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);


    const processFrame = useCallback(() => {

        // If canvas and video exists
        if (canvas.current && video.current) {

            const context = canvas.current.getContext('2d');

            if (context) {
                // Get the video image
                context.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height);

                // Get Image
                const image = context.getImageData(0, 0, canvas.current.width, canvas.current.height);

                // Send Video Frame (image)
                sendVideoFrame(image);
                console.log("sent image")

                // Clear screen
                context.clearRect(0, 0, canvas.current.width, canvas.current.height);

                // If bounding box data exists
                if (boundingBox) {
                    // Draw with yellow 
                    context.strokeStyle = 'yellow';
                    // Line Width
                    context.lineWidth = 2;
                    // Draw Rect
                    context.strokeRect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);
                }
            }
        }
    }, [boundingBox]);


    // Determine Video Frame Rate
    useEffect(() => {
        // 60 FPS
        const interval = setInterval(processFrame, 1000 / 60);
        return () => clearInterval(interval);
    }, [processFrame]);


    const sendVideoFrame = async (image: ImageData) => {
        try {
            // Send image
            const response = await axios.post("http://127.0.0.1:5000/readImage", {
                image: image
            });

            if (response.status === 200) {
                // Set AI reposnse
                setAiResponse(response.data.text);

                // Set bounding box information if returned
                if (response.data.boundingBox) {
                    // Set bounding box data
                    setBoundingBox(response.data.boundingBox);
                } else {
                    setBoundingBox(null);
                }

                console.log("REQUEST SUCCESSFUL")

            } else {
                console.log("Failed Api Request");
            }



        } catch (error) {
            console.error("Error sending video frame to AI model", error);
        }
    }


    return (
        <Container className="justify-content-center align-items-center">
            {/* Play Video */}
            <video
                ref={video}
                autoPlay
                playsInline
                className="video-size"
            />
            {/* Capture Video */}
            <canvas
                ref={canvas}
                className="video-size position-absolute"
                style={{ display: 'none', top: 0, left: 0 }}
            />
            {/* Display AI reponse */}
            <Container>
                <h3>AI Response:</h3>
                <p>{AiResponse}</p>
            </Container>
        </Container>
    );
}

export default Video;