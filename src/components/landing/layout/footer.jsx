import { Col, Row, Typography } from 'antd'
import React from 'react'
import {BsFacebook, BsInstagram, BsTwitter} from 'react-icons/bs'
import { ColorPallete } from '../../../utils/colorPalette'
function FooterLanding() {
  return (
    <div className='w-100 h-100 p-4  mt-5' style={{backgroundColor:ColorPallete.primary}}>
        <Row justify={'center'} align={'middle'} className='gap-4 '>
          <Col><a href="https://web.facebook.com/p/SMP-IT-SMK-IT-MADANI-SUKABUMI-100063496436848/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer"> <BsFacebook size={32} color={`${ColorPallete.light}`} /></a></Col>
          <Col><a href="https://instagram.com/smpitmadanismi?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer"> <BsInstagram size={32} color={`${ColorPallete.light}`} /></a></Col>
          <Col><BsTwitter size={32} color={`${ColorPallete.light}`} /></Col>
        </Row>
        <br />
        <Typography.Paragraph className='text-center text-light' style={{fontSize:16, fontWeight:700}}>Copyright @ SMP IT MADANI 2023</Typography.Paragraph>
    </div>
  )
}

export default FooterLanding