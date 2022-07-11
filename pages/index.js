import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getCarouselPicData } from '../utils/utils'
import React, { useState } from 'react'
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'


export async function getStaticProps() {
  const carouselPicData = await getCarouselPicData();
  let picSrc = [];
  carouselPicData.forEach(obj => {
    //console.log(obj.source)
    picSrc.push(obj.source)
  });
  //console.log(picSrc)
  return {
    props: {
      picSrc,
    }, 
  };
}



export default function Home({ picSrc }) {

const sleep = (delay) => new Promise ((resolve) => setTimeout(resolve, delay));

const [image, setImage] = useState(`/images/product_images/${picSrc[0]}`);
const [imgLeft, setImgLeft] = useState(`/images/product_images/${picSrc[(picSrc.length - 1)]}`)
const [imgRight, setImgRight] = useState(`/images/product_images/${picSrc[1]}`)
const [imgClass, setImgClass] = useState(styles.image);
const [imgLeftClass, setImgLeftClass] = useState(styles.image);
const [imgRightClass, setImgRightClass] = useState(styles.image);
const [btnUnclickable, setBtnUnclickable] = useState(null);

function triggerLeftSlide() {
  setImgClass(styles.imageslidefromright);
  setImgLeftClass(styles.imageslidefromright);
  setImgRightClass(styles.imageslidefromright)
}

function triggerRightSlide() {
  setImgClass(styles.imageslidefromleft);
  setImgLeftClass(styles.imageslidefromleft);
  setImgRightClass(styles.imageslidefromleft);
}

function resetAnimationClass() {
  setImgClass(styles.image);
  setImgLeftClass(styles.image);
  setImgRightClass(styles.image);
}

async function changePicRight() {
  let oldPath = image.replace("/images/product_images/", "")
  let x = picSrc.indexOf(oldPath);  
  let y = (picSrc.length - 1);
  let a = 0;
  let b = 0;
  if (x < y) {
    x += 1;
    a = x - 1;
    b = x + 1;
  } else if (x == y){
    x = 0;
    a = y;
    b = x + 1;
  }

  

  setImage(`/images/product_images/${picSrc[x]}`);
  setImgLeft(`/images/product_images/${picSrc[a]}`);
  setImgRight(`/images/product_images/${picSrc[b]}`);
  triggerLeftSlide();
  setBtnUnclickable(true);
  await sleep(1100);
  resetAnimationClass();
  setBtnUnclickable(false);
}

async function changePicLeft() {
  let oldPath = image.replace("/images/product_images/", "")
  let x = picSrc.indexOf(oldPath);
  let y = (picSrc.length - 1);
  let a = 0;
  let b = 0;
  if (x > 0 && x != y) {
    b = x + 1
    a = x; 
    x -= 1;
    
    
    
  } else {
    x = y;
  }

  setImage(`/images/product_images/${picSrc[x]}`);
  setImgLeft(`/images/product_images/${picSrc[a]}`);
  setImgRight(`/images/product_images/${picSrc[b]}`);
  triggerRightSlide();
  setBtnUnclickable(true);
  await sleep(1100);
  resetAnimationClass();
  setBtnUnclickable(false);
}


  return (
    <div>
      <Head>
        <title>DEMO SITE</title>
        <meta name="description" content="not done don't look aaaaa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar bg="light" expand="lg">
      <Container>
      <Navbar.Brand href="/">Ash Stitches</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav >
          <Nav.Link className="justify-content-end" href="/about">About</Nav.Link>
          <Nav.Link className="justify-content-end" href="/contact">Contact</Nav.Link>
          <Nav.Link className="justify-content-end" href="/gallery">Gallery</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
      <div className={styles.container}>
      <main className={styles.main}>
                <div>
                  <Image
                    id="imgLeft"
                    src={imgLeft}
                    className={imgLeftClass}
                    alt='left product'
                    width='400'
                    height='400'
                  />                  

                  <Image
                  id="image"        
                  src={image} 
                  className={imgClass}                
                  alt='central product' 
                  width='400'   
                  height='400'
                  />
                
                  <Image
                    id="imgRight"                    
                    src={imgRight}
                    className={imgRightClass}
                    alt='right product'
                    width='400'
                    height='400'
                  />
                </div>
                <div className={styles.container}>
                <Button id="left" className={styles.button} disabled={btnUnclickable} onClick={changePicLeft}> 👈 </Button>  
                <Button id="right" className={styles.button} onClick={changePicRight} disabled={btnUnclickable}> 👉 </Button> 
                </div>

      </main>
      </div>
    </div>       
  )

  

}