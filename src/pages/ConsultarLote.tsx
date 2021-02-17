import React from 'react'
import Drawer from '../../components/Drawer'
import Cookies from 'universal-cookie';
import Table from '../../components/Table/lote'
import PageNotFound from './PageNotFound'
import {Box} from "@chakra-ui/react"

export default function cadastro() {
  const headTitle = ['nome', 'meta', 'categoria', 'foto', 'leilao', 'acrescimo']
  const fieldId = ['id', 'nome', 'meta', 'categoria', 'foto', 'leilao', 'acrescimo']
  const url = 'http://localhost:3333/lotes'
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
