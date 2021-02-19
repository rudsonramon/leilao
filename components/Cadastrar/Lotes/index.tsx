import React, { useState, useEffect } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  ButtonGroup,
  Select,
  Image,
//MODAL
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import ListSelect from '../../List'
import Upload from '../../Upload'
import FileList from '../../FileList'
import { Formik, Form, Field } from 'formik';
import { useForm } from 'react-hook-form'
import registerDoc from '../../../src/api/v1/Pessoas'// definir API
import axios, { Method } from 'axios'
import { uniqueId} from 'lodash'
import filesize from 'filesize'

let linkAttachment = {}
let selectedPhoto = {}
let selectedEdital = null
let selectedFoto = null
let selectedArquivo1 = null
let selectedArquivo2 = null
let selectedArquivo3 = null

export default function index(props) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { queryField } = props
  const [value, setValue] = React.useState(queryField)
  //console.log(' VALIDAR -->>>>>>>>>>>>>>> value..... ', value)
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    selectedEdital = data.anexo[0]
    selectedFoto = data.picture[0]
    selectedArquivo1 = data.arquivo1[0]
    selectedArquivo2 = data.arquivo2[0]
    selectedArquivo3 = data.arquivo3[0]

    if (data.anexo[0]) {
      s3RegisterImage('', value, data.anexo[0], '', '', '')
    }

    if (data.picture[0]) {
      s3RegisterImage(data.picture[0], value, '', '', '', '')
    }

    if (data.arquivo1[0]) {
      s3RegisterImage('', value, '', data.arquivo1[0], '', '')
    }

    if (data.arquivo2[0]) {
      s3RegisterImage('', value, '', '', selectedArquivo2, '')
    }
    if (data.arquivo3[0]) {
      s3RegisterImage('', value, '', '', '', selectedArquivo3)
    }
  }

  function handleCancel() {
    window.location.href = '/ConsultarLote'
  }

  const handleChange = (event) => {
    if (event.target.id === 'nome') {
      setValue({ ...value, nome: event.target.value })
    }
    if (event.target.id === 'meta') {
      setValue({ ...value, meta: event.target.value })
    }
  }

  const [state, setState] = React.useState({
    uploadedFiles:[],
  })

  const handleUpload = files => {
    console.log(' VALIDAR A VARIAVEL FILES ===>>>> ', files)
    const uploadFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readbleSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }))
    console.log(' VALIDAR A VARIAVEL uploadedFiles ------>>>>> ', uploadedFiles)
    setState({
      //uploadedFiles: state.uploadedFiles.concat(uploadedFiles)
      uploadedFiles,
    })
  }

  const {uploadedFiles} = state
  //console.log(' VALIDAR A VARIAVEL uploadedFiles --->> ', uploadedFiles)
  //console.log(' VALIDAR A VARIAVEL uploadedFiles --->> ', uploadedFiles)
  //console.log(' VALIDAR A VARIAVEL state --->> ', state)

  return (
    <Formik
      initialValues={value}
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
          <Field name='categoria' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.categoria && form.touched.categoria}>
              <FormLabel>Categorias</FormLabel>
              <Select {...field} id='categoria' name='categoria' onChange={handleChange}>
                <option>---</option>
                <option value={'Ações - Cadastrar Novo'}>Ações - Cadastrar Novo</option>
                <option value={'Ações - Gerenciar item'}>Ações - Gerenciar item</option>
                <option value={'Itens - Caminhões'}>Itens - Caminhões</option>
                <option value={'Itens - Motos'}>Itens - Motos</option>
                <option value={'Itens - Sucadas'}>Itens - Sucadas</option>
                <option value={'Itens - SUV'}>Itens - SUV</option>
                <option value={'Itens - Utilitários'}>Itens - Utilitários</option>
                <option value={'Itens - Veiculos'}>Itens - Veiculos</option>
              </Select>
            </FormControl>
          )}
        </Field>
        <Field>
          {({ field, form }) => (
          <FormControl isInvalid={form.errors.foto && form.touched.foto}>
            <FormLabel>Foto</FormLabel>
                {
                  value['foto'] ? (
                    <>
                      <Image width='200px' src={value['foto']} ></Image>
                      <Button size='lg' mt={2} onClick={onOpen}>Editar</Button>
                      <Modal
                        size={"xl"}
                        isCentered
                        onClose={onClose}
                        isOpen={isOpen}
                        motionPreset="slideInBottom"
                      >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Selecione a nova imagem</ModalHeader>
                        <ModalCloseButton />
                          <ModalBody>
                            <Upload onUpload={handleUpload} />
                            { !!uploadedFiles.length && (
                              <FileList files={uploadedFiles}/>
                            )}
                        </ModalBody>
                        <ModalFooter>
                          <Button colorScheme="blue" mr={3}>
                            Gravar
                          </Button>
                          <Button variant="ghost" onClick={onClose}>Fechar</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                    </>
                  ) : (
                    <input {...field} ref={register} onChange={handleChange} type='file' name='picture'></input>
                  )
                }
          </FormControl>
          )}
        </Field>
        <Field name='leilao' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.leilao && form.touched.leilao}>
              <FormLabel>Leilão</FormLabel>
              <Select {...field} id='leilao' name='leilao' onChange={handleChange}>
                <option>---</option>
                <option value={'Caminhões utilitários'}>Caminhões utilitários</option>
                <option value={'Motos'}>Motos</option>
                <option value={'Recuperados de Financiamento'}>Recuperados de Financiamento</option>
                <option value={'Sucadas'}>Sucadas</option>
              </Select>
            </FormControl>
          )}
        </Field>
        <Field name='dataInicio' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.dataInicio && form.touched.dataInicio}>
              <FormLabel>Data Inicio</FormLabel>
              <Input {...field} id='dataInicio' onChange={handleChange} placeholder='Data Inicio'/>
            </FormControl>
            )}
          </Field>
          <Field name='dataFim' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.dataFim && form.touched.dataFim}>
              <FormLabel>Data Fim</FormLabel>
              <Input {...field} id='dataFim' onChange={handleChange} placeholder='Data Fim'/>
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
