import React from "react";
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";
import { tryRestoreIdentityAction } from "../State/IdentityState";

interface Props {
    title?: string,
    children: React.ReactNode
}

export const Page = ({ title, children }: Props) => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(tryRestoreIdentityAction());
    }, []);

    return (
        <Container>
            {title &&
                <h3 className="text-justify text-center mt-3">{title}</h3>}
            {children}
        </Container>
    );
}
