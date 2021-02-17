import React, { useState, useEffect } from 'react'
import ListSelect from '../../List'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  ButtonGroup,
  SkeletonText,
  Box
} from "@chakra-ui/react"
import { Formik, Form, Field } from 'formik';
import { useForm } from 'react-hook-form'
import registerDoc from '../../../src/api/v1/Pessoas'
import schema from './schema'
import axios, { Method } from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function index(props) {
  const [state, setState] = useState({
    selectedItem: null,
  })

  const [insertRegister, setInsertRegister] = useState({})
  const [stateType, setStateType] = useState({
    selectedDocument: null,
  })

  const tipo = cookies.get('key')
  const nome = cookies.get('value')
  const codigo = cookies.get('code')

  const { queryField, url } = props
  const [queryRegister, setQueryRegister] = useState({})
  function queryUpdate(data: Object, url: string, method: Method) {
    try {
      axios(url, {
        method,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          'cadastro':data
        }
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

  function selectData(data: Object, url: string, method: Method) {
    try {
      axios(url, {
        method,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          'cpf':data['value']
        }
      })
        .then(res => {
          queryUpdate(res.data['nome'], 'http://localhost:3333' + '/documentos/' + tipo + "/" + codigo, 'GET')
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
        selectData(queryField, url + '/consultar_cadastro', 'POST')
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

//  let disabled = true
//  state['selectedItem']?(disabled = false):(disabled = true)

  const handleChange = selectedItem => {
    setState({ selectedItem });
    setInsertRegister({ ...insertRegister, selectedItem })
    console.log('insertRegister :: ', insertRegister)
    console.log(`Option selected:`, selectedItem);
  }
  const { selectedItem } = state
  const { selectedDocument } = stateType

  const fileSelectedHandler = event => {
    setInsertRegister(event.target.files[0])
  }

  const handleChangeType = selectedDocument => {
    setInsertRegister({ ...insertRegister, selectedDocument })
    console.log('insertRegister :: ', insertRegister)

    setStateType({ selectedDocument });
    console.log(`Option selected >>:`, selectedDocument);
  }

  function handleCancel() {
    window.location.href = '/ConsultarDocumento'
  }

  const {register, handleSubmit } = useForm()
  const onSubmit = async (data) => {

    const formData = new FormData()
    formData.append('picture', data.picture[0])

    selectedItem ? (
      formData.append('codigo', selectedItem['value']),
      formData.append('nome', selectedItem['label']),
      formData.append('tipo', selectedItem['value'])
    )
      :
      (
        formData.append('codigo', codigo),
        formData.append('nome', nome),
        formData.append('tipo', tipo)
    )

    const res = await fetch('http://localhost:3333/picture', {
      method: 'POST',
      body:formData
    }
    ).then(res => res.json())
    //alert(JSON.stringify(res.file))
    s3RegisterImage(data.picture[0])
  }

  const documentRegisterImage = async (link) => {
    //console.log(' >>>>>>>>>>> I GOT THE LINK: ', link)
    //console.log(' >>>>>>>>>>> I GOT THE selectedDocument: ', selectedDocument)
    const formData = new FormData()

    //const codigo = selectedItem['value']
    //const tipo = selectedDocument['value']
    //const nome = selectedItem['label']

    selectedItem ? (
      formData.append('codigo', selectedItem['value']),
      formData.append('tipo', selectedDocument['value']),
      formData.append('nome', nome),
      formData.append('link', link)
    )
      :
      (
        formData.append('codigo', codigo),
        formData.append('nome', nome),
        formData.append('tipo', tipo),
        formData.append('link', link)
    )

    function updateRegister(codigo:string, tipo:string, nome:string, link:string) {
      setInsertRegister({codigo: codigo, tipo: tipo, cadastro: nome, link: link })
    }

    updateRegister(codigo, tipo, nome, link)

    selectedItem ? (
      console.log(' >> codigo: ', selectedItem['value']),
      console.log(' >> tipo: ', selectedDocument['value']),
      console.log(' >> nome: ', selectedItem['label']),
      console.log(' >> link: ', link),
      console.log(' >> insertRegister:: ', insertRegister)
    )
      :
      (
        console.log(' >> codigo: ', codigo),
        console.log(' >> tipo: ', tipo),
        console.log(' >> cadastro: ', nome),
        console.log(' >> link: ', link),
        console.log(' >> insertRegister:: ', insertRegister)
    )

    //GRAVAR IMAGEM NO S3 - postgresql
    const url = 'http://localhost:3333'
    registerDoc({ codigo: codigo, tipo: tipo, cadastro: nome, link: link }, url + '/manutencao_documento', 'PUT')
    window.location.href='/ConsultarDocumento'
  }

  const s3RegisterImage = async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    //GRAVAR IMAGEM NO S3
    const s3 = await fetch('http://localhost:3333/documentos_anexo', {
      method: 'POST',
      body:formData
    }).then(s3 => s3.json())
    //console.log(' VALIDAR RETORNO DA GRAVAÇÃO (LINK2) - http://localhost:3333/documentos_anexo:: ', s3)

    documentRegisterImage(s3['Location'])
  }

  return (
    <>
      {!queryField ?
        (
          <Box boxShadow="lg" p={'5'} maxW={'900px'} margin='auto'>
            <SkeletonText mt="2" spacing="8" startColor="gray.200" endColor="gray.500" height="100px" />
            <SkeletonText mt="2" spacing="8" startColor="gray.200" endColor="gray.500" height="100px" />
            <SkeletonText mt="2" spacing="8" startColor="gray.200" endColor="gray.500" height="100px" />
            <SkeletonText mt="2" spacing="8" startColor="gray.200" endColor="gray.500" height="100px" />
          </Box>
        ) : (
          <Formik
            initialValues={queryRegister}
            enableReinitialize={true}
            validationSchema={schema}
            onSubmit={(values, actions) => {

              setTimeout(() => {
                if (queryField) {
                  register(values, url + '/manutencao_documento', 'PUT')
                } else {
                  register(values, url + '/documentos', 'POST')
                }
                actions.setSubmitting(false)
                //window.location.href='/ConsultarDocumento'
              }, 1000)

            }}
          >
            {(props) => (
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Field name="tipo" type='text'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.tipo && form.touched.tipo}>
                      <FormLabel htmlFor="tipo">Tipo</FormLabel>
                        <ListSelect {...field} id="tipo" type='text' selectedType={queryField['key']} onChange={fileSelectedHandler} url={'http://localhost:3333/tipo_documentos'} value={'tipo'} label={'tipo'} handleChange={handleChangeType} selectedOption={selectedDocument}/>
                      <FormErrorMessage>{form.errors.tipo}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="cadastro" type='text'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.cadastro && form.touched.cadastro}>
                    <FormLabel htmlFor="cadastro">Selecionar cadastro</FormLabel>
                      <ListSelect {...field} id="cadastro" name='cadastro' selectedValue={queryField['value']} type='text' url={'http://localhost:3333/cadastros'} value={'cpf'} label={'nome'} handleChange={handleChange} selectedOption={selectedItem} />
                    <FormErrorMessage>{form.errors.cadastro}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="anexo" type='text'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.anexo && form.touched.anexo}>
                      <input {...field} ref={register} type='file' name='picture'></input>
                    <FormErrorMessage>{form.errors.anexo}</FormErrorMessage>
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
                    //disabled={disabled}
                  >
                    {queryField ? ('Atualizar') : ('Gravar')}
                  </Button>
                  <Button size="lg" mt={4} onClick={handleCancel}> Cancel</Button>
                </ButtonGroup>
              </Form>
            )}
          </Formik>
        )
      }
    </>
  )
}
