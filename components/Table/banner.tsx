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
    cookies.set('id', item['id'])
    cookies.set('link', item['link'])
    cookies.set('foto', item['foto'])
    window.location.href = '/Banner'
  }
  function handleNewRegister() {
    cookies.remove('id')
    cookies.remove('key')
    cookies.remove('value')
    cookies.remove('link')
    cookies.remove('foto')

    window.location.href = '/Banner'
  }

  const handleCancel = () => {
    window.location.href='/MainMenu'
  }

  return (
    <>
      {
        !registros ? //initialState[0]['loading'] ?
        (
          <Box boxShadow="lg" p={'5'} maxW={'900px'} margin='auto'>
              <SkeletonText mt="2" spacing="8" startColor="gray.200" endColor="gray.500" height="100px" />
              <SkeletonText mt="2" spacing="8" startColor="gray.200" endColor="gray.500" height="100px" />
          </Box>
        )
        :
        (
          <Box boxShadow="lg" p={'5'} maxW={'900px'} margin='auto'>
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
                      <Td>{item[fieldId[0]]}</Td>
                      <Td>
                        {!item[fieldId[1]] ? ('Imagem não encontrada') : (
                            <Image borderRadius='full' boxSize="60px" src={item[fieldId[1]]} />
                        )}
                      </Td>
                      {item[fieldId[2]] === 1 ? (<Td>{'Home Topo'}</Td>) : (<Td>{'Home Rodapé'}</Td>)}
                      <Td>
                        <Button size='md' colorScheme='blue' onClick={() => { handleUpdate({"id":item['id'],"foto":item['foto'],"link":item['link'], "value": item[fieldId[0]], "key": item[fieldId[2]]}) }}>Atualizar</Button>
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
