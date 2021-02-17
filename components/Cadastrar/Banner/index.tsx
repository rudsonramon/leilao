import React, {useState} from 'react'
import {
  FormControl,
  FormLabel,
  Button,
  ButtonGroup,
  Input,
  Select,
  Image,
  FormErrorMessage
} from "@chakra-ui/react"
import { Formik, Form, Field } from 'formik';
import { useForm } from 'react-hook-form'
import registerDoc from '../../../src/api/v1/Pessoas'// definir API
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function index(props) {
  const { queryField, url, _foto } = props
  const [insertRegister, setInsertRegister] = useState({})
  const [value, setValue] = React.useState(queryField)
  const [selectedValue, setSelectedValue] = React.useState("")
  const handleChange = (event) => {

    if (event.target.id === 'link') {
      setValue({ ...value, link: event.target.value })
    }
    if(event.target.id === 'nome')
      setValue({ ...value, nome: event.target.value })
  }

  const handleChangeSelect = (event) => {
    setSelectedValue(event.target.value)
  }

  const {register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
  const lugar = selectedValue
  //console.log(' VALIDACAO data.picture[0] -- >>>> :: ', data.picture[0])
  const formData = new FormData()
  formData.append('picture', data.picture[0])
  formData.append('codigo', value['nome'])

  const res = await fetch('http://localhost:3333/picture', {
      method: 'POST',
      body:formData
      }
    ).then(res => res.json())
    alert(JSON.stringify(res.file))
    s3RegisterImage(data.picture[0], lugar, value)
  }

  const s3RegisterImage = async (file, lugar, value) => {
    const formData = new FormData()
    formData.append('image', file)
    //GRAVAR IMAGEM NO S3
    const s3 = await fetch('http://localhost:3333/documentos_anexo', {
      method: 'POST',
      body:formData
    }).then(s3 => s3.json())
    //console.log(' VALIDAR RETORNO DA GRAVAÇÃO (LINK2) - http://localhost:3333/documentos_anexo:: ', s3)

    documentRegisterImage(s3['Location'], lugar, value)
  }

  const documentRegisterImage = async (link, lugar, value) => {
    //console.log(' >>>>>>>>>>> I GOT THE LINK: ', link)
    const formData = new FormData()

    formData.append('nome', value['nome']),
      formData.append('link', link),
      formData.append('foto', value['foto']),
      formData.append('lugar', lugar)

    function updateRegister(value) {
      //setInsertRegister({nome: name, link: link, foto, lugar })
      setInsertRegister(value)
    }

    updateRegister(value)

    console.log(' >> codigo/name: ', value['nome']),
    console.log(' >> link: ', link),
    console.log(' >> lugar: ', lugar),
    console.log(' >> insertRegister:: ', insertRegister)

    const url = 'http://localhost:3333'
    //GRAVAR IMAGEM NO S3 - postgresql
    let hasUpdate = false
    _foto ? (hasUpdate = true) : (hasUpdate = false)

    hasUpdate ? (
      registerDoc({id:queryField['id'], nome: value['nome'], foto: link, link:value['link'], lugar:lugar }, url + '/banner', 'PUT')
      //window.location.href='/ConsultarBanner'
    ): (
      registerDoc({ nome: value['nome'], foto: link, link: value['link'], lugar:lugar }, url + '/banner', 'POST'),
      window.location.href='/ConsultarBanner'
      )
      cookies.remove('id')
      cookies.remove('key')
      cookies.remove('value')
      cookies.remove('link')
      cookies.remove('foto')
    setTimeout(() => {
      window.location.href='/ConsultarBanner'
    }, 600)
  }

  function updateRegister(codigo:string, tipo:string, nome:string, link:string) {
    setInsertRegister({codigo: codigo, tipo: tipo, nome: nome, link: link })
  }

  function handleCancel() {
    window.location.href = '/ConsultarBanner'
    cookies.remove('id')
    cookies.remove('key')
    cookies.remove('value')
    cookies.remove('link')
    cookies.remove('foto')
  }

  return (
    <Formik
      initialValues={value}
      enableReinitialize={true}
//      validationSchema={schema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          if (queryField) {
            register(values, url + '/banner', 'PUT')
          } else {
            register(values, url + '/banner', 'POST')
          }
          actions.setSubmitting(false)
          window.location.href='/ConsultarBanner'
        }, 1000)

      }}
    >
      {(props) => (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Field name='nome' type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.nome && form.touched.nome}>
                <FormLabel htmlFor='nome'>Nome</FormLabel>
                <Input {...field} id='nome' name='nome' onChange={handleChange} placeholder='Informe seu Nome' />
                <FormErrorMessage>{form.errors.nome}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='lugar' type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.lugar && form.touched.lugar}>
                <FormLabel htmlFor='lugar'>Lugar</FormLabel>
                  <Select {...field} id='lugar' name='lugar' onChange={handleChangeSelect}>
                    <option>---</option>
                    <option value={1}>Home Topo</option>
                    <option value={2}>Home Rodapé</option>
                  </Select>
                <FormErrorMessage>{form.errors.lugar}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='foto' type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.foto && form.touched.foto}>
                <FormLabel htmlFor='foto'>Foto</FormLabel>
                <input {...field} ref={register} type='file' name='picture'></input>
                {field['foto']?(<Image maxWidth='100px' src={field['foto']}></Image>):(<Image maxWidth='100px' src={_foto}></Image>)}
                <FormErrorMessage>{form.errors.foto}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="link" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.link && form.touched.link}>
                <FormLabel htmlFor="link">Link</FormLabel>
                <Input {...field} id="link" name="link" onChange={handleChange} placeholder="Informe o link que será referenciado no banner" />
                <FormErrorMessage>{form.errors.link}</FormErrorMessage>
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
            <Button size='lg' mt={4} onClick={handleCancel}> Cancel</Button>
          </ButtonGroup>
          </Form>
      )}
    </Formik>
  )
}
