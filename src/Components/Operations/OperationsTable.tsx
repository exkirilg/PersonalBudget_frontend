import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../State/Store";
import { gettingOperationsAction, gotOperationsAction } from "../../State/OperationsState";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { Operation } from "../../Interfaces/Operation";
import { getOperations } from "../../Data/OperationsData";

import { getCurrentMonthBeginning, getCurrentMonthEnd, getDateAsString, getDateBeginning, getDateEnd} from "../../Services/DateTimeServices";

import { FilterIcon, EditIcon } from "../Images";

type FilterSettingsFormData = {
    dateFrom: Date,
    dateTo: Date,
    search: string;
}

export const OperationsTable = () => {

    const dispatch = useDispatch();
    
    const initialDateFrom = getCurrentMonthBeginning();
    const initialDateTo = getCurrentMonthEnd();

    const operations = useSelector((state: AppState) => state.operations.operations);
    const operationsLoading = useSelector((state: AppState) => state.operations.loading);

    const doGetOperations = async (dateFrom: Date, dateTo: Date, search: string = '') => {
        dispatch(gettingOperationsAction());
        const operations = await getOperations(getDateBeginning(dateFrom), getDateEnd(dateTo), search);
        dispatch(gotOperationsAction(operations));
    };

    React.useEffect(() => {
        doGetOperations(initialDateFrom, initialDateTo);
    }, []);

    const { register, handleSubmit } = useForm<FilterSettingsFormData>();
    const submitFilterSettings = ({dateFrom, dateTo, search}: FilterSettingsFormData) => {
        doGetOperations(getDateBeginning(dateFrom), getDateEnd(dateTo), search);
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
                            <th className="col-4">Date</th>
                            <th className="col-5">Item</th>
                            <th className="col-2">Sum</th>
                            <th className="col-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {operations.map((operation) => (
                            operationsTableRow(operation)
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="fs-5 fw-bold text-end" colSpan={4}>
                                {operationsTableResult(getOperationsResult(operations))}
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            )}

        </Container>
    );
}

const operationsTableRow = (operation : Operation) => {
    let bgClass = operation.type === 0 ? "table-success" : "table-danger";
    return (
        <tr key={operation.id} className={bgClass}>
            <td className="text-start align-middle">{operation.date.toLocaleString()}</td>
            <td className="text-start align-middle">{operation.item.name}</td>
            <td className="text-end align-middle">{operation.sum.toFixed(2)}</td>
            <td>
                <Link to={`/operations/${operation.id}`}>
                    <span className="btn btn-outline-secondary ms-2 btn-sm">
                        <EditIcon />
                    </span>
                </Link>
            </td>
        </tr>
    );
}

const operationsTableResult = (result: number) => {
    let fontClass = result >= 0 ? "text-success" : "text-danger";
    return (
        <span className={fontClass}>
            {Math.abs(result).toFixed(2)}
        </span>
    );
}

function getOperationsResult(data : Operation[]) : number {
    return getOperationsSum(data, 0) - getOperationsSum(data, 1);
}

function getOperationsSum (data : Operation[], type : number) : number {
    let result = data.reduce((a, b) => {
        a += (b.type === type ? b.sum : 0);
        return a;
    }, 0);
    return result;
}
