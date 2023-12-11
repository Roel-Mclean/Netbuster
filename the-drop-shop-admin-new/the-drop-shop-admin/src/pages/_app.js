import '@/styles/globals.css'
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html, body {
  color: #1F1F1F;
}
`

export default function App({ Component, pageProps }) {
  return (
    <> 
    <GlobalStyle/>
    <Component  {...pageProps} />
    </>
  
  )
}
