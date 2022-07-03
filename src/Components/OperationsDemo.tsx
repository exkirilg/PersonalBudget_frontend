import React from "react";
import { AppState } from "../State/Store";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
    setFilterAction,
    gettingOperationsAction,
    cancelGettingOperationsAction,
    gotOperationsAction,
    searchingOperationsAction,
    searchedOperationsAction,
    setPageAction
} from "../State/OperationsState";
import { Link } from "react-router-dom";

import { Operation } from "../Models/Operation";
import { OperationType } from "../Models/OperationType";
import { OperationsFilterSettings } from "../Models/OperationsFilterSettings";
import { getOperationsDemo } from "../Data/OperationsData";
import {
    getDateAsString,
    getDateBeginning,
    getDateEnd,
    getDateTimePresentation
} from "../Services/DateTimeServices";

import { Chart } from "./OperationsChart";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";

import { FilterIcon } from "./Images";

export const OperationsDemo = () => {

    const dispatch = useDispatch();

    const loading = useSelector((state: AppState) => state.operations.loading);
    const filter = useSelector((state: AppState) => state.operations.filter);
    const operations = useSelector((state: AppState) => state.operations.operations);
    const numberOfPages = useSelector((state: AppState) => state.operations.numberOfPages);
    const currentPage = useSelector((state: AppState) => state.operations.currentPage);
    const currentOperations = useSelector((state: AppState) => state.operations.currentOperations);
    const currentSearch = useSelector((state: AppState) => state.operations.search);
    const message = useSelector((state: AppState) => state.operations.operationsMessage);

    //#region Handlers

    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            dispatch(setPageAction(page));
        }
    }

    //#endregion

    //#region Forms

    const { register, handleSubmit } = useForm({
        defaultValues: {
            dateFrom: getDateAsString(filter.dateFrom),
            dateTo: getDateAsString(filter.dateTo),
            search: filter.search
        }
    });

    const submitFilterSettings = async (data: any) => {

        const filter = new OperationsFilterSettings({
            dateFrom: getDateBeginning(new Date(data.dateFrom)),
            dateTo: getDateEnd(new Date(data.dateTo)),
            search: data.search
        })

        dispatch(setFilterAction(filter));
    }

    //#endregion

    //#region Effects

    // Setting filter at first render
    React.useEffect(() => {
        handleSubmit<any>(submitFilterSettings)().catch(() => {
            dispatch(cancelGettingOperationsAction("Something gone wrong, please try again later"));
        });
    }, []);

    // Fetching operations after filter settings change
    React.useEffect(() => {
        const doGetOperations = async (dateFrom: Date, dateTo: Date) => {
            dispatch(gettingOperationsAction());
            const _operations = await getOperationsDemo(getDateBeginning(dateFrom), getDateEnd(dateTo));
            dispatch(gotOperationsAction(_operations));
            dispatch(setPageAction(1));
        };

        doGetOperations(filter.dateFrom, filter.dateTo).catch(() => {
            dispatch(cancelGettingOperationsAction("Something gone wrong, please try again later"));
        });
    }, [dispatch, filter.dateFrom.toISOString(), filter.dateTo.toISOString()]);

    // Filtering operations by filter settings search value
    React.useEffect(() => {
        const doSearch = async (search: string) => {
            dispatch(searchingOperationsAction(search));
            const searched = operations.filter(
                operation => search === "" || operation.item!.name.toLowerCase().indexOf(search.toLowerCase()) >= 0);
            dispatch(searchedOperationsAction(searched));
            dispatch(setPageAction(1));
        };

        if (filter.search !== currentSearch) {
            doSearch(filter.search);
        }
    }, [dispatch, operations, filter.search]);

    //#endregion

    const filterForm = () => {
        return (
            <Form onSubmit={handleSubmit(submitFilterSettings)}>
                <Stack direction="horizontal" gap={2}>
                    <Form.Text>From</Form.Text>
                    <Form.Control type="date" {...register("dateFrom", { required: true })} />
        
                    <Form.Text>to</Form.Text>
                    <Form.Control type="date" {...register("dateTo", { required: true })} />
        
                    <Form.Control type="text" {...register("search")} placeholder="Search..." />

                    <OverlayTrigger placement="top" overlay={
                        <Tooltip>
                            Set filter
                        </Tooltip>
                    }>
                        <Button variant="outline-secondary" type="submit">
                            <FilterIcon />
                        </Button>
                    </OverlayTrigger>

                </Stack>
            </Form>
        );
    }
    const operationsTable = () => {
        return (
            <Container>
                {
                    currentOperations.length > 0 && 
                    <Table bordered hover>
                        <thead className="thead-dark">
                            <tr>
                                <th className="col-4">Date</th>
                                <th className="col-5">Item</th>
                                <th className="col-2">Sum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOperations.map((operation) => (
                                operationsTableRow(operation)
                            ))}
                        </tbody>
                    </Table>
                }
            </Container>
        );
    }
    const operationsTableRow = (operation : Operation) => {
        let bgClass = operation.type === OperationType.Income ? "table-success" : "table-danger";
        
        return (
            <tr key={operation.id} className={bgClass}>
                <td className="text-start align-middle">
                    {getDateTimePresentation(operation.date)}
                </td>
                <td className="text-start align-middle">{operation.item!.name}</td>
                <td className="text-end align-middle">{operation.sum.toFixed(2)}</td>
            </tr>
        );
    }
    const operationsTablePagination = () => {
        
        const getPaginationItems = () => {
            let items = [];
            for (let i = 1; i <= numberOfPages; i++) {
                items.push(
                    <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
                        {i}
                    </Pagination.Item>,
                );
            }
            return items;
        }
        
        return (
            <Container className="d-flex justify-content-center">
                <Pagination>
                    {numberOfPages  > 1 && getPaginationItems()}
                </Pagination>
            </Container>
        );
    }
    const welcome = () => {
        return (
            <Container className="mb-3">
                <h4 className="text-center">Welcome to Personal Budget!</h4>
                <p>
                    Information on this page is for demo purposes only.
                    If you want to try app for yourself, please <Link to="/signup">Sign up</Link>.
                    Also you can sign in as Demo user to get more control over this example, just <Link to="/signinDemo">Click here</Link>.
                </p>
            </Container>
        );
    }

    return (
        <Container>

            { welcome() }

            {
                message &&
                <Row className="text-center my-2">
                    <h4 className="text-danger">{message}</h4>
                </Row>
            }

            <Row>
                <Col>
                    {filterForm()}
                </Col>
            </Row>

            {
                loading ?
                (
                    <Row className="d-flex justify-content-center">
                        <div className="spinner-border my-5" role="status" />
                    </Row>
                )
                    :
                (
                    <Row className="mt-3 h-50">
                        <Col className="col-3">
                            <Stack direction="vertical" gap={3}>
                                <Chart type={OperationType.Income} />
                                <Chart type={OperationType.Expense} />
                            </Stack>
                        </Col>
                        <Col className="col-9">
                            { operationsTable() }
                            { operationsTablePagination() }
                        </Col>
                    </Row>
                )
            }

        </Container>
    );
}
