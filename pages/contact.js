import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect, useCallback } from 'react'
import { Button, Navbar, Container, Nav, NavDropdown, Form } from 'react-bootstrap'
import Ashnav from '../components/ashnav'


export default function Contact() {
//let gridimgs = picSrc.map(((path) => '/images/product_images/' + path))
//console.log(gridimgs)

const sleep = (delay) => new Promise ((resolve) => setTimeout(resolve, delay));

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
  return (
    <div>
      <Ashnav></Ashnav>
      <div className={styles.containerbig}>
      <main className={styles.main}> 
      <Form>
      <Form.Group className="mb-3" controlId="emailaddress">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="emailbody">
        <Form.Label>What can I do for you?</Form.Label>
        <Form.Control as="textarea" rows={4} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

      </main>
      </div>   
      </div>
  )
}
