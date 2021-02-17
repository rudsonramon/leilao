import React, { useState, useEffect } from 'react'
import {SkeletonText, Image, Box, ButtonGroup, Button, Link, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"
const axios = require('axios');
import Cookies from 'universal-cookie';

export default function cadastro(props) {
  const { headTitle, url, fieldId } = props

  const initialState = null//[{ loading: true}]
  const [registros, setRegistros] = useState(initialState)

  async function getUser(url) {
    try {
      const response = await axios.get(url);

      //console.log('response :: ', response)

      setRegistros(response['data'])

    } catch (error) {
      console.error(error);
    }
  }

  //console.log('registros -->> : ', registros)
  useEffect(() => {
    setTimeout(async () =>{
      getUser(url)
    }, 900)
  }, [initialState]);

const cookies = new Cookies();

  //console.log("initialState['loading']: ", initialState)

  function handleUpdate(item) {
    //console.log(' VALIDAR A VARIAVEL - item :: ', item)
    cookies.set('id', item['id'])
    cookies.set('nome', item['nome'])
    cookies.set('meta', item['meta'])
    cookies.set('categoria', item['categoria'])
    cookies.set('foto', item['foto'])
    cookies.set('leilao', item['leilao'])

    /// ######## CONTINUAR A CONFIG

    window.location.href = '/Lotes'
  }
  function handleNewRegister() {
    cookies.remove('id')
    cookies.remove('key')
    cookies.remove('value')

    window.location.href = '/Lotes'
  }

  const handleCancel = () => {
    window.location.href='/MainMenu'
  }

  return (
    <>
      {
        !registros ? //initialState[0]['loading'] ?
        (
          <Box boxShadow="lg" p={'5'} maxW={'1400px'} margin='auto'>
              <SkeletonText mt="2" spacing="8" startColor="gray.200" endColor="gray.500" height="100px" />
          </Box>
        )
        :
        (
          <Box boxShadow="lg" p={'5'} maxW={'1200px'} margin='auto'>
            <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                {headTitle.map(item => {
                  return <Th>{ item }</Th>
                })}
              </Tr>
            </Thead>
            <Tbody>
              {
                registros.map(item => {
                  return (
                    <Tr>
                      <Td>{item[fieldId[1]]}</Td>
                      <Td>{item[fieldId[2]]}</Td>
                      <Td>{item[fieldId[3]]}</Td>
                      <Td>
                        {!item[fieldId[4]] ? ('Imagem não encontrada') : (
                            <Image borderRadius='full' boxSize="60px" src={item[fieldId[4]]} />
                        )}
                      </Td>
                      <Td>{item[fieldId[5]]}</Td>
                      <Td>{item[fieldId[6]]}</Td>
                      <Td>
                        <Button size='md' colorScheme='blue' onClick={() => { handleUpdate({"id":item['id'], "nome":item['nome'], "meta":item['meta'], "categoria":item['categoria'], "foto":item['foto'], "leilao":item['leilao']}) }}>Atualizar</Button>
                      </Td>
                    </Tr>
                  )
                })
              }
            </Tbody>
            </Table>
            <ButtonGroup variant='outline' spacing='6'>
                <Button variant='solid' size='lg' onClick={handleNewRegister} colorScheme='blue'>Inserir</Button>
              <Link href='/' style={{ textDecoration: 'none' }}>
                <Button size='lg' onClick={handleCancel}> Cancel</Button>
              </Link>
            </ButtonGroup>
          </Box>
        )
      }
    </>
  )
}
