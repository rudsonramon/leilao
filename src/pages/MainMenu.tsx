import React from 'react'
import Cookies from 'universal-cookie';
import Drawer from '../../components/Drawer'
import PageNotFound from '../../src/pages/PageNotFound'
import {Box} from "@chakra-ui/react"

const cookies = new Cookies();

export default function MainMenu() {
  return (
    <Box backgroundImage=''>
      {
        cookies.get('auth') ? <Drawer open={true} /> : <PageNotFound/>
        //<Drawer open={true}/>
      }

    </Box>
  )
}

