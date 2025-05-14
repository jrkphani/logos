import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/carbon-responsive.css'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'
import { configureAmplify } from './amplifyConfig'

// Configure Amplify before rendering the application
configureAmplify();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
)
