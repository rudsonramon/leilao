import React from 'react'
import Drawer from '../../components/Drawer'
import CadastrarDocumento from '../../components/Cadastrar/Documentos'
import {Box} from "@chakra-ui/react"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function documento() {
  const queryField = cookies.get('key')
  const url = 'http://localhost:3333'
  return (
    <Box>
      <Drawer/>
      <CadastrarDocumento queryField={queryField} url={url}/>
    </Box>
  )
}
