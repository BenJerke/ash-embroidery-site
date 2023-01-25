import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React, { useState, useEffect, useCallback } from 'react'
import { Button, Navbar, Container, Nav, NavDropdown, Row, Col } from 'react-bootstrap'

export default function Ashnav() { 
return (
    <div>
    <Head>
    <title>Ash Embroidery</title>
    <meta name="description" content="Ashley Lewis - Embroidery Portfolio" />
    <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar className={styles.navbar} expand="lg" fixed="top">
    <Container className={styles.navbar}>
    <Navbar.Brand href="/">Ash Embroidery</Navbar.Brand>
    <Navbar.Toggle className={styles.navlinks} aria-controls="basic-navbar-nav" />
    <Navbar.Collapse className={styles.navlinks} id="basic-navbar-nav">
    <Nav className={styles.navlinks}>
      <Nav.Link href="/about">About</Nav.Link>
      <Nav.Link href="mailto: embroideryash@gmail.com">Contact</Nav.Link>      
      <Nav.Link href="https://www.instagram.com/ash_embroiders/">Instagram</Nav.Link>
      <Nav.Link href="/gallery">Gallery</Nav.Link>
    </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar> 
    </div>
    )
};