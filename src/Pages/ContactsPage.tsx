import React from "react";
import appsettings from "../appsettings.json";
import { Page } from "./Page";
import ListGroup from 'react-bootstrap/ListGroup';
import { Container } from "react-bootstrap";

export const ContactsPage = () => (
    <Page>
        <Container className="mt-5">
            <p>Hi! Nice to meet you!</p>
            <p>My name is Kirill and I am in search of a job as a C#/.NET developer.</p>
            <p>You can get my CV <a href={appsettings.contacts.cv}>here</a>.</p>
            <p>If by any chance you are interested, please contact me:</p>

            <ListGroup variant="flush">
                <ListGroup.Item>
                    Email: <a href={`mailto:${appsettings.contacts.email}`}>{appsettings.contacts.email}</a>
                </ListGroup.Item>
                <ListGroup.Item>
                    Telegram: <a href={appsettings.contacts.telegram_link}>{appsettings.contacts.telegram_name}</a>
                </ListGroup.Item>
            </ListGroup>
        </Container>
    </Page>
);
