import React, { useState, useEffect } from 'react'
import {SkeletonText, Image, Box, ButtonGroup, Button, Link, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react"
const axios = require('axios');
import Cookies from 'universal-cookie';

export default function cadastro(props) {
  const { headTitle, url, fieldId } = props

  const initialState = null//[{ loading: true}]
  const [registros, setRegistros] = useState(initialState)

  async function getUser(url) {
    try {
      const response = await axios.get(url);

      console.log('response :: ', response)

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
    cookies.set('value', item['value'])
    cookies.set('key', item['key'])
    window.location.href = '/TipoDocumento'
  }
  function handleNewRegister() {
    cookies.remove('key')
    window.location.href = '/TipoDocumento'
  }

  return (
    <>
      {
        !registros ? //initialState[0]['loading'] ?
        (
          <Box boxShadow="lg" p={'5'} maxW={'400px'} margin='auto'>
              <SkeletonText mt="2" spacing="8" startColor="gray.200" endColor="gray.500" height="100px" />
              <SkeletonText mt="2" spacing="8" startColor="gray.200" endColor="gray.500" height="100px" />
          </Box>
        )
        :
        (
          <Box boxShadow="lg" p={'5'} maxW={'300px'} margin='auto'>
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
                      <Td>
                        <Button size='md' colorScheme='blue' onClick={() => { handleUpdate({"value": item[fieldId[0]], "key": item[fieldId[1]]}) }}>Atualizar</Button>
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
                <Button size='lg'> Cancel</Button>
              </Link>
            </ButtonGroup>
          </Box>
        )
      }
    </>
  )
}
