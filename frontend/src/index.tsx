import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/Routes'
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import '@fontsource/roboto/100.css'
import '@fontsource/roboto/400.css'

const theme = createSystem(defaultConfig, {
	theme: {
		tokens: {
			fonts: {
				body: { value: `'Roboto', sans-serif` },
			},
		},
	},
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<ChakraProvider value={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
)
