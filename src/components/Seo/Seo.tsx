import * as React from 'react';

interface IPageTitleProps {
    title: string;
}

const PageTitle: React.FunctionComponent<IPageTitleProps> = ({ title }: IPageTitleProps) => {
    return (<>
        <title>{title}</title>
        <link rel='icon' href="./ht.png" />
    </>)
};

export default PageTitle;
