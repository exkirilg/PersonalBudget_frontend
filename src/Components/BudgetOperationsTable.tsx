import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, } from "../State/Store";
import { gettingBudgetOperationsAction, gotBudgetOperationsAction } from "../State/BudgetOperationsState";

import { useForm } from "react-hook-form";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { BudgetOperation } from "../Interfaces/BudgetOperation";
import { getBudgetOperations } from "../Data/BudgetOperationsData";

import { getCurrentMonthBeginning, getCurrentMonthEnd, getDateAsString, getDateBeginning, getDateEnd} from "../Services/DateTimeServices";

import { FilterIcon } from "./Images";

type FilterSettingsFormData = {
    dateFrom: Date,
    dateTo: Date,
    search: string;
}

export const BudgetOperationsTable = () => {

    const dispatch = useDispatch();
    
    const initialDateFrom = getCurrentMonthBeginning();
    const initialDateTo = getCurrentMonthEnd();

    const operations = useSelector((state: AppState) => state.budgetOperations.operations);
    const operationsLoading = useSelector((state: AppState) => state.budgetOperations.loading);

    const doGetBudgetOperations = async (dateFrom: Date, dateTo: Date, search: string = '') => {
        dispatch(gettingBudgetOperationsAction());
        const budgetOperations = await getBudgetOperations(getDateBeginning(dateFrom), getDateEnd(dateTo), search);
        dispatch(gotBudgetOperationsAction(budgetOperations));
    };

    React.useEffect(() => {
        doGetBudgetOperations(initialDateFrom, initialDateTo);
    }, []);

    const { register, handleSubmit } = useForm<FilterSettingsFormData>();
    const submitFilterSettings = ({dateFrom, dateTo, search}: FilterSettingsFormData) => {
        doGetBudgetOperations(getDateBeginning(dateFrom), getDateEnd(dateTo), search);
    }

    return (
        <Container>
    
            <Form onSubmit={handleSubmit(submitFilterSettings)}>
                <Stack direction="horizontal" className="mt-2 mb-2" gap={2}>
                    <Form.Text>From</Form.Text>
                    <Form.Control {...register("dateFrom", { required: true, valueAsDate: true })}
                        type="date" defaultValue={getDateAsString(initialDateFrom)} />
        
                    <Form.Text>to</Form.Text>
                    <Form.Control {...register("dateTo", { required: true, valueAsDate: true })}
                        type="date" defaultValue={getDateAsString(initialDateTo)} />
        
                    <Form.Control {...register("search")} type="text" placeholder="Search..." defaultValue={''} />

                    <Button variant="outline-secondary" type="submit">
                        <FilterIcon />
                    </Button>
                </Stack>
            </Form>
    
            {operationsLoading ? (<div className="spinner-border m-5" role="status"></div>) : (
                <Table bordered hover>
                    <thead className="thead-dark">
                        <tr>
                            <th>Date</th>
                            <th>Item</th>
                            <th className="col-2">Sum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {operations.map((operation) => (
                            budgetOperationsTableRow(operation)
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="fs-5 fw-bold text-end" colSpan={3}>
                                {budgetOperationsTableResult(getBudgetOperationsResult(operations))}
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            )}

        </Container>
    );
}

const budgetOperationsTableRow = (operation : BudgetOperation) => {
    let bgClass = operation.type === 0 ? "table-success" : "table-danger";
    return (
        <tr key={operation.id} className={bgClass}>
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
            {Math.abs(result).toFixed(2)}
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
