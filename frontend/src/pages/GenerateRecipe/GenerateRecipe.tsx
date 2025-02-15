import { Flex, Icon, Text, Button } from '@chakra-ui/react'
import { Checkbox } from '../../components/ui/checkbox'
import {
	NumberInputField,
	NumberInputRoot,
} from '../../components/ui/number-input'
import { useState } from 'react'
import { AiOutlineCamera, AiOutlineLeft, AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Ingredient from './ingredient'

interface propInterface {
	i: Ingredient
	id: number
}

const GenerateRecipe: React.FC = () => {
	const navigate = useNavigate()
	const selectedList = new Map()
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
	])

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
				<Text fontWeight="semibold">{i.name}</Text>
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

	const getRequest = () => {
		console.log('=============\nSending get request with data: \n')
		const data = []
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [k, _] of selectedList) {
			data.push(ingredientList[k])
		}
		console.log(data)
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
				<Flex
					flexDir="row"
					width="82%"
					margin="20px"
					padding="10px 0"
					borderRadius="20px"
					bgColor="#F2F2F2"
					boxShadow="lg"
					justifyContent="space-around"
					alignItems="center"
				>
					<Text>Search for ingredients</Text>
					<Flex gap="10px">
						<Icon fontSize="24px" _hover={{ cursor: 'pointer' }}>
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
				<Flex flexDir="column" width="300px" gap="8px" height="60%">
					{ingredientList.map((i, index) => (
						<IngredientItem key={index} i={i} id={index} />
					))}
				</Flex>
				<Button
					bgColor="#EF5737"
					width="70%"
					onClick={() => getRequest()}
				>
					<Text>Generate Recipe</Text>
				</Button>
			</Flex>
		</Flex>
	)
}

export default GenerateRecipe
