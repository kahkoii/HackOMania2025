import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import GenerateRecipe from './GenerateRecipe/GenerateRecipe'
import IngredientInfo from './IngredientInfo/IngredientInfo';

const App: React.FC = () => (
	<Router>
		<Routes>
			{/* Public Pages */}
			<Route path="/*" element={<Home />} />
			<Route path="/generate-recipe" element={<GenerateRecipe />} />
			<Route path="/ingredient-info/:name" element={<IngredientInfo />} />
		</Routes>
	</Router>
)

export default App
