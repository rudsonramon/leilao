import React, { useState, useEffect } from 'react'
import Drawer from '../../components/Drawer'
import CadastrarLotes from '../../components/Cadastrar/Lotes'
import { Box } from "@chakra-ui/react"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import axios, { Method } from 'axios'

export default function tipoDocumento() {
  let queryField = { id:cookies.get('id'), nome: cookies.get('nome'), meta:cookies.get('meta'), categoria:cookies.get('categoria'), foto:cookies.get('foto'), leilao:cookies.get('leilao')}

  return (
    <Box>
      <Drawer/>
      <CadastrarLotes queryField={queryField} />
    </Box>
  )
}
