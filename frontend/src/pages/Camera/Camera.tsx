import React, {useRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './Camera.css';

const Camera: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const photoRef = useRef<HTMLCanvasElement | null>(null);

	const [hasPhoto, setHasPhoto] = useState(false);

	const getVideo = () => {
		navigator.mediaDevices
		.getUserMedia({
			video: {width: 1920, height: 1080}
		})
		.then(stream => {
			let video = videoRef.current!;
			video.srcObject = stream;
			video.play();
		})
		.catch(err => {
			console.error(err);
		})
	}

	const takePhoto = () => {
		const width = 414;
		const height = width / (16/9);

		if (!photoRef.current || !videoRef.current) return;

		const photo = photoRef.current!;
    	photo.width = width;
    	photo.height = height;

		let ctx = photo.getContext('2d');
		if (!ctx) return;
		ctx.drawImage(videoRef.current, 0, 0, width, height);
		setHasPhoto(true);
	}

	const closePhoto = () => {
		let photo = photoRef.current!;
		let ctx = photo.getContext('2d');
		if (!ctx) return;
		ctx.clearRect(0, 0, photo.width, photo.height);

		setHasPhoto(false); 
	}

	useEffect(() => {
		getVideo();
	}, []);

	return (
		<div className='App'>
			<div className='Camera'>
				<video ref={videoRef}></video>
				<button onClick={takePhoto}>Snap</button>
			</div>
			<div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
				<canvas ref={photoRef}></canvas>
				<button onClick={closePhoto}>Close</button>

			</div>
		</div>
	)
}
export default Camera
