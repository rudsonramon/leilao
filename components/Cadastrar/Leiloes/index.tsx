import React, { useState, useEffect } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  ButtonGroup,
  Select,
  Image,
} from "@chakra-ui/react"
import { Formik, Form, Field } from 'formik';
import { useForm } from 'react-hook-form'
import registerDoc from '../../../src/api/v1/Pessoas'// definir API

let linkAttachment = {}
let selectedPhoto = {}
let selectedEdital = null
let selectedFoto = null

export default function index(props) {
  const { queryField, url, queryRegister, loadData } = props
  const [value, setValue] = React.useState(queryField)

  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    selectedEdital = data.anexo[0]
    selectedFoto = data.picture[0]
    if (data.anexo[0]) {
      s3RegisterImage('', value, data.anexo[0])
    }

///************* AVALIAR REMOÇÃO */
    const formData = new FormData()
    //formData.append('picture', data.picture[0])
    formData.append('picture', data.picture[0])
    formData.append('codigo', value['nome'])

    const res = await fetch('http://localhost:3333/picture', {
      method: 'POST',
      body:formData
    }
    ).then(res => res.json())
    alert(JSON.stringify(res.file))
///************* AVALIAR REMOÇÃO */
    if (data.picture[0]) {
      s3RegisterImage(data.picture[0], value, '')
    }
  }
  //const s3RegisterImage = async (file, value, attachment) => {
    const s3RegisterImage = async (file, value, attachment) => {
    const formData = new FormData()
    if (String(file).length > 1) {
      formData.append('image', file)
    }
    if (String(attachment).length > 1) {
      formData.append('image', attachment)
    }
    //GRAVAR IMAGEM NO S3
    const s3 = await fetch('http://localhost:3333/documentos_anexo', {
      method: 'POST',
      body:formData
    }).then(s3 => s3.json())

    if (String(file).length > 1) {
      //linkAttachment = {...linkAttachment, file: s3['Location']}
      //selectedPhoto = {file: s3['Location']}
      selectedPhoto = {foto:s3['Location']}
    }
    if (String(attachment).length > 1) {
      //linkAttachment = {...linkAttachment, attachment: s3['Location']}
      //linkAttachment = {attachment: s3['Location']}
      linkAttachment = {attachment:s3['Location']}
    }
    //if (String(linkAttachment['file']).length > 1 || String(linkAttachment['attachment']).length > 1) {
    //documentRegisterImage(value, selectedPhoto['file'], linkAttachment['attachment'])
    documentRegisterImage(value, selectedPhoto['foto'], linkAttachment['attachment'])
  }

  const documentRegisterImage = async (value, foto, edital) => {

    //const url = 'http://localhost:3333'

    let hasUpdate = false
    queryField ? (hasUpdate = true) : (hasUpdate = false)
    const id = value['id'] || loadData['id']
    const nome = value['nome'] || loadData['nome']
    const meta = value['meta'] || loadData['meta']
    const _foto = foto || loadData['foto']
    const _edital = edital || loadData['edital']
    const codigo = value['codigo'] || loadData['codigo']
    const acrescimo = value['acrescimo'] || loadData['acrescimo']
    const tipos = value['tipos'] || loadData['tipos']
    const natureza = value['natureza'] || loadData['natureza']
    const comitentes = value['comitentes'] || loadData['comitentes']
    const observacao = value['observacao'] || loadData['observacao']
    const video = value['video'] || loadData['video']
    const linkExemplo = value['linkExemplo'] || loadData['linkExemplo']

    hasUpdate ? (
      //registerDoc({ id: id, nome: nome, meta: meta, foto: foto, edital:edital, codigo: codigo, acrescimo: value['acrescimo'], tipos: value['tipos'], natureza: value['natureza'], comitentes: value['comitentes'], observacao: value['observacao'], video: value['video'], linkExemplo: value['linkExemplo'] }, url + '/leilao', 'PUT')
      registerDoc({ id: id, nome: nome, meta: meta, foto: _foto, edital: _edital, codigo: codigo, acrescimo: value['acrescimo'], tipos: value['tipos'], natureza: value['natureza'], comitentes: value['comitentes'], observacao: value['observacao'], video: value['video'], linkExemplo: value['linkExemplo'] }, url + '/leilao', 'PUT'),
      setTimeout(() => {
        window.location.href='/ConsultarLeilao'
      }, 1400)
    ) : (
        insertData(selectedEdital, selectedFoto, value, _foto, _edital, url)
      )
  }
  function insertData(selectedEdital, selectedFoto, value, foto, edital, url) {
    if (selectedEdital !== '' && selectedFoto !== '') {
      registerDoc({ nome: value['nome'], meta: value['meta'], foto: foto, edital: edital, codigo: value['codigo'], acrescimo: value['acrescimo'], tipos: value['tipos'], natureza: value['natureza'], comitentes: value['comitentes'], observacao: value['observacao'], video: value['video'], linkExemplo: value['linkExemplo'] }, url + '/leilao', 'POST')
      setTimeout(() => {
        window.location.href='/ConsultarLeilao'
      }, 3000)
    }
  }

  function handleCancel() {
    window.location.href = '/ConsultarLeilao'
  }

  const handleChange = (event) => {
    if (event.target.name === 'picture') {
      setValue({ ...value, picture: event.target.value })
    }
    if (event.target.name === 'anexo') {
      setValue({ ...value, anexo: event.target.value })
    }
    if (event.target.id === 'nome') {
      setValue({ ...value, nome: event.target.value })
    }
    if (event.target.id === 'meta') {
      setValue({ ...value, meta: event.target.value })
    }
    if (event.target.id === 'codigo') {
      setValue({ ...value, codigo: event.target.value })
    }
    if (event.target.id === 'acrescimo') {
      setValue({ ...value, acrescimo: event.target.value })
    }
    if (event.target.id === 'comitentes') {
      setValue({ ...value, comitentes: event.target.value })
    }
    if (event.target.id === 'observacao') {
      setValue({ ...value, observacao: event.target.value })
    }
    if (event.target.id === 'video') {
      setValue({ ...value, video: event.target.value })
    }
    if (event.target.id === 'linkExemplo') {
      setValue({ ...value, linkExemplo: event.target.value })
    }
    if (event.target.id === 'tipos') {
      setValue({ ...value, tipos: event.target.value })
    }
    if (event.target.id === 'natureza') {
      setValue({ ...value, natureza: event.target.value })
    }
  }

  return (
    <Formik
      initialValues={loadData}
      enableReinitialize={true}
      //      validationSchema={schema}
    >
      {(props) => (
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Field name='nome' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.nome && form.touched.nome}>
              <FormLabel>Nome</FormLabel>
              <Input {...field} id='nome' name='nome' onChange={handleChange} placeholder="Nome"/>
            </FormControl>
          )}
        </Field>
        <Field name='meta' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.meta && form.touched.meta}>
              <FormLabel>Meta (Titulo do site)</FormLabel>
              <Input {...field} id="meta" onChange={handleChange} placeholder="Informe o titulo do site"/>
            </FormControl>
          )}
        </Field>
        <Field name='foto' type='text'>
          {({ field, form }) => (
          <FormControl isInvalid={form.errors.foto && form.touched.foto}>
            <FormLabel>Foto</FormLabel>
            {queryRegister['foto'] ? (
              <Image width='200px' src={loadData['_foto']} ></Image>
            ) : (
              ''
            )
            }
            <input {...field} ref={register} onChange={handleChange} type='file' name='picture'></input>
          </FormControl>
          )}
        </Field>
        <Field name='codigo' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.codigo && form.touched.codigo}>
              <FormLabel>Código</FormLabel>
              <Input {...field} id="codigo" onChange={handleChange} placeholder="Código"/>
            </FormControl>
            )}
        </Field>
        <Field name='edital' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.edital && form.touched.edital}>
            <FormLabel>Edital</FormLabel>
            {queryRegister['edital'] ? (
              <Image width='200px' src={loadData['_edital']} ></Image>
            ) : (
              ''
            )
            }
              <input {...field} ref={register} type='file' name='anexo' onChange={handleChange}></input>
            </FormControl>
          )}
        </Field>
        <Field name='acrescimo' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.acrescimo && form.touched.acrescimo}>
              <FormLabel>Acréscimo</FormLabel>
              <Input {...field} id="acrescimo" type='number' onChange={handleChange} placeholder="Acréscimo"/>
            </FormControl>
          )}
        </Field>
        <Field name='tipos' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.tipos && form.touched.tipos}>
              <FormLabel>Tipos</FormLabel>
              <Select {...field} id='tipos' name='tipos' onChange={handleChange}>
                <option>---</option>
                <option value={1}>On Line</option>
                <option value={2}>On Line e presencial</option>
                <option value={3}>Presencial</option>
                <option value={4}>Rural</option>
              </Select>
            </FormControl>
          )}
        </Field>
        <Field name='natureza' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.natureza && form.touched.natureza}>
              <FormLabel>Natureza</FormLabel>
              <Select {...field} id='natureza' name='natureza' onChange={handleChange}>
                <option>---</option>
                <option value={1}>Extra Judicial</option>
                <option value={2}>Judicial</option>
                <option value={3}>Privado</option>
                <option value={4}>Venda Direta</option>
              </Select>
            </FormControl>
          )}
        </Field>
        <Field name='comitentes' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.comitentes && form.touched.comitentes}>
              <FormLabel>Comitentes</FormLabel>
              <Input {...field} id="comitentes" onChange={handleChange} placeholder="Comitentes" />
            </FormControl>
          )}
        </Field>
        <Field name='observacao' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.observacao && form.touched.observacao}>
              <FormLabel>Observação</FormLabel>
              <Input {...field} id="observacao" onChange={handleChange} placeholder="Observação"/>
            </FormControl>
          )}
        </Field>
        <Field name='video' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.video && form.touched.video}>
              <FormLabel>Vídeo Ao vivo</FormLabel>
              <Input {...field} id="video" onChange={handleChange} placeholder="Vídeo Ao vivo"/>
            </FormControl>
          )}
        </Field>
        <Field name='linkExemplo' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.linkExemplo && form.touched.linkExemplo}>
              <FormLabel>Exemplo de Link de um Vídeo Ao Vivo</FormLabel>
              <Input {...field} id="linkExemplo" onChange={handleChange} placeholder="Exemplo de Link de um Vídeo Ao Vivo"/>
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
