import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect, useCallback } from 'react'
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'


export default function About() {
  return (
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
        <p>
            This is where the bio goes.
        </p>       
      </main>
      </div>   
      </div>
  )
}
