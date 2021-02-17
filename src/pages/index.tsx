import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Banner from '../../components/Banner'
import styled, { createGlobalStyle } from 'styled-components';

import { Box, Flex } from "@chakra-ui/react"

const GlobalStyle = createGlobalStyle`
 h1 {
   font-size: 4rem;
 }
`;
const Container = styled.div`
  text-align: left;
  display: flex
`;

const Home: React.FC = () => {
  return (
    <Box h="100%" w="100%" p={4} color="white" backgroundImage="url('/backgroundBlueSkyline.png')"   backgroundRepeat="no-repeat">
      <div>
        <Head>
          <title>Leilao - Web</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
          <main>
            <Flex w="100%" h="50%">
            <a
              href="/contato"
              target="_self"
            >
              <Image
                src="/contato.png"
                alt="Contato"
                width={'700%'}
                height={'64%'}
                />
              </a>
              <div>
              <Image
                src="/atendimento.png"
                alt="Atendimento"
                width={'860%'}
                height={'64%'}
                />
                </div>
            </Flex>
            <Container>
              <Image
                src="/companyLogo.png"
                alt="Logo"
                width={400}
                height={120}
              />
              <ButtonGroup variant="text" color="default" aria-label="text primary button group">
                <Button href='/'>Inicio</Button>
                <Button>Sobre nós</Button>
                <Button href='/ConsultarCadastro'>Cadastre-se</Button>
                <Button href='/login'>Login</Button>
                <Button>Contato</Button>
              </ButtonGroup>
            </Container>
            <Image
              src="/proximoLeilao.png"
              alt="Contato"
              width={1600}
              height={120}
            />
            <Image
              src="/promo.png"
              alt="Promoção"
              width={1600}
              height={50}
            />
            <Banner/>
        </main>

        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" />
          </a>
        </footer>
        </div>
    </Box>
  )
}

export default Home
