import { Link } from 'gatsby';
import * as React from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { FaYoutube, FaLinkedin, FaGithub } from 'react-icons/fa';

export interface INavBarProps {
}

export function NavBar(props: INavBarProps) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <Image src="/logo.png" height='30' className="d-inline-block align-top" />{' '}
                    Hein Taljaard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about-me">About Me</Nav.Link>
                        <Nav.Link as={Link} to="/blog">Blogs</Nav.Link>
                        <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <FaYoutube size={20} className="icon" />
                        </Nav.Link>
                        <Nav.Link href="https://www.linkedin.com/in/hein-taljaard-4386a514" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={20} className="icon" />
                        </Nav.Link>
                        <Nav.Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                            <FaGithub size={20} className="icon" />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
