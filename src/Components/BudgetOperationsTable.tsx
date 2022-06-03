import { Console } from "console";
import React from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";

import { BudgetOperation } from "../Interfaces/BudgetOperation";

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
                    budgetOperationsTableRow(operation)
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td className="fs-5 fw-bold text-end" colSpan={3}>
                        {budgetOperationsTableResult(getBudgetOperationsResult(data))}
                    </td>
                </tr>
            </tfoot>
        </Table>

    </Container>
);

const budgetOperationsTableRow = (operation : BudgetOperation) => {
    let bgClass = operation.type === 0 ? "table-success" : "table-danger";
    return (
        <tr className={bgClass}>
            <td>{operation.date.toLocaleString()}</td>
            <td>{operation.item.name}</td>
            <td>{operation.sum}</td>
        </tr>
    );
}

const budgetOperationsTableResult = (result: number) => {
    let fontClass = result >= 0 ? "text-success" : "text-danger";
    return (
        <span className={fontClass}>
            {result.toFixed(2)}
        </span>
    );
}

function getBudgetOperationsResult(data : BudgetOperation[]) : number {
    return getBudgetOperationsSum(data, 0) - getBudgetOperationsSum(data, 1);
}

function getBudgetOperationsSum (data : BudgetOperation[], type : number) : number {
    let result = data.reduce((a, b) => {
        a += (b.type === type ? b.sum : 0);
        return a;
    }, 0);
    return result;
}
