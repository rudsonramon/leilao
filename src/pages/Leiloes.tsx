import React, { useState, useEffect } from 'react'
import Drawer from '../../components/Drawer'
import CadastrarLeiloes from '../../components/Cadastrar/Leiloes'
import {Box} from "@chakra-ui/react"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import axios, { Method } from 'axios'

export default function leilao() {
  const queryField = cookies.get('id')
  const url = 'http://localhost:3333'

  const [queryRegister, setQueryRegister] = useState({})
  let loadData = {}
  function queryUpdate(url: string, method: Method) {
    try {
      axios(url, {
        method,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then(res => {
          setQueryRegister(res.data)
        })
        .catch(error => {
          console.log(' method:' + method + ' - register - Error: ' + error)
      })

    } catch (error) {
      console.log(' method:' + method + ' - register - Error: ' + error)
    }
  }

  if (queryRegister) {
    loadData = {...loadData, id: queryRegister['id'], nome: queryRegister['nome'], meta: queryRegister['meta'], _foto:queryRegister['foto'], codigo: queryRegister['codigo'], _edital:queryRegister['edital'],acrescimo: queryRegister['acrescimo'], tipos: queryRegister['tipos'], natureza: queryRegister['natureza'], comitentes: queryRegister['comitentes'], observacao: queryRegister['observacao'], video: queryRegister['video'], linkExemplo: queryRegister['linkExemplo'] }
  }

  useEffect(() => {
    queryUpdate('http://localhost:3333/leilao/' + queryField, 'GET')
  }, [queryField]);

  return (
    <Box>
      <Drawer/>
      <CadastrarLeiloes loadData={loadData} queryRegister={queryRegister} queryField={queryField} url={url}/>
    </Box>
  )
}
