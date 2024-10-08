import { getImage, StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { Container, Image } from 'react-bootstrap';
import PageTitle from '../Seo/Seo';

export interface IBannerProps {
    imageUrl: string;
    pageTitle: string;
}

export default function Banner({ imageUrl, pageTitle }: IBannerProps) {

    return (
        <Container fluid style={{ height: '400px', position: 'relative', padding: 0, backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 2 }}>
                <h1 style={{ color: 'white', textAlign: 'center', marginTop: '150px' }}>{pageTitle}</h1>
            </div>
        </Container>
    );
}
