import React from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { AppState } from "../../State/Store";
import { gettingOperationAction, gotOperationAction } from "../../State/OperationsState";

import { getOperationById } from "../../Data/OperationsData";
import { getDateAsString} from "../../Services/DateTimeServices";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

import { OkIcon, DeleteIcon } from "../Images";

interface Props {
    operationId: number
}

type FormData = {
    id: number,
    type: number,
    date: Date,
    sum: number,
    itemId: number
}

export const OperationEdit = ({operationId}: Props) => {

    const dispatch = useDispatch();
    
    const doGetOperationById = useCallback(async (id: number) => {
        dispatch(gettingOperationAction());
        const operation = await getOperationById(id);
        dispatch(gotOperationAction(operation));
    }, [dispatch]);

    React.useEffect(() => {
        if (operationId) {
            doGetOperationById(Number(operationId));
        }
    }, [operationId, doGetOperationById]);

    const { register, handleSubmit } = useForm<FormData>();

    const submitFormData = ({id, type, date, sum}: FormData) => {
        //console.log(`${id} - ${type} - ${date} - ${sum}`);
    }

    const operation = useSelector((state: AppState) => state.operations.viewing);
    const loading = useSelector((state: AppState) => state.operations.loading);

    return (
        <Container>
            
            {loading ? (<div className="spinner-border m-5" role="status"></div>) : (
            <Form onSubmit={handleSubmit(submitFormData)}>
                
                <FloatingLabel label="Id" className="mt-3">
                    <Form.Control {...register("id", { valueAsNumber: true })} type="number" readOnly defaultValue={operation?.id} />
                </FloatingLabel>

                <FloatingLabel label="Type" className="mt-3">
                    <Form.Select {...register("type", { valueAsNumber: true })} className="mt-3" defaultValue={operation?.type}>
                        <option value={0}>Income</option>
                        <option value={1}>Expense</option>
                    </Form.Select>
                </FloatingLabel>

                <FloatingLabel label="Date" className="mt-3">
                    <Form.Control {...register("date", { valueAsDate: true })} type="datetime-local"
                        defaultValue={getDateAsString(operation === null ? new Date() : operation.date)} />
                </FloatingLabel>

                <FloatingLabel label="Sum" className="mt-3">
                    <Form.Control {...register("sum", { valueAsNumber: true })} type="number" step={0.01} defaultValue={operation?.sum} />
                </FloatingLabel>

                <Stack direction="horizontal" className="mt-3 mb-2 justify-content-end" gap={2}>
                    <Button variant="outline-success" type="submit">
                        <OkIcon />
                    </Button>
                    <Button variant="outline-danger" type="submit">
                        <DeleteIcon />
                    </Button>
                </Stack>

            </Form>
            )}

        </Container>
    );
}