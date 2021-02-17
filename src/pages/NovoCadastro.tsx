import React from 'react'
import Drawer from '../../components/Drawer'
//import CadastrarPessoa from '../../components/Cadastrar/Pessoas'
import CadastrarPessoa from '../../components/Cadastrar/Pessoas'
import {Box} from "@chakra-ui/react"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function cadastro() {
  const queryField = cookies.get('key')
  const url = 'http://localhost:3333'
  return (
    <Box>
      <Drawer/>
      <CadastrarPessoa queryField={queryField} url={url}/>
    </Box>
  )
}
