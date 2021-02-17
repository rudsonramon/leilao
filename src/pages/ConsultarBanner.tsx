import React from 'react'
import Drawer from '../../components/Drawer'
import Cookies from 'universal-cookie';
import Table from '../../components/Table/banner'
import PageNotFound from './PageNotFound'
import {Box} from "@chakra-ui/react"

export default function cadastro() {
  const headTitle = ['Nome', 'Foto', 'Lugar']
  const fieldId = ['nome', 'foto', 'lugar']
  const url = 'http://localhost:3333/banner'
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
