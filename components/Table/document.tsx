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
    console.log('item ::>> ', item['key'])
    cookies.set('key', item['key'])
    cookies.set('value', item['value'])
    cookies.set('code', item['code'])
    //cookies.set('value', value)
      window.location.href = '/ManutencaoDocumento'
  }
  function handleNewRegister() {
    cookies.remove('key')
    window.location.href = '/Documento'
  }

  function FormatFormDate(data) {
    const date = String(data).split('T')[0]

    const ano = String(date).split('-')[0]
    const mes = String(date).split('-')[1]
    const dia = String(date).split('-')[2]
    const dateFormat = dia + '/' + mes + '/' + ano
    return dateFormat
  }

  return (
    <>
      {
        !registros ? //initialState[0]['loading'] ?
        (
          <Box boxShadow="lg" p={'5'} maxW={'900px'} margin='auto'>
              <SkeletonText mt="2" spacing="8" startColor="gray.200" endColor="gray.500" height="100px" />
              <SkeletonText mt="2" spacing="8" startColor="gray.200" endColor="gray.500" height="100px" />
              <SkeletonText mt="2" spacing="8" startColor="gray.200" endColor="gray.500" height="100px" />
              <SkeletonText  mt="2" spacing="8" startColor="gray.200" endColor="gray.500" height="100px" />
          </Box>
        )
        :
        (
          <Box boxShadow="lg" p={'5'} maxW={'900px'} margin='auto'>
            <Table variant="striped" colorScheme="gray">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
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
                      <Td>{FormatFormDate(item[fieldId[0]])}</Td>
                      <Td>{item[fieldId[1]]}</Td>
                      <Td>
                        {!item[fieldId[2]] ? ('Imagem não encontrada') : (
                          <Image borderRadius="full" boxSize="40px" src={item[fieldId[2]]} />
                        )}
                      </Td>
                      <Td>{item[fieldId[3]]}</Td>
                      <Td>
                        <Button size='md' colorScheme='blue' onClick={() => { handleUpdate({"key": item[fieldId[1]], "value":item[fieldId[3]], "code":item[fieldId[4]]}) }}>Atualizar</Button>
                      </Td>
                    </Tr>
                  )
                })
              }
            </Tbody>
            </Table>
            <ButtonGroup variant='outline' spacing='6'>
                <Button variant='solid' size='md' onClick={handleNewRegister} colorScheme='blue'>Inserir</Button>
              <Link href='/' style={{ textDecoration: 'none' }}>
                <Button size='md'> Cancel</Button>
              </Link>
            </ButtonGroup>
          </Box>
        )
      }
    </>
  )
}
