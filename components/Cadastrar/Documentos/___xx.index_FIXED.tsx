// TODO:(corrigir o submit do documento, para considerar o UID da imagem, no S3)

import React, {useState} from 'react'
import ListSelect from '../../List'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  ButtonGroup,
  FormErrorMessage
} from "@chakra-ui/react"
import { Formik, Form, Field } from 'formik';
import { useForm } from 'react-hook-form'
import schema from './schema'
import UploadInput from '../../UploadInput'

//import FileInput from '../../FileInput'

export default function index(props) {
  const [state, setState] = useState({
    selectedOption: null,
  })

  const [stateType, setStateType] = useState({
    selectedDocument: null,
  })

  const handleChange = selectedOption => {
    setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  const handleChangeType = selectedDocument => {
    setStateType({ selectedDocument });
    console.log(`Option selected:`, selectedDocument);
  }

  const {queryField, url} = props
  const { selectedOption } = state
  const { selectedDocument } = stateType

  const fileSelectedHandler = event => {
   console.log(event.target.files[0])
  }

  const {register, handleSubmit } = useForm()


  return (
        <>
      <UploadInput />
        </>
  )
}
