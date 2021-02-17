/* eslint-disable no-empty-pattern */
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const index: React.FC = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}>
      <div >
        <img alt="Patio Central Copart SP" src="/banner1.jpg" />
        <p className="legend">Banner 1 - descrição</p>
      </div>
      <div >
        <img alt="Patio Central Copart SP" src="/banner1.jpg" />
        <p className="legend">Banner 1 - descrição</p>
      </div>
    </Carousel>
  )
}

export default index
