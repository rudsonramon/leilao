import React from 'react'
import { AppProps } from 'next/app'
import GlobalStyle from '../styles/globals'

// 1. import `ChakraProvider` component
import { ChakraProvider, ThemeProvider, CSSReset, theme } from "@chakra-ui/react"
// 1. Import the extendTheme function
//import { extendTheme } from "@chakra-ui/react"

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}

const MyApp:React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <CSSReset/>
        <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
