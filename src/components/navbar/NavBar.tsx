import { Link } from 'gatsby';
import * as React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export interface INavBarProps {
}

export function NavBar(props: INavBarProps) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">Hein Taljaard</Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
                    </Nav>
                </Navbar.Collapse> */}
            </Container>
        </Navbar>
    );
}
