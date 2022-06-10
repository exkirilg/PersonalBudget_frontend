import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../State/Store";
import { gettingBudgetOperationAction, gotBudgetOperationAction } from "../../State/BudgetOperationsState";
import { useForm } from "react-hook-form";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

import { getBudgetOperationById } from "../../Data/BudgetOperationsData";

import { OkIcon, DeleteIcon } from "../../Components/Images";

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

export const BudgetOperationEdit = ({operationId}: Props) => {

    const dispatch = useDispatch();
    
    const doGetBudgetOperationById = async (id: number) => {
        dispatch(gettingBudgetOperationAction());
        const operation = await getBudgetOperationById(id);
        //console.log(operation?.id);
        dispatch(gotBudgetOperationAction(operation));
    };

    React.useEffect(() => {
        if (operationId) {
            doGetBudgetOperationById(Number(operationId));
        }
    }, [operationId]);

    const { register, handleSubmit } = useForm<FormData>();

    const submitFormData = ({id, type, date, sum}: FormData) => {
        //console.log(`${id} - ${type} - ${date} - ${sum}`);
    }

    const operation = useSelector((state: AppState) => state.budgetOperations.viewing);

    return (
        <Container>
            
            <Form onSubmit={handleSubmit(submitFormData)}>
                
                <FloatingLabel label="Id" className="mt-3">
                    <Form.Control {...register("id", { valueAsNumber: true })} type="number" readOnly />
                </FloatingLabel>

                <FloatingLabel label="Type" className="mt-3">
                    <Form.Select {...register("type", { valueAsNumber: true })} className="mt-3" defaultValue={0}>
                        <option value={0}>Income</option>
                        <option value={1}>Expense</option>
                    </Form.Select>
                </FloatingLabel>

                <FloatingLabel label="Date" className="mt-3">
                    <Form.Control {...register("date", { valueAsDate: true })} type="datetime-local" />
                </FloatingLabel>

                <FloatingLabel label="Sum" className="mt-3">
                    <Form.Control {...register("sum", { valueAsNumber: true })} type="number" step={0.01} defaultValue={0.00} />
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

        </Container>
    );
}
