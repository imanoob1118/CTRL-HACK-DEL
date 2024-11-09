import React, { useCallback, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";


const Video = () => {

    const video = useRef<HTMLVideoElement | null>(null);
    const canvas = useRef<HTMLCanvasElement | null>(null);


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
        if (canvas.current && video.current) {
            const context = canvas.current.getContext('2d');

            if (context) {
                context.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height);
                const image = context.getImageData(0, 0, canvas.current.width, canvas.current.height);


                
            }

        }

    }, []);

    useEffect(() => {
        const interval = setInterval(processFrame, 1000 / 60);
        return () => clearInterval(interval);
    }, [processFrame]);


    return (
        <Container className="justify-content-center align-items-center">
            <video
                ref={video}
                autoPlay
                playsInline
                className="video-size"
            />
            <canvas
                ref={canvas}
                style={{ display: 'none' }}
            />
        </Container>
    );
}

export default Video;