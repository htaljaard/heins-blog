import * as React from 'react';

export interface IPageBannerProps {
    backgroundImage: string;
    headerText: string;
}

export function PageBanner({ backgroundImage, headerText }: IPageBannerProps) {

    return (
        <div
            className='text-center bg-body-tertiary position-relative align-middle'
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '400px'
            }}
        >
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}
            ></div>
            <div className="container position-relative" style={{ marginTop: 'auto', marginBottom: 'auto', height: '50%' }}>
                <h1 className="text-light" style={containerStyle}>
                    {headerText}
                </h1>
            </div>
        </div>
    );
}
const containerStyle: React.CSSProperties = {
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%'
};