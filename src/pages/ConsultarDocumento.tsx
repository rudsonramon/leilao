import React from 'react'
import Drawer from '../../components/Drawer'
import Cookies from 'universal-cookie';
import Table from '../../components/Table/document'
import PageNotFound from './PageNotFound'
import {Box} from "@chakra-ui/react"

export default function cadastro() {
  const headTitle = ['data', 'tipo', 'anexo', 'pessoa']
  const fieldId = ['createdAt', 'tipo', 'link', 'cadastro', 'codigo']
  const url = 'http://localhost:3333/documentos'
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
