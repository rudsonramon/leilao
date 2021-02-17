import React from 'react'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Link,
  Box,
} from "@chakra-ui/react"
import { HamburgerIcon } from '@chakra-ui/icons'


export default function index(props:any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <Box>
      <Button ref={btnRef} colorScheme="gray" onClick={onOpen}>
        <HamburgerIcon/>
      </Button>
      <Drawer
        isOpen={isOpen? isOpen:props.open}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <Box h='40px'>
              <DrawerHeader>Administração do site</DrawerHeader>
            </Box>
            <Flex>
              <DrawerBody>
                <Box h='50px'>
                  <Link href='/ConsultarCadastro' style={{ textDecoration: 'none' }}>
                    <Button w='60' >Cadastro</Button>
                  </Link >
                </Box>
                <Box h='50px'>
                  <Link href='/ConsultarDocumento' style={{ textDecoration: 'none' }}>
                    <Button w='60' margin='0px'>Documento</Button>
                  </Link>
                </Box>
                <Box h='50px'>
                  <Link href='/ConsultarTipoDocumento' style={{ textDecoration: 'none' }}>
                    <Button w='60' >Tipos de Documento</Button>
                  </Link>
                </Box>
                <Box h='40px' marginTop='10px'>
                  <DrawerHeader marginTop='1'>Geral</DrawerHeader>
                </Box>
                <Box h='50px'>
                  <Link href='/ConsultarBanner' style={{ textDecoration: 'none' }}>
                    <Button w='60'>Banner</Button>
                  </Link>
                </Box>
                <Box h='50px'>
                  <Link href='/ConsultarLeilao' style={{ textDecoration: 'none' }}>
                    <Button w='60' marginTop='1'>Leilões</Button>
                  </Link>
                </Box>
                <Box h='50px'>
                  <Link href='/ConsultarLote' style={{ textDecoration: 'none' }}>
                    <Button w='60' marginTop='1'>Lotes</Button>
                  </Link>
                </Box>
                <Box h='50px'>
                  <Link href='/Categorias' style={{ textDecoration: 'none' }}>
                    <Button w='60' marginTop='1'>Categorias</Button>
                  </Link>
                </Box>
                <Box h='50px'>
                  <Link href='/Comitentes' style={{ textDecoration: 'none' }}>
                    <Button w='60' marginTop='1'>Comitentes</Button>
                  </Link>
                </Box>
                <Box>
                  <Box h='40px' marginTop='10px'>
                    <DrawerHeader >Paginas e Textos</DrawerHeader>
                  </Box>
                  <Box h='50px'>
                    <Button w='60' style={{ textDecoration: 'none' }}>Paginas</Button>
                  </Box>
                  <Box h='50px'>
                    <Button w='60' marginTop='1' style={{ textDecoration: 'none' }}>Serviços</Button>
                  </Box>
                  <Box h='50px'>
                    <Button w='60' marginTop='1' style={{ textDecoration: 'none' }}>Termos de Uso</Button>
                  </Box>
                  <Box h='50px'>
                    <Button w='60' marginTop='1' style={{ textDecoration: 'none' }}>Quem Somos</Button>
                  </Box>
                </Box>
              </DrawerBody>
            </Flex>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  )
}
