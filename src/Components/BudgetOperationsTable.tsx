import React from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";

import { BudgetOperation } from "../Interfaces/BudgetOperation";
import { BudgetOperationTableRow } from "./BudgetOperationTableRow";

interface Props {
    data: BudgetOperation[];
}

export const BudgetOperationsTable = ({ data }: Props) => (
    
    <Container>

        <Stack direction="horizontal" className="mt-2 mb-2" gap={2}>
            <Form.Text>From</Form.Text>
            <Form.Control type="datetime-local" />

            <Form.Text>to</Form.Text>
            <Form.Control type="datetime-local" />

            <Form.Control type="text" placeholder="Search..." />
        </Stack>

        <Table bordered hover>
            <thead className="thead-dark">
                <tr>
                    <th>Date</th>
                    <th>Item</th>
                    <th className="col-2">Sum</th>
                </tr>
            </thead>
            <tbody>
                {data.map((operation) => (
                    <BudgetOperationTableRow operation={operation} />
                ))}
            </tbody>
        </Table>

    </Container>
);
