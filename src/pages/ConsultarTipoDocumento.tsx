import React from 'react'
import Drawer from '../../components/Drawer'
import Cookies from 'universal-cookie';
import Table from '../../components/Table/document_type'
import PageNotFound from './PageNotFound'
import {Box} from "@chakra-ui/react"

export default function cadastro() {
  const headTitle = ['tipo']
  const fieldId = ['id', 'tipo']
  const url = 'http://localhost:3333/tipo_documentos'
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
