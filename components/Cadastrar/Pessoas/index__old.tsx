import React, { useState } from 'react'
const jwt = require('jsonwebtoken');
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputRightElement,
  InputLeftElement,
  InputGroup,
  Grid,
  GridItem,
  Button,
  ButtonGroup,
  Center,
  Select,
  Link,
  SkeletonText,
  Box,
} from "@chakra-ui/react"
import { PhoneIcon, AtSignIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import PageNotFound from '../../../src/pages/PageNotFound'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

import InputMask from 'react-input-mask';

import axios from 'axios'

const url = 'http://localhost:3333'

export default function index() {
  const [updateRegister, setUpdateRegister] = useState({})
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const queryField = cookies.get('key')
  let decoded = ''

    const CustomInputMask = (props) => (
      <InputMask mask={props['mask']} value={props['value']} onChange={props['onChange']}>
        {() => <Input id={props['id']} isRequired={props['isRequired']} type={props['type']} placeholder={props['placeholder']} px={props['px']}/>}
      </InputMask>
    );

    const [data, setData] = useState({})

    const handleRegister = (event: any) => {
      event.preventDefault()
      try {
        axios(url + '/cadastros', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
      },
          data: {
            "nome": data['name'],
            "email": data['email'],
            "nick": data['nick'],
            "cpf": data['cpf'],
            "rg":data['rg'],
            "sexo":data['gender'],
            "data_nascimento": data['birthday'],
            "telefone":data['phone'],
            "celular":data['mobile'],
            "endereco":data['address'],
            "numero": data['number'],
            "cep":data['zipcode'],
            "complemento":data['aditionalinfo'],
            "bairro":data['neighborhood'],
            "cidade": data['city'],
            "estado": data['state'],
            "pais": data['country'],
            "senha": data['password'],
          },
        })
          .then(res => {
            //console.log(res)
            console.log(res.data)
            setData(res.data)
          })
          .catch(error => {
            console.log(' method:POST - /cadastros - Error: ' + error)
        })

      } catch (error) {
        console.log(' method - handleRegister - Error: ' + error)
      }
    }

    const handleChange = (inputId: string, target: string) => {
      if (inputId == 'name') {
        setData({ ...data, name: target })
        //console.log('data: ' + JSON.stringify(data))
      }
      if (inputId == 'email') {

        setData({ ...data, email:target })
        //console.log('data: ' + JSON.stringify(data))
      }
      if (inputId == 'birthday' && target.substr(9, 1) !== '_') {
        setData({ ...data, birthday:target })
      }
      if (inputId == 'phone' && target.substr(13, 1) !== '_') {
        setData({ ...data, phone:target })
      }
      if (inputId == 'mobile' && target.substr(15, 1) !== '_') {
        setData({ ...data, mobile:target })
    }
    if (inputId == 'cpf' && target.substr(13, 1) !== '_') {
      setData({ ...data, cpf:target })
    }
    if (inputId == 'rg' && target.substr(9,1) !== '_') {
      setData({ ...data, rg:target })
    }
    if (inputId == 'zipcode' && target.substr(8,1) !== '_') {
      setData({ ...data, zipcode:target })
    }
    if (inputId == 'nick') {
      setData({ ...data, nick:target })
    }
    if (inputId == 'gender') {
      setData({ ...data, gender:target })
    }
    if (inputId == 'password') {
      setData({ ...data, password: target })
      passwordLength(String(target).length)
    }
    if (inputId == 'passwordConfirmation') {
      setData({ ...data, passwordConfirmation: target })
    }
    if (inputId == 'address') {
      setData({ ...data, address: target })
    }
    if (inputId == 'number') {
      setData({ ...data, number: target })
    }
    if (inputId == 'aditionalinfo') {
      setData({ ...data, aditionalinfo: target })
    }
    if (inputId == 'neighborhood') {
      setData({ ...data, neighborhood: target })
    }
    if (inputId == 'city') {
      setData({ ...data, city: target })
    }
    if (inputId == 'state') {
      setData({ ...data, state: target })
    }
    if (inputId == 'country') {
      setData({ ...data, country: target })
    }
  }
  let [counter, setCounter] = useState('')
  const passwordLength = (counter) => {
    return setCounter(counter)
  }

  let isInvalid = true
  if (data['email'] !== '' && String(data['password']).length > 2 && data['password'] && data['password'] === data['passwordConfirmation']) {
    isInvalid = false
  }

  async function handleUpdate(url: string, data: any) {
    try {
      axios(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          "cpf": data,
        },
      })
        .then(res => {
          //console.log('######### res.data - API =>> /consultar_cadastro ########## ', res.data)
          setUpdateRegister(res.data)
          //setData(res.data)
        })
        .catch(error => {
          console.log(' method:POST - /consultar_cadastro - Error: ' + error)
      })
    } catch (error) {
      console.error(' handleUpdate - /consultar_cadastro - Error: ' + error);
    }
  }

  try {
    if (queryField) {
      //decoded = jwt.verify(queryField, 'process.env.AUTH_SECRET');
      handleUpdate(url + '/consultar_cadastro', queryField)
    }
  }
  catch (error) {
    if (error['name'] === 'JsonWebTokenError') {
      console.log(' Usuário inválido, favor efetuar login com usuário/senha válidos: ', error)
      window.location.href='/'
    }
    console.log(' erro - Usuário inválido - Verifique o cadastro com o Administrador do site: ', error)
    cookies.remove('auth')
    cookies.remove('key')
  }
  return (
    <form onSubmit={handleRegister}>
      {
        !decoded.length > 1 ?
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
            <Center
            //GLASSMORPHISM
            bg={"rgba( 255, 255, 255, 0.25 )"}
            boxShadow={"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"}
            backdropFilter={"{blur( 4px )"}
            webkit-backdrop-filter={"blur( 4px )"}
            border-radius={"10px"}
            margin='auto'
            padding='15px'
          >
            <Grid
              templateRows='repeat(7, 1fr)'
              templateColumns='repeat(3, 1fr)'
              gap={3}
              w='80%'
              h='80%'
              justifyContent='center'
              alignContent='center'
              margin='40px'
              padding="30px"
            >
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Nome / Razão social</FormLabel>
                    <Input onChange={({ target }) => {
                      console.log(target.value)
                      handleChange('name', target.value)
                    }} isRequired id="name" type='text' placeholder="Nome/Razão Social" value={updateRegister?(updateRegister['nome']):('')}/>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl id="formEmail">
                  <FormLabel>Email</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<AtSignIcon color="gray.300" />}
                      />
                      <Input id='email' type='email' isRequired={true} px={30} onChange={({target}) => handleChange('email', target.value)} placeholder='email@example.com' value={updateRegister?(updateRegister['email']):('')}/>
                    </InputGroup>
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Nick</FormLabel>
                  <Input id="nick" isRequired placeholder="Nick" onChange={({target}) => handleChange('nick', target.value)} value={updateRegister?(updateRegister['nick']):('')}/>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>CPF</FormLabel>
                  <CustomInputMask id='cpf' type='document' isRequired placeholder={'999.999.999-99'} mask='999.999.999-99' onChange={({ target }) => handleChange('cpf', target.value)} value={updateRegister?(updateRegister['cpf']):(data['cpf'])}/>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>RG</FormLabel>
                  <CustomInputMask id='rg' type='document' isRequired placeholder={'99999999-9'} mask='99999999-9' onChange={({ target }) => handleChange('rg', target.value)} value={updateRegister?(updateRegister['rg']):(data['rg'])}/>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Sexo</FormLabel>
                    <Select onChange={({ target }) => handleChange('gender', target.value)} placeholder="Select option">
                      {updateRegister ? (
                        <>
                          <option value={updateRegister['sexo']}>{updateRegister['sexo']}</option>
                          <option value="Masculino">Masculino</option>
                          <option value="Feminino">Feminino</option>
                          <option value="Não informado">Não informar</option>
                        </>
                      ) : (
                        <>
                          <option value="Masculino">Masculino</option>
                          <option value="Feminino">Feminino</option>
                          <option value="Não informado">Não informar</option>
                        </>
                      )}
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <CustomInputMask mask='99/99/9999' id='birthday' type='birthday' onChange={({ target }) => handleChange('data_nascimento', target.value)} isRequired={true} placeholder={'dd/mm/yyyy'} value={updateRegister?(updateRegister['data_nascimento']):(data['data_nascimento'])}/>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Telefone</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<PhoneIcon color="gray.300" />}
                      />
                      <CustomInputMask mask='(99) 9999-9999' onChange={({ target }) => handleChange('phone', target.value)} px={35} id='phone' type='phone' isRequired={true} placeholder={'(99) 9999-9999'} value={updateRegister?(updateRegister['telefone']):(data['phone'])}/>
                    </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Celular</FormLabel>
                  <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<PhoneIcon color="gray.300" />}
                      />
                    <CustomInputMask mask='(99) 9 9999-9999' onChange={({ target }) => handleChange('mobile', target.value)} px={35} id='mobile' type='phone' isRequired={true} placeholder={'(99) 9 9999-9999'} value={updateRegister?(updateRegister['celular']):(data['mobile'])}/>
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Endereço</FormLabel>
                  <Input id="address" placeholder="Endereço" onChange={({target}) => handleChange('address', target.value)} value={updateRegister?(updateRegister['endereco']):('')}/>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Número</FormLabel>
                  <Input id='number' placeholder='Número' onChange={({target}) => handleChange('number', target.value)} value={updateRegister?(updateRegister['numero']):('')}/>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Cep</FormLabel>
                  <CustomInputMask id='zipcode' type='text' isRequired placeholder={'99999-999'} mask='99999-999' onChange={({target}) => handleChange('zipcode', target.value)} value={updateRegister?(updateRegister['cep']):(data['zipcode'])}/>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Complemento</FormLabel>
                  <Input id='aditionalinfo' placeholder='Compl.' onChange={({target}) => handleChange('aditionalinfo', target.value)} value={updateRegister?(updateRegister['complemento']):('')}/>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Bairro</FormLabel>
                  <Input id='neighborhood' placeholder="Bairro" onChange={({target}) => handleChange('neighborhood', target.value)} value={updateRegister?(updateRegister['bairro']):('')}/>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Cidade</FormLabel>
                  <Input id='city' placeholder='Cidade' onChange={({target}) => handleChange('city', target.value)} value={updateRegister?(updateRegister['cidade']):('')}/>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Estado</FormLabel>
                  <Input id='state' placeholder='Estado' onChange={({target}) => handleChange('state', target.value)} value={updateRegister?(updateRegister['estado']):('')}/>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>País</FormLabel>
                  <Input id='country' placeholder='País' onChange={({target}) => handleChange('country', target.value)} value={updateRegister?(updateRegister['pais']):('')}/>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Senha (+5 caracteres)</FormLabel>
                    <InputGroup size="md">
                    <Input id='password' max='2' isInvalid={Number.parseInt(counter) < 5?(true):(false)} errorBorderColor="red.300" onChange={({ target }) => handleChange('password', target.value)} type={show ? "text" : "password"} placeholder="Informe a sua Senha" />
                        <InputRightElement>
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? <ViewIcon/> : <ViewOffIcon/>}
                          </Button>
                      </InputRightElement>
                    </InputGroup>
                  <FormHelperText>Caracteres: {counter}</FormHelperText>
                  </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Confirmar Senha</FormLabel>
                    <Input id="passwordConfirmation" onChange={({ target }) => handleChange('passwordConfirmation', target.value)} type={show ? "text" : "password"} placeholder="Confirme a sua Senha" />
                  </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <ButtonGroup variant='outline' spacing='6'>
                      <Button size='lg' disabled={isInvalid} type='submit' colorScheme='blue'>
                        {
                          updateRegister ? ('Atualizar') : ('Gravar')
                        }
                      </Button>
                    <Link href='/' style={{ textDecoration: 'none' }}>
                        <Button size='lg' onClick={() => {
                          cookies.remove('key')
                      }}> Cancel</Button>
                    </Link>
                  </ButtonGroup>
                </FormControl>
              </GridItem>
            </Grid>
          </Center>
        )
      }
    </form>
  )
}
