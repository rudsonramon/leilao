import React from 'react'
import Drawer from '../../components/Drawer'
//import CadastrarPessoa from '../../components/Cadastrar/Pessoas'
import CadastrarDocumento from '../../components/Cadastrar/Documentos/manutencao'
import {Box} from "@chakra-ui/react"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function manutencaoDocumento() {
  const queryField = { "key": cookies.get('key'), "value": cookies.get('value') }

  const url = 'http://localhost:3333'
  return (
    <Box>
      <Drawer/>
      <CadastrarDocumento queryField={queryField} url={url}/>
    </Box>
  )
}
