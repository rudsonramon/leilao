import {createGlobalStyle} from 'styled-components'
import 'react-circular-progressbar/dist/styles.css'

export default createGlobalStyle`
* {
  margin:0;
  pading:0;
  box-sizing:border-box
}
body{
  font-family: Arial, Helvetica, sans-serif;
  font-size:14px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  background: #FFF;
  font: 400 16px Roboto, sans-serif
}

html, body, #root{
  height: 100%;
}
`
