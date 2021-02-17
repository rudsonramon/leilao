import React, {useState} from 'react'
import { Link , Flex, Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react"
import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
//if (cookies.get('auth')) {
  //cookies.remove('auth')
//}

const url = 'http://localhost:3333'

export default function index() {

  const [data, setData] = useState<any>({})
  const [token, setToken] = useState<any>('')

const handleChange = (inputId: string, target: string) => {
  if (inputId == 'cpf') {
    setData({ ...data, cpf: target })
  }
  if (inputId == 'password') {
    setData({ ...data, password: target })
  }
}

  const sendLogin = () => {
  try {
    axios(url + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
      data: {
        "cpf": data['cpf'],
        "senha": data['password'],
      },
    })
      .then(res => {
        //console.log('######### res.data ########## ', res.data)
        setToken(res.data['token'])
      })
      .catch(error => {
        console.log(' method:POST - /login - Error: ' + error)
    })

  } catch (error) {
    console.log(' method - handleRegister - Error: ' + error)
  }
  }

  if (token) {
    cookies.set('auth', token)
    window.location.href = '/MainMenu'
  }

  return (
    <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
      <Box bg={"blue.500"} rounded="20px" overflow="hidden" w="70%" maxW='400px' h="70%" p={4} color={"black"}>
        <form>
          <FormControl paddingTop='5'>
            <FormLabel>CPF</FormLabel>
            <Input id='cpf' type='text' placeholder="CPF" color="white" size="lg" onChange={({target}) => handleChange('cpf', target.value)} isRequired />
          </FormControl>
          <FormControl paddingTop='5'>
            <FormLabel>Senha</FormLabel>
            <Input placeholder="Senha" size="lg" type="password" onChange={({target}) => handleChange('password', target.value)} isRequired/>
          </FormControl>
          <Button variant='solid' width="full" mt={9} onClick={(event) => {
            try {
              sendLogin()
            } catch (error) {
              console.log(' Login Authentication error - ', error)
            }

          }} >Entrar</Button>
          <Link href='/' style={{ textDecoration: 'none' }}>
            <Button  mt={2}>Voltar</Button>
          </Link>
        </form>
      </Box>
    </Flex>
  )
}

