import React from "react";
import { AppState } from "../State/Store";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
    gettingItemsAction,
    cancelGettingItemsAction,
    gotItemsAction,
    cancelSavingOperationAction,
    savedOperationAction,
    cancelDeletingOperationAction,
    deletedOperationAction,
    finishedEditingOperationAction,
    setPageAction
} from "../State/OperationsState";
import { postOperation, putOperation, deleteOperation } from "../Data/OperationsData";

import { Operation } from "../Models/Operation";
import { Item } from "../Models/Item";
import { OperationType } from "../Models/OperationType";
import { getItemsByType } from "../Data/ItemsData";
import { getDateTimeAsString} from "../Services/DateTimeServices";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CreatableSelect from "react-select/creatable";

interface IItemsOption {
    value: string,
    label: string,
    isDisabled: boolean,
    __isNew__: boolean
}

const itemsOptions: IItemsOption[] = [];

export const OperationForm = () => {

    const dispatch = useDispatch();

    const operation = useSelector((state: AppState) => state.operations.operation);
    const loading = useSelector((state: AppState) => state.operations.loadingOperationForm);
    const doSave = useSelector((state: AppState) => state.operations.saveOperation);
    const doDelete = useSelector((state: AppState) => state.operations.deleteOperation);
    const message = useSelector((state: AppState) => state.operations.operationFormMessage);
    const currentPage = useSelector((state: AppState) => state.operations.currentPage);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: "onTouched",
        defaultValues:
        {
            id: operation?.id.toString(),
            date: getDateTimeAsString(operation!.date),
            item: operation?.item === null ?
                null : {
                    value: operation?.item?.id.toLocaleString(),
                    label: operation?.item?.name,
                    isDisabled: false,
                    __isNew__: false
                },
            sum: operation?.sum
        }
    });

    //#region Effects

    // Fetch items
    React.useEffect(() => {
        
        const doGetItemsByType = async (type: OperationType) => {
            dispatch(gettingItemsAction());
            const items = await getItemsByType(type);
            itemsOptions.splice(0);
            items.forEach(element => {
                itemsOptions.push({
                    value: element.id.toString(),
                    label: element.name,
                    isDisabled: false,
                    __isNew__: false
                });
            });
            dispatch(gotItemsAction());
        }

        if (operation?.type !== undefined) {
            doGetItemsByType(operation.type).catch(() => {
                dispatch(cancelGettingItemsAction("Something gone wrong, please try again later"));
            });
        }

    }, [dispatch, operation?.type] );

    // Save operation
    React.useEffect(() => {
        
        const saveAction = async (data: any) => {
            operation!.date = new Date(data.date);
            operation!.item = new Item({
                id: data.item.__isNew__ ? 0 : Number(data.item.value),
                type: operation!.type,
                name: data.item.label
            });
            operation!.sum = Number(data.sum);

            let result: Operation | null = null;

            if (operation!.id === 0) {
                result = await postOperation(operation!);
            }
            else {
                result = await putOperation(operation!);
            }

            if (result !== null) {
                dispatch(savedOperationAction(result));
                dispatch(setPageAction(currentPage));
                dispatch(finishedEditingOperationAction());
            }
            else {
                dispatch(cancelSavingOperationAction("Something gone wrong, please try again later"));
            }
        }

        if (doSave === false)
            return;

        handleSubmit<any>(saveAction)().catch(() => {
            dispatch(cancelSavingOperationAction("Something gone wrong, please try again later"));
        });

    }, [dispatch, handleSubmit, doSave, operation])

    // Delete operation
    React.useEffect(() => {
        
        const deleteAction = async () => {

            const result = await deleteOperation(operation!.id);

            if (result) {
                dispatch(deletedOperationAction(operation!.id));
                dispatch(setPageAction(currentPage));
                dispatch(finishedEditingOperationAction());
            }
            else {
                dispatch(cancelDeletingOperationAction("Something gone wrong, please try again later"));
            }
        }
        
        if (doDelete === false)
            return;

        deleteAction().catch(() => {
            dispatch(cancelDeletingOperationAction("Something gone wrong, please try again later"));
        });

    }, [dispatch, handleSubmit, doDelete, operation])

    //#endregion

    const idInput = () => (
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Id</Form.Label>
            <Col sm="10">
                <Form.Control
                    type="number" readOnly
                    {...register("id")} />
            </Col>
        </Form.Group>
    );
    
    const dateInput = () => (
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Date</Form.Label>
            <Col sm="10">
                <Form.Control
                    type="datetime-local"
                    {...register("date", { required: true })} />
                {
                    errors?.date?.type === "required" &&
                    <Form.Text muted>
                        <p className="text-danger">Date is required</p>
                    </Form.Text>
                }
            </Col>
        </Form.Group>
    );

    const itemInput = () => (
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Item</Form.Label>
            <Col sm="10">
                <Controller
                    control={control} name="item"
                    rules={{ required: true }}
                    render={({
                        field: { onChange, onBlur, value }
                    }) => (
                        <CreatableSelect
                            isClearable placeholder="Select or Type in new..."
                            options={itemsOptions}
                            onChange={onChange} onBlur={onBlur} value={value}
                        />
                    )}
                />
                {
                    // @ts-ignore
                    errors?.item?.type === "required" &&
                    <Form.Text muted>
                        <p className="text-danger">Item is required</p>
                    </Form.Text>
                }
            </Col>
        </Form.Group>
    );
    
    const sumInput = () => (
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Sum</Form.Label>
            <Col sm="10">
                <Form.Control
                    type="number" step={0.01}
                    {...register("sum")} />
            </Col>
        </Form.Group>
    );

    return (
        <Container>

            {
                !loading &&
                <Form className="my-3">
                    
                    {
                        operation?.id !== 0 &&
                        idInput()
                    }
                    
                    {dateInput()}
                    {itemInput()}
                    {sumInput()}

                </Form>
            }

            {
                message &&
                <p className="text-danger">{message}</p>
            }

        </Container>
    );
}
