import React from "react";
import { useSelector } from "react-redux";

import { AppState } from "../State/Store";
import { Page } from "./Page";
import { OperationsTable } from "../Components/OperationsTable";
import { OperationsDemo } from "../Components/OperationsDemo";

export const HomePage = () => {

    const isAuthenticated = useSelector((state: AppState) => state.identity.isAuthenticated);

    return (
        <Page>
            <div className="mt-3">
                {
                    isAuthenticated &&
                    <OperationsTable />
                }
                {
                    isAuthenticated === false &&
                    <OperationsDemo />
                }
            </div>
        </Page>
    );
}
