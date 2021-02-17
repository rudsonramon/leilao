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
import register from '../../src/api/v1/Pessoas'
//import schema from './schema'
//import axios, { Method } from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function index(props) {
const {queryField, url} = props

  return (
    <Formik
      initialValues={{id:queryField['id'], tipo:queryField['tipo']}}
      enableReinitialize={true}
      //validationSchema={schema}
      onSubmit={(values, actions) => {
        if (queryField) {
          // PENDENTE DEFINIR AÇÃO DE ATUALIZAÇÃO - PUT
          register(values, url + '/tipo_documentos', 'PUT')
        } else {
          register(values, url + '/tipo_documentos', 'POST')
        }
        setTimeout(() => {
          actions.setSubmitting(false)
          cookies.remove('key')
          cookies.remove('value')
          window.location.href='/ConsultarTipoDocumento'
        }, 1000)

      }}
    >
      {(props) => (
        <Form>
          <Field name="tipo" type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.tipo && form.touched.tipo}>
                <FormLabel htmlFor="tipo">Tipo de documento</FormLabel>
                <Input {...field} id="tipo" placeholder="Informe o tipo do documento" />
                <FormErrorMessage>{form.errors.tipo}</FormErrorMessage>
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
            <Button size="lg"
              mt={4}
              colorScheme='secondary'
              onClick={() => {
                cookies.remove('key')
                cookies.remove('value')
              window.location.href='/ConsultarTipoDocumento'
            }}> Cancel</Button>
          </ButtonGroup>
        </Form>
      )}
    </Formik>
  )
}
