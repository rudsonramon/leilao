import React, {useState, useEffect} from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  ButtonGroup,
} from "@chakra-ui/react"
import { Formik, Form, Field } from 'formik';
import register from '../../../src/api/v1/Pessoas'
import schema from './schema'
import axios, { Method } from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function index(props) {
const {queryField, url} = props
//  const queryField = cookies.get('key')
  function FormataStringData(data) {
    var dia  = data.split("/")[0];
    var mes  = data.split("/")[1];
    var ano  = data.split("/")[2];

    return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }

  function FormatFormDate(data) {
    const ano = String(data).split('-')[0]
    const mes = String(data).split('-')[1]
    const dia = String(data).split('-')[2]
    const dateFormat = dia + '/' + mes + '/' + ano
    return dateFormat
  }

  const [queryRegister, setQueryRegister] = useState({})
  if (queryRegister) {
    queryRegister['data_nascimento'] = FormatFormDate(queryRegister['data_nascimento'])
  }

  function queryUpdate(data: Object, url: string, method: Method) {
    try {
      axios(url, {
        method,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          'cpf':data
        }
      })
        .then(res => {
          //return res.data
          setQueryRegister(res.data)
        })
        .catch(error => {
          console.log(' method:' + method + ' - register - Error: ' + error)
      })

    } catch (error) {
      console.log(' method:' + method + ' - register - Error: ' + error)
    }
  }

  try {
    if (queryField) {
      useEffect(() => {
        //setTimeout(async () =>{
          queryUpdate(queryField, url + '/consultar_cadastro', 'POST')
        //}, 900)
      },[]);
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
    window.location.href='/PageNotFound'
  }

  return (
    <Formik
      initialValues={queryRegister}
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          values['data_nascimento'] = FormataStringData(values['data_nascimento'])
          if (queryField) {
            register(values, url + '/atualizar_cadastro', 'PUT')
          } else {
            register(values, url + '/cadastros', 'POST')
          }
          actions.setSubmitting(false)
        }, 1000)
        //window.location.href='/ConsultarCadastro'
      }}
    >
      {(props) => (
        <Form>
          <Field name="nome" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="nome">Nome / Razão social</FormLabel>
                <Input {...field} id="nome" placeholder="Informe seu Nome/Razão Social" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="email" type='email'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" placeholder="Informe seu e-mail" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="nick" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.nick && form.touched.nick}>
                <FormLabel htmlFor="nick">Nick</FormLabel>
                <Input {...field} id="Nick" placeholder="Informe seu nick" />
                <FormErrorMessage>{form.errors.nick}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="cpf" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.cpf && form.touched.cpf}>
                <FormLabel htmlFor="cpf">CPF</FormLabel>
                <Input {...field} id="cpf" placeholder="Informe seu CPF" />
                <FormErrorMessage>{form.errors.cpf}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="rg" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.rg && form.touched.rg}>
                <FormLabel htmlFor="rg">RG</FormLabel>
                <Input {...field} id="rg" placeholder="Informe seu RG" />
                <FormErrorMessage>{form.errors.rg}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="sexo" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.sexo && form.touched.sexo}>
                <FormLabel htmlFor="sexo">Genero</FormLabel>
                <Input {...field} id="sexo" placeholder="informe seu genero" />
                <FormErrorMessage>{form.errors.sexo}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="data_nascimento" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.data_nascimento && form.touched.data_nascimento}>
                <FormLabel htmlFor="data_nascimento">Data de Nascimento</FormLabel>
                <Input {...field} id="data_nascimento" placeholder="Informe sua data de nascimento" type='text'/>
                <FormErrorMessage>{form.errors.data_nascimento}</FormErrorMessage>
              </FormControl>
            )
            }
          </Field>
          <Field name="telefone" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.telefone && form.touched.telefone}>
                <FormLabel htmlFor="telefone">Telefone</FormLabel>
                <Input {...field} id="telefone" placeholder="(00) 0000-0000" />
                <FormErrorMessage>{form.errors.telefone}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="celular" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.celular && form.touched.celular}>
                <FormLabel htmlFor="celular">Celular</FormLabel>
                <Input {...field} id="celular" placeholder="(00) 0 00000-0000" />
                <FormErrorMessage>{form.errors.celular}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="endereco" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.endereco && form.touched.endereco}>
                <FormLabel htmlFor="endereco">Endereço</FormLabel>
                <Input {...field} id="endereco" placeholder="Informe seu endereço" />
                <FormErrorMessage>{form.errors.endereco}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="numero" type='number'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.numero && form.touched.numero}>
                <FormLabel htmlFor="numero">Número</FormLabel>
                <Input {...field} id="numero" type='number' placeholder="Informe número do seu logradouro" />
                <FormErrorMessage>{form.errors.numero}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="cep" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.cep && form.touched.cep}>
                <FormLabel htmlFor="cep">CEP</FormLabel>
                <Input {...field} id="cep" placeholder="Informe seu CEP" />
                <FormErrorMessage>{form.errors.cep}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="complemento" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.complemento && form.touched.complemento}>
                <FormLabel htmlFor="complemento">Complemento</FormLabel>
                <Input {...field} id="complemento" placeholder="Informe o complemento do seu logradouro" />
                <FormErrorMessage>{form.errors.complemento}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="bairro" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.bairro && form.touched.bairro}>
                <FormLabel htmlFor="bairro">Bairro</FormLabel>
                <Input {...field} id="bairro" placeholder="Informe o nome do bairro" />
                <FormErrorMessage>{form.errors.bairro}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="cidade" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.cidade && form.touched.cidade}>
                <FormLabel htmlFor="cidade">Cidade</FormLabel>
                <Input {...field} id="cidade" placeholder="Informe o nome da sua cidade" />
                <FormErrorMessage>{form.errors.cidade}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="estado" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.estado && form.touched.estado}>
                <FormLabel htmlFor="estado">Estado</FormLabel>
                <Input {...field} id="estado" placeholder="Informe o nome do Estado" />
                <FormErrorMessage>{form.errors.estado}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="pais" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.pais && form.touched.pais}>
                <FormLabel htmlFor="pais">Pais</FormLabel>
                <Input {...field} id="pais" placeholder="Pais" />
                <FormErrorMessage>{form.errors.pais}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="senha">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.senha && form.touched.senha}>
                <FormLabel htmlFor="senha">Senha</FormLabel>
                <Input {...field} id="senha" type='password' placeholder="Informe a sua senha" />
                <FormErrorMessage>{form.errors.senha}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <ButtonGroup variant="outline" spacing="6">
            <Button
              size='lg'
              mt={4}
              colorScheme='blue'
              isLoading={props.isSubmitting}
              type='submit'
            >
              {queryField?('Atualizar'):('Gravar')}
            </Button>
            <Button size="lg"> Cancel</Button>
          </ButtonGroup>
        </Form>
      )}
    </Formik>
  )
}
