import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import { getCarouselPicData } from '../utils/utils'
import React, { useState } from 'react'



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


const [image, setImage] = useState(`/images/product_images/${picSrc[0]}`);


function changePicRight() {
  let oldPath = image.replace("/images/product_images/", "")
  let x = picSrc.indexOf(oldPath);
  
  let y = (picSrc.length - 1) ;
  if (x < y) {
    x += 1;
  } else if (x == y){
    x = 0;
  }
  return setImage(`/images/product_images/${picSrc[x]}`);
}

function changePicLeft() {
  let oldPath = image.replace("/images/product_images/", "")
  let x = picSrc.indexOf(oldPath);
  let y = (picSrc.length - 1);
  if (x > 0) {
    x -= 1;
  } else {
    x = y;
  }
  return setImage(`/images/product_images/${picSrc[x]}`);
}


  return (
    <div>
      <Head>
        <title>DEMO SITE</title>
        <meta name="description" content="not done don't look aaaaa" />
        <meta name="viewport" content="" />
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
                  <button id="left" className={styles.button} onClick={changePicLeft}>👈</button>  

                  <Image        
                  src={image} 
                  alt='product' 
                  width='400'   
                  height='300'
                  />
                  <button id="right" className={styles.button}  onClick={changePicRight}>👉</button> 
                </div>
              </div>
        </div>
      </main>
      </div>
    </div>       
  )

  

}