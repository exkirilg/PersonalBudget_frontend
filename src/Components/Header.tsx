import React from "react";
import { AppState } from "../State/Store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signoutAction } from "../State/IdentityState";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { Logo } from "./Images";
import { UserIcon } from "./Images";

export const Header = () => {
    
    const dispatch = useDispatch();
    
    const isAuthenticated = useSelector((state: AppState) => state.identity.isAuthenticated);
    const userName = useSelector((state: AppState) => state.identity.userName);

    const handleSignout = () => {
        dispatch(signoutAction());
    }

    return (
        <Navbar bg="light" className="border-bottom">
            <Container>
                <Navbar.Brand>
                    <Link to="/">
                        <Logo />
                    </Link>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    {
                        isAuthenticated ?
                        (
                            <Stack direction="horizontal" gap={2}>
                                <Navbar.Text>
                                    <UserIcon />
                                    Hi, <span className="link-dark">{userName}</span>!
                                </Navbar.Text>
                                <Button variant="btn btn-outline-danger ms-2" onClick={handleSignout}>Sign out</Button>
                            </Stack>
                        )
                        :
                        (
                            <Stack direction="horizontal" gap={2}>
                                <Link to="/signup">
                                    <span className="btn btn-outline-primary ms-2">Sign up</span>
                                </Link>
                                <Link to="/signin">
                                    <span className="btn btn-outline-primary ms-2">Sign in</span>
                                </Link>
                            </Stack>
                        )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
