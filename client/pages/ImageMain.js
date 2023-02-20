import React from 'react'
import foto from "../images/16kamen.jpeg"
import Image from 'next/image'

const ImageMain = () => (
  <Image src={foto} style={{marginTop: 10}} alt="foto main" />
)

export default ImageMain