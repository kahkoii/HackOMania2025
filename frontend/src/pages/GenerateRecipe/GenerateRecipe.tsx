import {
	Flex,
	Icon,
	Text,
	Button,
	Spinner,
	Image,
	Link,
} from '@chakra-ui/react'
import { Checkbox } from '../../components/ui/checkbox'
import {
	NumberInputField,
	NumberInputRoot,
} from '../../components/ui/number-input'
import { useEffect, useState } from 'react'
import { AiOutlineCamera, AiOutlineLeft, AiOutlineSearch } from 'react-icons/ai'
import { useNavigate, useLocation } from 'react-router-dom'
import { Ingredient, Recipe } from './types'
import { Link as RouterLink } from 'react-router-dom'

interface propInterface {
	i: Ingredient
	id: number
}

const GenerateRecipe: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const selectedList = new Map()
	const [recipeStatus, setRecipeStatus] = useState('loading')
	const [recipe, setRecipe] = useState<Recipe>()
	const [ingredientList, setIngredientList] = useState<Ingredient[]>([
		{
			name: 'Egg',
			amount: 2,
			unit: 'pcs',
			expiryDays: 8,
			info: 'Common allergen',
		},
		{
			name: 'Beef',
			amount: 600,
			unit: 'g',
			expiryDays: 8,
			info: 'Can be aged',
		},
		{
			name: 'Potato',
			amount: 4,
			unit: 'pcs',
			expiryDays: 8,
			info: 'Starchy',
		},
		{
			name: 'Rice',
			amount: 1,
			unit: 'kg',
			expiryDays: 8,
			info: 'Long grain',
		},
	])

	useEffect(() => {
		for (let i = 0; i < ingredientList.length; i++) {
			selectedList.set(i, 1)
		}
	}, [ingredientList])

	useEffect(() => {
		if (location.state?.image) {
			uploadToServer()
		} else {
			setRecipeStatus('invalid')
		}
	})

	const IngredientItem: React.FC<propInterface> = (props: propInterface) => {
		const { i, id } = props
		return (
			<Flex
				key={id}
				width="100%"
				justifyContent="space-around"
				alignItems="center"
				bgColor="#FFF7F1"
				borderRadius="12px"
				padding="10px 20px"
				gap="10px"
			>
				<Link
					as={RouterLink}
					to={`/ingredient-info/${encodeURIComponent(i.name)}`}
					fontWeight="semibold"
				>
					{i.name}
				</Link>
				<NumberInputRoot
					defaultValue={i.amount}
					step={1}
					min={0}
					overflow="hidden"
				>
					<NumberInputField />
				</NumberInputRoot>
				<Text>{i.unit}</Text>
				<Checkbox
					defaultChecked
					onChange={() => {
						if (selectedList.has(id)) {
							selectedList.delete(id)
						} else {
							selectedList.set(id, 1)
						}
					}}
				/>
			</Flex>
		)
	}

	const uploadToServer = async () => {
		if (!location.state?.image) return
		location.state.image.toBlob(async (blob) => {
			if (!blob) return

			const formData = new FormData()
			formData.append('image', blob, 'photo.png')

			try {
				const response = await fetch(
					'http://127.0.0.1:5000/api/ingredients',
					{
						method: 'POST',
						body: formData,
					},
				)
					.then((res) => {
						if (res.status == 200) {
							return res.json
						}
					})
					.then((data) => {
						console.log(data)
						setIngredientList(data.ingredients)
						setRecipeStatus('valid')
					})
			} catch (error) {
				alert('Failed to upload image.')
				console.error('Upload error:', error)
			}
		}, 'image/png')
	}

	const getRequest = () => {
		console.log('=============\nSending get request with data: \n')
		const data: { ingredients: string[] } = { ingredients: [] }
		setRecipeStatus('loading')
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [k, _] of selectedList) {
			data.ingredients.push(formatIngredient(ingredientList[k]))
		}
		console.log(data)
		fetch('http://127.0.0.1:5000/generate-recipe', {
			body: JSON.stringify(data),
			credentials: 'same-origin',
			headers: {
				'content-type': 'application/json',
			},
			method: 'POST',
			mode: 'cors', // no-cors, cors, *same-origin
		})
			.then((r) => {
				if (r.status == 200) {
					return r.json()
				}
				return null
			})
			.then((json) => {
				if (JSON.parse(json).status == 'invalid') {
					setRecipeStatus('invalid')
				} else {
					const recipe = JSON.parse(json)
					setRecipe(recipe)
					setRecipeStatus('valid')
				}
			})
	}

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
				alignItems="center"
			>
				<Flex
					flexDir="row"
					height="12vh"
					width="100%"
					bgColor="#EF5737"
					alignItems="center"
					paddingLeft="12px"
					marginBottom="10px"
				>
					<Button
						bgColor="#EF5737"
						_hover={{}}
						_active={{}}
						color="white"
						onClick={() => navigate('/')}
					>
						<Icon fontSize="22px">
							<AiOutlineLeft />
						</Icon>
						<Text marginLeft="10px" fontSize="lg">
							Generate Recipe
						</Text>
					</Button>
				</Flex>
				{recipeStatus == 'valid' && (
					<Flex
						flexDir="column"
						bgColor="#FFE5D8"
						height="100%"
						width="100%"
						alignItems="center"
						padding="20px 0px"
						overflow="hidden"
					>
						<Text
							textDecor="underline"
							fontWeight="bold"
							fontSize="xl"
						>
							{recipe?.title}
						</Text>
						<Text
							fontSize="md"
							margin="8px 30px"
							textAlign="center"
						>
							{recipe?.description}
						</Text>
						<Flex
							flexDir="column"
							bgColor="white"
							margin="10px 20px"
							textAlign="center"
							alignItems="center"
							justifyContent="center"
							borderRadius="8px"
							boxShadow="lg"
							padding="14px"
							paddingTop="520px"
							overflow="scroll"
							overflowX="hidden"
						>
							<Flex
								flexDir="column"
								textAlign="start"
								marginBottom="10px"
							>
								<Text fontWeight="semibold">Ingredients:</Text>
								{recipe?.ingredients.map((i, index) => (
									<Text key={index}>- {i}</Text>
								))}
							</Flex>
							<Flex flexDir="column" textAlign="start">
								<Text fontWeight="semibold">Instructions:</Text>
								{recipe?.instructions.map((i, index) => (
									<Text key={index}>
										<Text
											fontWeight="bold"
											display="inline"
										>
											{index + 1}.
										</Text>{' '}
										{i.title} {i.details}
									</Text>
								))}
							</Flex>
						</Flex>
					</Flex>
				)}
				{location.state?.image != null && (
					<Image width="200px" src={location.state.image} />
				)}
				{recipeStatus == 'invalid' && (
					<>
						<Flex
							flexDir="row"
							width="82%"
							margin="10px 0 20px 0"
							padding="10px 0"
							borderRadius="20px"
							bgColor="#F2F2F2"
							boxShadow="lg"
							justifyContent="space-around"
							alignItems="center"
						>
							<Text>Search for ingredients</Text>
							<Flex gap="10px">
								<Icon
									fontSize="24px"
									_hover={{ cursor: 'pointer' }}
								>
									<AiOutlineSearch />
								</Icon>
								<Icon
									fontSize="24px"
									_hover={{ cursor: 'pointer' }}
									onClick={() => navigate('/camera')}
								>
									<AiOutlineCamera />
								</Icon>
							</Flex>
						</Flex>
						<Flex
							flexDir="column"
							width="300px"
							gap="8px"
							height="60%"
							overflow="scroll"
							overflowX="hidden"
							overflowY="auto"
						>
							{ingredientList.map((i, index) => (
								<IngredientItem key={index} i={i} id={index} />
							))}
						</Flex>
						<Button
							margin="10px"
							bgColor="#EF5737"
							width="70%"
							onClick={() => getRequest()}
						>
							<Text>Generate Recipe</Text>
						</Button>
					</>
				)}
				{recipeStatus == 'loading' && (
					<Flex
						flexDir="column"
						height="100%"
						alignItems="center"
						justifyContent="center"
					>
						<Spinner size="lg" />
						<Text marginTop="28px" fontSize="md">
							Generating recipes...
						</Text>
					</Flex>
				)}
			</Flex>
		</Flex>
	)
}

export default GenerateRecipe

function formatIngredient(ingredient: Ingredient): string {
	return `${ingredient.name}: ${ingredient.amount} ${ingredient.unit} (expires in ${ingredient.expiryDays} days) – ${ingredient.info}`
}
