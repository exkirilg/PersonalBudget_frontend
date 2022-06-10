import React from "react";
import { useParams } from "react-router-dom";
import { BudgetOperationEdit } from "../Components/BudgetOperations/BudgetOperationEdit";

import { Page } from "./Page";

export const BudgetOperationPage = () => {
    
    const { operationId } = useParams();

    return (
        <Page>
            {operationId !== null && (
                <>
                    <BudgetOperationEdit operationId={Number(operationId)} />
                </>
            )}
        </Page>
    );
}
