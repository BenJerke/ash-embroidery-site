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
      <Navbar expand="lg" fixed="top">
      <Container>
      <Navbar.Brand href="/">Ash Embroidery</Navbar.Brand>
      <Navbar.Toggle className={styles.navlinks} aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className={styles.navlinks} id="basic-navbar-nav">
        <Nav className={styles.navlinks}>
          <Nav.Link href="https://www.instagram.com/ash_lewie/">Instagram</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
      <div className={styles.container}>
      <main className={styles.main}> 
        <h3>
          Bio
        </h3>
        <p>
        I’m Ash! I’m PhD student currently residing in Columbus, Ohio. I do embroidery as a small side hustle and a hobby, so my ability to take on commissions can be fairly limited but I take as many as I think I can. Besides embroidery, I love listening to podcasts, reading, hanging with my cat Fiona, tending to my large plant collection, and hanging with my excellent friends and partner.
        </p>
        <br></br>
        <h3>
        Services
        </h3>
        <p>
I do both Blundstone/boots and hoop (wall art) commissions. I can also embroider other things (clothes, etc) so if you have something in mind, just reach out and we can discuss. Prices depend very much on design and the amount of time it will take me to complete it. 
When I embroider boots, I typically do the two outer panels and the cost is between $50 and $100 total. You must provide the boots and pay any shipping costs. 
The timeline can vary a fair bit. I’m in graduate school and sometimes my school schedule is hard to predict. School always comes first, but I will communicate as much as I can about the timeline. If you have some kind of time constraint please let me know that early on and we’ll see how we can work around it. 
Currently I have a backlog of commissions but can add to the waitlist. I’m estimating being able to get to a new commission about one or two months from being contacted.
If you have a design in mind you are welcome to send it to me. If you want me to come up with a design, we can work together to figure out something that works for you! 
        </p>
      </main>
      </div>   
      </div>
  )
}
