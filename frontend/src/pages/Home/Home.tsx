import { Flex, Text, Button, Image, Grid, GridItem } from '@chakra-ui/react'
import {
	AiFillAudio,
	AiFillEdit,
	AiOutlineCodeSandbox,
	AiOutlineFontSize,
	AiOutlineLeft,
	AiOutlineLink,
	AiOutlineMail,
	AiOutlinePicture,
} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import laksa from '/images/laksa.png'
import React from 'react'

const Home: React.FC = () => {
	const navigate = useNavigate()
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
				<Flex
					flexDir="row"
					height="12vh"
					width="100%"
					bgColor="#EF5737"
					alignItems="center"
					paddingLeft="12px"
				>
					<Button bgColor="#EF5737">
						<AiOutlineLeft />
						<Text marginLeft="10px" fontSize="lg">
							Add recipe
						</Text>
					</Button>
				</Flex>
				<Image src={laksa} margin="20px" borderRadius="12px" />
				<Text
					textAlign="center"
					fontSize="lg"
					fontWeight="semibold"
					marginBottom="20px"
				>
					How would you like to add your recipe?
				</Text>
				<Grid
					h="50%"
					templateRows="repeat(4, 1fr)"
					templateColumns="repeat(2, 1fr)"
					padding="20px"
					paddingTop="0"
					gap={2}
					color="black"
				>
					<GridItem rowSpan={1} colSpan={1} color="black">
						<Button
							height="100%"
							width="100%"
							bgColor="white"
							border="1px solid #DDD"
							color="black"
						>
							<Flex flexDir="column" alignItems="center">
								<AiFillEdit />
								<Text fontWeight="normal">From scratch</Text>
							</Flex>
						</Button>
					</GridItem>
					<GridItem rowSpan={1} colSpan={1}>
						<Button
							height="100%"
							width="100%"
							bgColor="white"
							border="1px solid #DDD"
							color="black"
						>
							<Flex flexDir="column" alignItems="center">
								<AiOutlineFontSize />
								<Text fontWeight="normal">From text</Text>
							</Flex>
						</Button>
					</GridItem>
					<GridItem rowSpan={1} colSpan={1}>
						<Button
							height="100%"
							width="100%"
							bgColor="white"
							border="1px solid #DDD"
							color="black"
						>
							<Flex flexDir="column" alignItems="center">
								<AiOutlineLink />
								<Text fontWeight="normal">From URL</Text>
							</Flex>
						</Button>
					</GridItem>
					<GridItem rowSpan={1} colSpan={1}>
						<Button
							height="100%"
							width="100%"
							bgColor="white"
							border="1px solid #DDD"
							color="black"
						>
							<Flex flexDir="column" alignItems="center">
								<AiOutlinePicture />
								<Text fontWeight="normal">From image</Text>
							</Flex>
						</Button>
					</GridItem>
					<GridItem rowSpan={1} colSpan={1}>
						<Button
							height="100%"
							width="100%"
							bgColor="white"
							border="1px solid #DDD"
							color="black"
						>
							<Flex flexDir="column" alignItems="center">
								<AiOutlineMail />
								<Text fontWeight="normal">From email</Text>
							</Flex>
						</Button>
					</GridItem>
					<GridItem rowSpan={1} colSpan={1}>
						<Button
							height="100%"
							width="100%"
							bgColor="white"
							border="1px solid #DDD"
							color="black"
						>
							<Flex flexDir="column" alignItems="center">
								<AiFillAudio />
								<Text fontWeight="normal">
									By voice dictation
								</Text>
							</Flex>
						</Button>
					</GridItem>
					<GridItem rowSpan={1} colSpan={2}>
						<Button
							height="100%"
							width="100%"
							bgColor="white"
							border="1px solid #DDD"
							onClick={() => navigate('/generate-recipe')}
							color="black"
						>
							<Flex flexDir="row" alignItems="center">
								<Text fontWeight="normal" marginRight="8px">
									Generate from pantry
								</Text>
								<AiOutlineCodeSandbox />
							</Flex>
						</Button>
					</GridItem>
				</Grid>
			</Flex>
		</Flex>
	)
}

export default Home
