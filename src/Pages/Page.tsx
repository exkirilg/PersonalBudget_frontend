import React from "react";

import Container from "react-bootstrap/Container";

interface Props {
    title?: string,
    children: React.ReactNode
}

export const Page = ({ title, children }: Props) => (

    <Container>
        {title &&
            <h3 className="text-justify font-weight-bold text-uppercase mt-3">{title}</h3>}
        {children}
    </Container>
);
