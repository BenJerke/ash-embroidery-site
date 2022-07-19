import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getCarouselPicData } from '../utils/utils'
import React, { useState, useEffect, useCallback } from 'react'
import { Button, Navbar, Container, Nav, NavDropdown, Row, Col } from 'react-bootstrap'


export async function getServerSideProps() {
  const carouselPicData = await getCarouselPicData();
  let picSrc = [];
  carouselPicData.forEach(obj => {
    //console.log(obj.source)
    picSrc.push(obj.source);
    
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
const [imgLeft, setImgLeft] = useState(`/images/product_images/${picSrc[0]}`)
const [image, setImage] = useState(`/images/product_images/${picSrc[1]}`);
const [imgRight, setImgRight] = useState(`/images/product_images/${picSrc[2]}`)
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
  //console.log("right")
  let oldPathLeft = imgLeft.replace("/images/product_images/", "")
  let oldPathCenter = image.replace("/images/product_images/", "")
  let oldPathRight = imgRight.replace("/images/product_images/", "")
  let a = picSrc.indexOf(oldPathLeft);
  let x = picSrc.indexOf(oldPathCenter);  
  let b = picSrc.indexOf(oldPathRight);
  let y = (picSrc.length - 1);
  //assuming at least three images at all times, or else it's bad.
  //left becomes next image in line
  //center becomes what was in the left slot
  //right becomes what was in the center slot
  if (a - 1 >= 0) {
    //console.log("greater than or zero, a=" + a + "x= " + x+ ", b=" + b )
    b = x;
    x = a;
    a = a - 1;

  } else if (a - 1 == -1) {
    //console.log("negative one, a=" + a + "x= " + x+ ", b=" + b )
    b = x; 
    x = a;
    a = y; 
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
  //console.log("left")
  let oldPathLeft = imgLeft.replace(("/images/product_images/", ""))
  let oldPathCenter = image.replace("/images/product_images/", "")
  let oldPathRight = imgRight.replace("/images/product_images/", "")
  let a = picSrc.indexOf(oldPathLeft);
  let x = picSrc.indexOf(oldPathCenter);  
  let b = picSrc.indexOf(oldPathRight);
  let y = (picSrc.length - 1);

  //left becomes what was in the center slot
  //center becomes what was in the right slot
  //right becomes next in line 
  if (b + 1 <= y) {
    a = x; 
    x = b; 
    b = b + 1;
  } else if (b + 1 == y + 1) {
    a = x;
    x = b;
    b = 0;
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
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
      <div className={styles.container}>
      <main className={styles.main}>
      <Container fluid>
        <Row>
                <Col>
                  <Image
                    id="imgLeft"
                    src={imgLeft}
                    className={imgLeftClass}
                    alt='left product'
                    width='350'
                    height='350'
                  />    
                  </Col> 
                  <Col> 
                  <Image
                  id="image"        
                  src={image} 
                  className={imgClass}                
                  alt='central product' 
                  width='350'   
                  height='350'
                  /> 
                  </Col>
                  <Col>   
                  <Image
                    id="imgRight"                  
                    src={imgRight}
                    className={imgRightClass}
                    alt='right product'
                    width='350'
                    height='350'
                  />
                  </Col>  
            </Row>
          </Container>
            <div className={styles.container}>
              <Button id="left" className={styles.button} disabled={btnUnclickable} onClick={changePicLeft}> &lt; </Button>  
              <Button id="right" className={styles.button} onClick={changePicRight} disabled={btnUnclickable}> &gt; </Button> 
        </div>
      </main>
      </div>
    </div>       
    )
  )
}
