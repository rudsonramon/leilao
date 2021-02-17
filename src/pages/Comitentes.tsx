import React from 'react'
import Drawer from '../../components/Drawer'
import CadastrarComitentes from '../../components/Cadastrar/Comitentes'
import {Box} from "@chakra-ui/react"

export default function tipoDocumento() {
  return (
    <Box>
      <Drawer/>
      <CadastrarComitentes/>
    </Box>
  )
}
