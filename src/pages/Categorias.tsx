import React from 'react'
import Drawer from '../../components/Drawer'
import CadastrarCategorias from '../../components/Cadastrar/Categorias'
import {Box} from "@chakra-ui/react"

export default function tipoDocumento() {
  return (
    <Box>
      <Drawer/>
      <CadastrarCategorias/>
    </Box>
  )
}
