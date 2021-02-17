import React, {useCallback} from 'react'
import {
  Button,

  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import Dropzone, {useDropzone} from 'react-dropzone'
import { DropContainer, UploadMessage } from './styles'
//import FileList from '../../components/FileList'

export default function index(props) {
  const {onUpload} = props
  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <UploadMessage>Arraste arquivos aqui....</UploadMessage>
    }
    if (isDragReject) {
      return <UploadMessage type='error'>Arquivo não suportado</UploadMessage>
    }
    return <UploadMessage type='success'>Solte os arquivos aqui....</UploadMessage>
  }

    return (
      <Dropzone accept="image/*" onDropAccepted={onUpload}>
        {
          ({ getRootProps, getInputProps, isDragActive, isDragReject }) =>
            <DropContainer
              {...getRootProps()}
              isDragActive={isDragActive}
              isDragReject={isDragReject}
            >
              <input {...getInputProps()} />
              {renderDragMessage(isDragActive, isDragReject)}
            </DropContainer>
        }
      </Dropzone>
    );

}
