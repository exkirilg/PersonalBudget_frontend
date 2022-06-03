import React from "react";
import { BudgetOperation } from "../Interfaces/BudgetOperation";

interface Props {
    operation: BudgetOperation
}

export const BudgetOperationTableRow = ({ operation }: Props) => {

    let bgClass = operation.type === 0 ? "table-success" : "table-danger";

    return (
        <tr className={bgClass}>
            <td>{operation.date.toLocaleString()}</td>
            <td>{operation.item.name}</td>
            <td>{operation.sum}</td>
        </tr>
    );
}
