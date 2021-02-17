import React from 'react'
import Drawer from '../../components/Drawer'
import TipoDocumento from '../../components/TipoDocumento'
import {Box} from "@chakra-ui/react"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function tipoDocumento() {
  const queryField = { id:cookies.get('value'), tipo: cookies.get('key') }
  const url = 'http://localhost:3333'

  return (
    <Box>
      <Drawer/>
      <TipoDocumento queryField={queryField} url={url}/>
    </Box>
  )
}
