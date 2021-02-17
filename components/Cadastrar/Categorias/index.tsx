import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Button,
  ButtonGroup,
  Center,
} from "@chakra-ui/react"

export default function index() {
  return (
    <Center
      //GLASSMORPHISM
      bg={"rgba( 255, 255, 255, 0.25 )"}
      boxShadow={"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"}
      backdrop-filter={"{blur( 4px )"}
      webkit-backdrop-filter={"blur( 4px )"}
      border-radius={"10px"}

      margin='30px'
      padding='15px'
    >
      <Grid
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(4, 1fr)'
        gap={3}
        w='80%'
        h='80%'
        justifyContent='center'
        alignContent='center'
        margin='40px'
        padding="30px"
      >
        <GridItem>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input id="nomeBanner" placeholder="Nome do Banner"/>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Categorias</FormLabel>
            <Input id="categorias" placeholder="Categorias"/>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Cor</FormLabel>
            <Input id="cor" placeholder="Cor"/>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Icone</FormLabel>
            <Input id="icone" placeholder="Icone"/>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <ButtonGroup variant="outline" spacing="6">
              <Button size="lg" colorScheme="blue">Gravar</Button>
              <Button size="lg"> Cancel</Button>
            </ButtonGroup>
          </FormControl>
        </GridItem>
      </Grid>
    </Center>
  )
}
