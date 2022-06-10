import React from "react";

import { Page } from "./Page";

import { BudgetOperationsTable } from "../Components/BudgetOperations/BudgetOperationsTable";

export const HomePage = () => (
    <Page>
        <div className="mt-3">
            <BudgetOperationsTable />
        </div>
    </Page>
);
