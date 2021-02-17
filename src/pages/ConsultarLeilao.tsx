import React from 'react'
import Drawer from '../../components/Drawer'
import Cookies from 'universal-cookie';
import Table from '../../components/Table/leilao'
import PageNotFound from './PageNotFound'
import {Box} from "@chakra-ui/react"

export default function cadastro() {
  const headTitle = ['nome', 'meta', 'foto', 'codigo', 'edital', 'acrescimo']
  const fieldId = ['id', 'nome', 'meta', 'foto', 'codigo', 'edital', 'acrescimo']
  const url = 'http://localhost:3333/leilao'
  const cookies = new Cookies();
  return (
    <Box>
      {cookies.get('auth') ? (
        <>
          <Drawer />
          <Table headTitle={headTitle} url={url} fieldId={fieldId}/>
        </>
      ) : <PageNotFound />
      }
    </Box>
  )

}
