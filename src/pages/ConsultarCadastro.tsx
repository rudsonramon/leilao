import React from 'react'
import Drawer from '../../components/Drawer'
import Cookies from 'universal-cookie';
import Table from '../../components/Table/person'
import PageNotFound from '../../src/pages/PageNotFound'
import {Box} from "@chakra-ui/react"

export default function cadastro() {
  const headTitle = ['CPF', 'Nome', 'RG', 'Nick', 'Ação']
  const url = 'http://localhost:3333/cadastros'
  const cookies = new Cookies();
//backgroundImage="url('/blueBackground.png')"   backgroundRepeat="no-repeat"
  return (
    <Box>
      {cookies.get('auth') ? (
        <>
          <Drawer />
          <Table headTitle={headTitle} url={url} />
        </>
      ) : <PageNotFound />
      }
    </Box>
  )

}
