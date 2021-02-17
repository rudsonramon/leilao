import React from 'react'
import Drawer from '../../components/Drawer'
import CadastrarBanner from '../../components/Cadastrar/Banner/index'
import {Box} from "@chakra-ui/react"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function tipoDocumento() {

  const queryField = { id:cookies.get('id'), lugar: cookies.get('key'), nome:cookies.get('value'), link:cookies.get('link')}
  const url = 'http://localhost:3333'
  const _foto = cookies.get('foto')

  return (
    <Box>
      <Drawer/>
      <CadastrarBanner queryField={queryField} url={url} _foto={_foto}/>
    </Box>
  )
}
