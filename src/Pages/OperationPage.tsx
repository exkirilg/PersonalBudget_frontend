import React from "react";
import { useParams } from "react-router-dom";
import { OperationEdit } from "../Components/Operations/OperationEdit";

import { Page } from "./Page";

export const OperationPage = () => {
    
    const { operationId } = useParams();

    return (
        <Page>
            {operationId !== null && (
                <>
                    <OperationEdit operationId={Number(operationId)} />
                </>
            )}
        </Page>
    );
}
