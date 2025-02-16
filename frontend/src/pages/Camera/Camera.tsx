import { Button, Flex, Text } from '@chakra-ui/react'
import React, { useRef, useEffect, useState } from 'react'
import { AiOutlineFileImage, AiOutlineLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
// import './Camera.css';

const Camera: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null)
	const photoRef = useRef<HTMLCanvasElement | null>(null)
	const uploadImage = React.useRef(null)

	const [hasPhoto, setHasPhoto] = useState(false)

	const getVideo = () => {
		navigator.mediaDevices
			.getUserMedia({
				video: { width: 1920, height: 1080 },
			})
			.then((stream) => {
				const video = videoRef.current!
				video.srcObject = stream
				video.play()
			})
			.catch((err) => {
				console.error(err)
			})
	}

	const takePhoto = () => {
		const width = 360
		const height = width / (16 / 9)

		if (!photoRef.current || !videoRef.current) return

		const photo = photoRef.current!
		photo.width = width
		photo.height = height

		const ctx = photo.getContext('2d')
		if (!ctx) return
		ctx.drawImage(videoRef.current, 0, 0, width, height)
		setHasPhoto(true)
	}

	const closePhoto = () => {
		const photo = photoRef.current!
		const ctx = photo.getContext('2d')
		if (!ctx) return
		ctx.clearRect(0, 0, photo.width, photo.height)

		setHasPhoto(false)
	}

	const handleImageUpload = (e) => {
		console.log('Uploaded Image File')
		navigate('/generate-recipe')
	}

	const navigate = useNavigate()
	useEffect(() => {
		getVideo()
	}, [])

	return (
		<Flex
			height="100vh"
			flexDir="column"
			alignItems="center"
			justifyContent="center"
			gap="20px"
			color="black"
		>
			<Flex
				flexDir="column"
				width="400px"
				height="100vh"
				border="20px solid black"
				borderRadius="20px"
				color="black"
			>
				<Button
					bgColor="white"
					color="black"
					borderRadius="60px"
					width="10px"
					position="absolute"
					marginTop="10px"
					marginLeft={'10px'}
					zIndex={2}
					_hover={{ cursor: 'pointer' }}
					onClick={() => navigate('-1')}
				>
					<AiOutlineLeft />
				</Button>

				<Flex>
					<video ref={videoRef}></video>
				</Flex>
				<Button
					width="100%"
					borderRadius="0"
					bgColor="#EF5737"
					onClick={takePhoto}
				>
					Take Picture
				</Button>
				<Flex display={hasPhoto ? 'initial' : 'none'}>
					<canvas ref={photoRef}></canvas>
				</Flex>

				{hasPhoto && (
					<Flex flexDir="row" width="100%">
						<Button
							borderRadius="0"
							width="50%"
							bgColor="#2adca1"
							onClick={takePhoto}
						>
							Confirm
						</Button>
						<Button
							borderRadius="0"
							width="50%"
							bgColor="red.500"
							onClick={closePhoto}
						>
							Delete
						</Button>
					</Flex>
				)}
				<Flex
					flexDir="column"
					height="100%"
					width="100%"
					alignItems="center"
					justifyContent="center"
					borderTop="6px solid black"
					fontSize="52px"
					_hover={{ cursor: 'pointer' }}
					onClick={(e) => {
						handleImageUpload(e)
					}}
					gap="6px"
				>
					<AiOutlineFileImage />
					<Text fontSize="md">Upload Image</Text>
				</Flex>
			</Flex>
		</Flex>
	)
}
export default Camera
