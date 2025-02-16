import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Camera from './Camera/Camera'
import GenerateRecipe from './GenerateRecipe/GenerateRecipe'

const App: React.FC = () => (
	<Router>
		<Routes>
			{/* Public Pages */}
			<Route path="/*" element={<Home />} />
			<Route path="/camera" element={<Camera />} />
			<Route path="/generate-recipe" element={<GenerateRecipe />} />
		</Routes>
	</Router>
)

export default App
