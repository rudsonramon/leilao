import React, {useState} from 'react'
import ListSelect from '../../List'
import {
  FormControl,
  FormLabel,
  Button,
  ButtonGroup,
  FormErrorMessage
} from "@chakra-ui/react"
import { Formik, Form, Field } from 'formik';
import { useForm } from 'react-hook-form'
import registerDoc from '../../../src/api/v1/Pessoas'
import schema from './schema'
//import UploadInput from '../../UploadInput'

//import FileInput from '../../FileInput'

export default function index(props) {
  const [state, setState] = useState({
    selectedPerson: null,
  })

  const [stateType, setStateType] = useState({
    selectedDocument: null,
  })

  const [insertRegister, setInsertRegister] = useState({})

  const handleChange = selectedPerson => {
    setState({ selectedPerson });
    setInsertRegister({ ...insertRegister, selectedPerson })
    console.log('insertRegister :: ', insertRegister)
    console.log(`Option selected:`, selectedPerson);
  }

  const handleChangeType = selectedDocument => {
    setInsertRegister({ ...insertRegister, selectedDocument })
    console.log('insertRegister :: ', insertRegister)

    setStateType({ selectedDocument });
    console.log(`Option selected >>:`, selectedDocument);
  }

  const {queryField, url} = props
  const { selectedPerson } = state
  const { selectedDocument } = stateType

  const fileSelectedHandler = event => {
    //console.log(' >>>> VALIDAR VALOR SELECIONADO --- ', event.target.files[0])
    setInsertRegister(event.target.files[0])
  }

  const {register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('picture', data.picture[0])
    formData.append('codigo', selectedPerson['value'])
    formData.append('nome', selectedPerson['label'])
    formData.append('tipo', selectedDocument['value'])
    const res = await fetch('http://localhost:3333/picture', {
      method: 'POST',
      body:formData
    }
    ).then(res => res.json())
    alert(JSON.stringify(res.file))
    s3RegisterImage(data.picture[0])
  }

  const s3RegisterImage = async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    //GRAVAR IMAGEM NO S3
    const s3 = await fetch('http://localhost:3333/documentos_anexo', {
      method: 'POST',
      body:formData
    }).then(s3 => s3.json())
    console.log(' VALIDAR RETORNO DA GRAVAÇÃO (LINK2) - http://localhost:3333/documentos_anexo:: ', s3)

    documentRegisterImage(s3['Location'])
  }

  function updateRegister(codigo:string, tipo:string, nome:string, link:string) {
    setInsertRegister({codigo: codigo, tipo: tipo, nome: nome, link: link })
  }

  //GRAVAR DADOS DA IMAGEM


  function handleCancel() {
    window.location.href = '/ConsultarDocumento'
  }

  return (
    <Formik
      initialValues={{anexo:null, pessoa:'', documento: '' }}
      enableReinitialize={true}
      validationSchema={schema}
    >
      {(props) => (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Field name="tipo" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.tipo && form.touched.tipo}>
                <FormLabel htmlFor="tipo">Tipo</FormLabel>
                  <ListSelect {...field} id="tipo" type='text' onChange={fileSelectedHandler} url={'http://localhost:3333/tipo_documentos'} value={'tipo'} label={'nome'} handleChange={handleChangeType} selectedOption={selectedDocument}/>
                <FormErrorMessage>{form.errors.tipo}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="cadastro" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.cadastro && form.touched.cadastro}>
                <FormLabel htmlFor="cadastro">Selecionar cadastro</FormLabel>
                  <ListSelect {...field} id="cadastro" name='cadastro' type='text' url={'http://localhost:3333/cadastros'} value={'cpf'} label={'nome'} handleChange={handleChange} selectedOption={selectedPerson}/>
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
