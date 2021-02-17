import React from 'react'
import { Box, Image, Flex, Spacer  } from "@chakra-ui/react"

export default function PageNotFound() {
  return (
    <Flex direction='row'>
      <Box margin='auto' marginLeft='8rem' fontSize='3rem' direction='row'>
        404 - Não encontrado / Não autorizado
      </Box>
      <Spacer/>
      <Box>
        <Image
          boxSize='500px'
          margin='auto'
          marginTop='100px'
          src='/PageNotFound.png'
          alt='Não encontrado'
          borderRadius="md"
          shadow="sm"
          borderWidth="1px"
          align='center'
        />
      </Box>
    </Flex >
  )
}

