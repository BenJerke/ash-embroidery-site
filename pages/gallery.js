import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Ashnav from '../components/ashnav'
import { getCarouselPicData } from '../utils/utils'
import React, { useState, useEffect, useCallback } from 'react'
import { Button, Navbar, Container, Nav, NavDropdown, Row, Col } from 'react-bootstrap'

export async function getStaticProps() {
  const carouselPicData = await getCarouselPicData();
  let picSrc1 = [];
  let picSrc2 = [];
  let picSrc3 = [];
  carouselPicData.forEach(obj => {
    //console.log(obj.source)
    if (carouselPicData.indexOf(obj) % 3 == 0){
      picSrc1.push(obj.source);
    } else if(carouselPicData.indexOf(obj) % 2 == 0) {
      picSrc2.push(obj.source)
    } else { 
      picSrc3.push(obj.source)
    }  
    
  });
  return {
    props: {
      picSrc1,
      picSrc2,
      picSrc3
    }, 
  };s
}


export default function Gallery({ picSrc1, picSrc2, picSrc3 }) {
  return (
    <div>
      <Ashnav></Ashnav>
      <Container fluid>
      <main className={styles.main}>
        <Row>
          <Col>
                <ul className={styles.list}>
                {picSrc1.map(((path) => 
                <li className={styles.listItem} key={picSrc1.indexOf(path)}>
                  <Image 
                  height="350"
                  width="350"
                  src= {'/images/product_images/' + path}
                  />
                </li>
                ))}
                </ul>          
          </Col>
          <Col>                <ul className={styles.list}>
                {picSrc2.map(((path) => 
                <li className={styles.listItem} key={picSrc2.indexOf(path)}>
                  <Image 
                  height="350"
                  width="350"
                  src= {'/images/product_images/' + path}
                  />
                </li>
                ))}
                </ul>  
          </Col>
          <Col>                <ul className={styles.list}>
                {picSrc3.map(((path) => 
                <li className={styles.listItem} key={picSrc3.indexOf(path)}>
                  <Image 
                  height="350"
                  width="350"
                  src= {'/images/product_images/' + path}
                  />
                </li>
                ))}
                </ul>  </Col>
        </Row>
        </main>
      </Container>
    </div>     
  )
}