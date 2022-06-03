import React from "react";

import Container from "react-bootstrap/Container";

import { BudgetOperationsTable } from "../Components/BudgetOperationsTable";
import { getBudgetOperations } from "../Components/BudgetOperationsData";

export const HomePage = () => (
    <Container>
        <BudgetOperationsTable data={getBudgetOperations()} />
    </Container>
);
