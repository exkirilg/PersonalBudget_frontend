import React from "react";

import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

import { Logo } from "./Images";
import { UserIcon } from "./Images";

export const Header = () => (
    <Navbar bg="light" className="border-bottom">
        <Container>
            <Navbar.Brand>
                <Link to="/">
                    <Logo />
                </Link>
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Stack direction="horizontal" gap={2}>
                    <Link to="/signup">
                        <span className="btn btn-outline-primary ms-2">Sign up</span>
                    </Link>
                    <Link to="/signin">
                        <span className="btn btn-outline-primary ms-2">Sign in</span>
                    </Link>

                    <Navbar.Text>
                        <UserIcon />
                        Hi, <Link to="/user" className="link-dark">Username</Link>
                    </Navbar.Text>
                    <Button variant="btn btn-outline-danger ms-2">Sign out</Button>
                </Stack>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);
