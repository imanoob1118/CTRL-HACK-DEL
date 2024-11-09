import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";


const Video = () => {

    const video = useRef<HTMLVideoElement | null>(null);

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


    return (
        <Container className="justify-content-center align-items-center">
            <video
                ref={video}
                autoPlay
                playsInline
                className="video-size"
            />
        </Container>
    );
}

export default Video;