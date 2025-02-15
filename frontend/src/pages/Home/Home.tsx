import {
	Flex,
	Text,
	Icon,
	Button,
	Image,
	Grid,
	GridItem,
} from '@chakra-ui/react'
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

const Home: React.FC = () => {
	const navigate = useNavigate()
	return (
		<Flex
			height="100vh"
			flexDir="column"
			alignItems="center"
			justifyContent="center"
			gap="20px"
		>
			<Flex
				flexDir="column"
				width="400px"
				height="100vh"
				border="20px solid black"
				borderRadius="20px"
			>
				<Flex
					flexDir="row"
					height="12vh"
					width="100%"
					bgColor="#EF5737"
					alignItems="center"
					paddingLeft="12px"
				>
					<Button
						bgColor="#EF5737"
						_hover=""
						_active=""
						color="white"
					>
						<Icon fontSize="22px">
							<AiOutlineLeft />
						</Icon>
						<Text marginLeft="10px" fontSize="lg">
							Add recipe
						</Text>
					</Button>
				</Flex>
				<Image src={laksa} margin="20px" borderRadius="12px" />
				<Text
					textAlign="center"
					fontSize="lg"
					color="black"
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
				>
					<GridItem rowSpan={1} colSpan={1}>
						<Button
							height="100%"
							width="100%"
							bgColor="white"
							border="1px solid #DDD"
						>
							<Flex flexDir="column" alignItems="center">
								<Icon fontSize="22px">
									<AiFillEdit />
								</Icon>
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
						>
							<Flex flexDir="column" alignItems="center">
								<Icon fontSize="22px">
									<AiOutlineFontSize />
								</Icon>
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
						>
							<Flex flexDir="column" alignItems="center">
								<Icon fontSize="22px">
									<AiOutlineLink />
								</Icon>
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
						>
							<Flex flexDir="column" alignItems="center">
								<Icon fontSize="22px">
									<AiOutlinePicture />
								</Icon>
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
						>
							<Flex flexDir="column" alignItems="center">
								<Icon fontSize="22px">
									<AiOutlineMail />
								</Icon>
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
						>
							<Flex flexDir="column" alignItems="center">
								<Icon fontSize="22px">
									<AiFillAudio />
								</Icon>
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
						>
							<Flex flexDir="row" alignItems="center">
								<Text fontWeight="normal" marginRight="8px">
									Generate from pantry
								</Text>
								<Icon fontSize="24px">
									<AiOutlineCodeSandbox />
								</Icon>
							</Flex>
						</Button>
					</GridItem>
				</Grid>
			</Flex>
		</Flex>
	)
}

export default Home
