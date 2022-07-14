import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getCarouselPicData } from '../utils/utils'
import React, { useState, useEffect, useCallback } from 'react'
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'


export async function getStaticProps() {
  const carouselPicData = await getCarouselPicData();
  let picSrc = [];
  carouselPicData.forEach(obj => {
    //console.log(obj.source)
    picSrc.push(obj.source)
  });



  return {
    props: {
      picSrc,
    }, 
  };
}


export default function Home({ picSrc }) {
//let gridimgs = picSrc.map(((path) => '/images/product_images/' + path))
//console.log(gridimgs)

const sleep = (delay) => new Promise ((resolve) => setTimeout(resolve, delay));
const [image, setImage] = useState(`/images/product_images/${picSrc[0]}`);
const [imgLeft, setImgLeft] = useState(`/images/product_images/${picSrc[(picSrc.length - 1)]}`)
const [imgRight, setImgRight] = useState(`/images/product_images/${picSrc[1]}`)
const [imgClass, setImgClass] = useState(styles.image);
const [imgLeftClass, setImgLeftClass] = useState(styles.image);
const [imgRightClass, setImgRightClass] = useState(styles.image);
const [btnUnclickable, setBtnUnclickable] = useState(null);

const useMediaQuery = () => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: 768px)`);
    media.addListener(updateTarget);
    
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  }, []);

  return targetReached;
}

function triggerLeftSlide() {
  setImgClass(styles.imageslidefromright);
  setImgLeftClass(styles.imageslidefromright);
  setImgRightClass(styles.imageslidefromright);
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


  return (useMediaQuery() ? (<div>
    <Head>
      <title>DEMO SITE</title>
      <meta name="description" content="not done don't look aaaaa" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar bg="light" expand="lg" fixed="top">
    <Container>
    <Navbar.Brand href="/">Ash Embroidery</Navbar.Brand>
    <Navbar.Toggle className={styles.navlinks} aria-controls="basic-navbar-nav" />
    <Navbar.Collapse className={styles.navlinks} id="basic-navbar-nav">
      <Nav className={styles.navlinks}>
        <Nav.Link href="/about">About</Nav.Link>
        <Nav.Link href="/contact">Contact</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
    <div className={styles.container}>
    <main className={styles.main}>
      <div className={styles.imageholder}>
        <ul className={styles.list}>
        {picSrc.map(((path) => 
        <li className={styles.listItem} key={picSrc.indexOf(path)}>
          <Image 
          height="350"
          width="350"
          src= {'/images/product_images/' + path}
          />
        </li>
        ))}
        </ul>
      </div>
    </main>
    </div>
  </div>     
  ) : (
    <div>
      <Head>
        <title>Ash Embroidery</title>
        <meta name="description" content="Ashley Lewis - Embroidery Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar bg="light" expand="lg" fixed="top">
      <Container>
      <Navbar.Brand href="/">Ash Embroidery</Navbar.Brand>
      <Navbar.Toggle className={styles.navlinks} aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className={styles.navlinks} id="basic-navbar-nav">
        <Nav className={styles.navlinks}>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          <Nav.Link href="/gallery">Gallery</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
      <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.imageholder}>
                  <Image
                    id="imgLeft"
                    src={imgLeft}
                    className={imgLeftClass}
                    alt='left product'
                    width='350'
                    height='350'
                  />
                  <div></div>                
                  <Image
                  id="image"        
                  src={image} 
                  className={imgClass}                
                  alt='central product' 
                  width='350'   
                  height='350'
                  />
                  <div></div>   
                  <Image
                    id="imgRight"                  
                    src={imgRight}
                    className={imgRightClass}
                    alt='right product'
                    width='350'
                    height='350'
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
  )
}
