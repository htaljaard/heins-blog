import * as React from 'react';
import { Container, Navbar } from 'react-bootstrap';

export interface ISiteFooterProps {
}

export function SiteFooter(props: ISiteFooterProps) {
    return (
        <Navbar sticky='bottom'>
            <Container fluid>

            </Container>
        </Navbar>
    );
}
