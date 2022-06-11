import React from "react";

import { Page } from "./Page";

import { OperationsTable } from "../Components/Operations/OperationsTable";

export const HomePage = () => (
    <Page>
        <div className="mt-3">
            <OperationsTable />
        </div>
    </Page>
);
