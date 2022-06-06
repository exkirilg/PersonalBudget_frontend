import React from "react";

import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";

export const Footer = () => (
    <footer className="bg-light mt-auto border-top">
        <Container>
            <div className="d-flex justify-content-between py-2 my-4">
                <p className="ms-5">© 2022 Personal Budget, Inc. All rights reserved.</p>
                <ul className="list-unstyled d-flex me-5">
                    <li className="ms-3">
                        <Link to="/contacts" className="link-dark">
                            Contacts
                        </Link>
                    </li>
                </ul>
            </div>
        </Container>
    </footer>
);
