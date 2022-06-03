import React from "react";
import { Logo } from "./Images";
import { UserIcon } from "./Images";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

export const Header = () => (
    <Navbar bg="light" className="border-bottom">
        <Container>
            <Navbar.Brand href="/">
                <Logo />
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Stack direction="horizontal" gap={2}>
                    <Button variant="btn btn-outline-primary ms-2">Sign up</Button>
                    <Button variant="btn btn-outline-primary ms-2">Sign in</Button>

                    <Navbar.Text>
                        <UserIcon />
                        Hi, <a href="/usersettings">Username</a>
                    </Navbar.Text>
                    <Button variant="btn btn-outline-danger ms-2">Sign out</Button>
                </Stack>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);
