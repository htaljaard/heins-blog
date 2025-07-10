import * as React from 'react';
import { Container, Navbar } from 'react-bootstrap';

export interface ISiteFooterProps {
}

export function SiteFooter(props: ISiteFooterProps) {
    return (
        <Navbar sticky='bottom'>
            <Container fluid>
                <p>Connect with me on:
                    <a href="https://www.youtube.com">YouTube</a> |
                    <a href="https://www.linkedin.com/in/hein-taljaard-4386a514">LinkedIn</a> |
                    <a href="https://github.com">GitHub</a>
                </p>
            </Container>
        </Navbar>
    );
}
