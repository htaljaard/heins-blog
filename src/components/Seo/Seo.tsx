import * as React from 'react';

interface IPageTitleProps {
    title: string;
}

const PageTitle: React.FunctionComponent<IPageTitleProps> = ({ title }: IPageTitleProps) => {
    return (<title>{title}</title>)
};

export default PageTitle;
