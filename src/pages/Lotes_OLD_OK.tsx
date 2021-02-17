import React, { useState, useEffect } from 'react'
import Drawer from '../../components/Drawer'
import CadastrarLotes from '../../components/Cadastrar/Lotes'
import { Box } from "@chakra-ui/react"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import axios, { Method } from 'axios'

export default function tipoDocumento() {
  let queryField = { id:cookies.get('id'), nome: cookies.get('nome'), meta:cookies.get('meta')}

  const url = 'http://localhost:3333/lotes/' + queryField

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
  queryField = {id:queryRegister['id'], nome:queryRegister['nome']}

  if (queryRegister) {
    loadData = {...loadData, id: queryRegister['id'], nome: queryRegister['nome'], meta: queryRegister['meta'], categoria: queryRegister['categoria'], _foto:queryRegister['foto'], leilao:queryRegister['leilao'], dataInicio: queryRegister['dataInicio'], dataFim:queryRegister['dataFim'],lanceInicial: queryRegister['lanceInicial'], lanceMinimo: queryRegister['lanceMinimo'], dataInicioSegundaPraca: queryRegister['dataInicioSegundaPraca'], dataFimSegundaPraca: queryRegister['dataFimSegundaPraca'], lanceMinimoSegundaPraca: queryRegister['lanceMinimoSegundaPraca'], comissaoLeiloeiro: queryRegister['comissaoLeiloeiro'], incremento: queryRegister['incremento'], acrescimo: queryRegister['acrescimo'], sucata: queryRegister['sucata'], endereco: queryRegister['endereco'], estado: queryRegister['estado'], google_maps: queryRegister['google_maps'], observacao: queryRegister['observacao'], _edital: queryRegister['edital'], _arquivo1: queryRegister['arquivo1'], _arquivo2: queryRegister['arquivo2'], _arquivo3: queryRegister['arquivo3'], anexo1: queryRegister['anexo1'], anexo2: queryRegister['anexo2'], anexo3: queryRegister['anexo3'], metaDescricao: queryRegister['metaDescricao'], descricaoCompleta: queryRegister['descricaoCompleta'] , descricaoExtra1: queryRegister['descricaoExtra1'], tituloDescricaoExtra1: queryRegister['tituloDescricaoExtra1']}
    queryField = {id: queryRegister['id'], nome: queryRegister['nome'], meta: queryRegister['meta'], categoria: queryRegister['categoria'], _foto:queryRegister['foto'], leilao:queryRegister['leilao'], dataInicio: queryRegister['dataInicio'], dataFim:queryRegister['dataFim'],lanceInicial: queryRegister['lanceInicial'], lanceMinimo: queryRegister['lanceMinimo'], dataInicioSegundaPraca: queryRegister['dataInicioSegundaPraca'], dataFimSegundaPraca: queryRegister['dataFimSegundaPraca'], lanceMinimoSegundaPraca: queryRegister['lanceMinimoSegundaPraca'], comissaoLeiloeiro: queryRegister['comissaoLeiloeiro'], incremento: queryRegister['incremento'], acrescimo: queryRegister['acrescimo'], sucata: queryRegister['sucata'], endereco: queryRegister['endereco'], estado: queryRegister['estado'], google_maps: queryRegister['google_maps'], observacao: queryRegister['observacao'], _edital: queryRegister['edital'], _arquivo1: queryRegister['arquivo1'], _arquivo2: queryRegister['arquivo2'], _arquivo3: queryRegister['arquivo3'], anexo1: queryRegister['anexo1'], anexo2: queryRegister['anexo2'], anexo3: queryRegister['anexo3'], metaDescricao: queryRegister['metaDescricao'], descricaoCompleta: queryRegister['descricaoCompleta'] , descricaoExtra1: queryRegister['descricaoExtra1'], tituloDescricaoExtra1: queryRegister['tituloDescricaoExtra1']}
  }

  useEffect(() => {
    queryUpdate(url, 'GET')
  //}, [queryField]);
}, []);

  return (
    <Box>
      <Drawer/>
      <CadastrarLotes loadData={loadData} queryRegister={queryRegister} queryField={queryField} />
    </Box>
  )
}
