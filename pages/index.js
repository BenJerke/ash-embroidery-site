import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getCarouselPicData } from '../utils/utils'
import React, { useState, useEffect } from 'react'



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
const [imgClass, setImgClass] = useState(null);
const [btnUnclickable, setBtnUnclickable] = useState(null);

function triggerLeftSlide() {
  setImgClass(styles.imageslidefromright);
}

function triggerRightSlide() {
  setImgClass(styles.imageslidefromleft);
}

function resetAnimationClass() {
  setImgClass(styles.image);
}

async function changePicRight() {  
  let oldPath = image.replace("/images/product_images/", "")
  let x = picSrc.indexOf(oldPath);  
  let y = (picSrc.length - 1) ;
  if (x < y) {
    x += 1;
  } else if (x == y){
    x = 0;
  }

  setImage(`/images/product_images/${picSrc[x]}`);
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
  if (x > 0) {
    x -= 1;
  } else {
    x = y;
  }

  setImage(`/images/product_images/${picSrc[x]}`);
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
      <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Main Title
        </h1>
        <h3>
          Subtitle
        </h3>
        <div>
              <div>
                <div>
                  <button id="left" className={styles.button} disabled={btnUnclickable} onClick={changePicLeft}> 👈 </button>  

                  <Image
                  id="image"        
                  src={image} 
                  className={imgClass}                
                  alt='product' 
                  width='400'   
                  height='400'
                  />
                  <button id="right" className={styles.button} onClick={changePicRight} disabled={btnUnclickable}> 👉 </button> 
                </div>
              </div>
        </div>
      </main>
      </div>
    </div>       
  )

  

}