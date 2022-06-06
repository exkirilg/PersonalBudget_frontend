import React from "react";

import { Page } from "./Page";

import { BudgetOperationsTable } from "../Components/BudgetOperationsTable";
import { getBudgetOperations } from "../Components/BudgetOperationsData";

export const HomePage = () => (
    <Page>
        <div className="mt-3">
            <BudgetOperationsTable data={getBudgetOperations()} />
        </div>
    </Page>
);
