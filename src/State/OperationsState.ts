import { Operation } from "../Models/Operation";
import { OperationsFilterSettings } from "../Models/OperationsFilterSettings";

export interface OperationsState {
    readonly loading: boolean,
    readonly filter: OperationsFilterSettings,
    readonly operations: Operation[],
    readonly searched: Operation[],
    readonly operationsMessage: string | null
    readonly operation: Operation | null,
    readonly loadingOperationForm: boolean,
    readonly saveOperation: boolean,
    readonly deleteOperation: boolean,
    readonly operationFormMessage: string | null
}

const initialOperationsState: OperationsState = {
    loading: false,
    filter: new OperationsFilterSettings(),
    operations: [],
    searched: [],
    operationsMessage: null,
    operation: null,
    loadingOperationForm: false,
    saveOperation: false,
    deleteOperation: false,
    operationFormMessage: null 
}

export const SETFILTER = 'SetFilter';
export const GETTINGOPERATIONS = 'GettingOperations';
export const CANCELGETTINGOPERATIONS = 'CancelGettingOperations';
export const GOTOPERATIONS = 'GotOperations';
export const SEARCHINGOPERATIONS = 'SearchingOperations';
export const SEARCHEDOPERATIONS = 'SearchedOperations';
export const GETTINGOPERATION = 'GettingOperation';
export const GOTOPERATION = 'GotOperation';
export const EDITINGOPERATION = 'EditingOperation';
export const FINISHEDEDITINGOPERATION = 'FinishedEditingOperation';
export const GETTINGITEMS = 'GettingItems';
export const CANCELGETTINGITEMS = 'CancelGettingItems';
export const GOTITEMS = 'GotItems';
export const SAVINGOPERATION = 'SavingOperation';
export const CANCELSAVINGOPERATION = 'CancelSavingOperation';
export const SAVEDOPERATION = 'SavedOperation';
export const DELETINGOPERATION = 'DeletingOperation';
export const CANCELDELETINGOPERATION = 'CancelDeletingOperation';
export const DELETEDOPERATION = 'DeletedOperation';

export const setFilterAction = (filter: OperationsFilterSettings) => (
    { type: SETFILTER, filter: filter } as const
);
export const gettingOperationsAction = () => (
    { type: GETTINGOPERATIONS } as const
);
export const cancelGettingOperationsAction = (message: string | null) => (
    { type: CANCELGETTINGOPERATIONS, message: message } as const
);
export const gotOperationsAction = (operations: Operation[]) => (
    { type: GOTOPERATIONS, operations: operations } as const
);
export const searchingOperationsAction = () => (
    { type: SEARCHINGOPERATIONS } as const
);
export const searchedOperationsAction = (operations: Operation[]) => (
    { type: SEARCHEDOPERATIONS, operations } as const
);
export const editingOperationAction = (operation: Operation) => (
    { type: EDITINGOPERATION, operation: operation } as const
);
export const finishedEditingOperationAction = () => (
    { type: FINISHEDEDITINGOPERATION } as const
);
export const gettingItemsAction = () => (
    { type: GETTINGITEMS } as const
);
export const cancelGettingItemsAction = (message: string | null) => (
    { type: CANCELGETTINGITEMS, message: message } as const
);
export const gotItemsAction = () => (
    { type: GOTITEMS } as const
);
export const savingOperationAction = () => (
    { type: SAVINGOPERATION } as const
);
export const cancelSavingOperationAction = (message: string | null) => (
    { type: CANCELSAVINGOPERATION, message: message } as const
);
export const savedOperationAction = (operation: Operation) => (
    { type: SAVEDOPERATION, operation: operation } as const
);
export const deletingOperationAction = () => (
    { type: DELETINGOPERATION } as const
);
export const cancelDeletingOperationAction = (message: string | null) => (
    { type: CANCELDELETINGOPERATION, message: message } as const
);
export const deletedOperationAction = (operationId: number) => (
    { type: DELETEDOPERATION, operationId: operationId } as const
);

type OperationsActions =
    | ReturnType<typeof setFilterAction>
    | ReturnType<typeof gettingOperationsAction>
    | ReturnType<typeof cancelGettingOperationsAction>
    | ReturnType<typeof gotOperationsAction>
    | ReturnType<typeof searchingOperationsAction>
    | ReturnType<typeof searchedOperationsAction>
    | ReturnType<typeof editingOperationAction>
    | ReturnType<typeof finishedEditingOperationAction>
    | ReturnType<typeof gettingItemsAction>
    | ReturnType<typeof cancelGettingItemsAction>
    | ReturnType<typeof gotItemsAction>
    | ReturnType<typeof savingOperationAction>
    | ReturnType<typeof cancelSavingOperationAction>
    | ReturnType<typeof savedOperationAction>
    | ReturnType<typeof deletingOperationAction>
    | ReturnType<typeof cancelDeletingOperationAction>
    | ReturnType<typeof deletedOperationAction>;

export const OperationsReducer = (state = initialOperationsState, action: OperationsActions) => {
    switch (action.type) {
        case SETFILTER: {
            return {
                ...state,
                filter: action.filter
            }
        }
        case GETTINGOPERATIONS: {
            return {
                ...state,
                loading: true,
                operationsMessage: null
            }
        }
        case CANCELGETTINGOPERATIONS: {
            return {
                ...state,
                loading: false,
                operationsMessage: action.message
            }
        }
        case GOTOPERATIONS: {
            return {
                ...state,
                loading: false,
                operations: action.operations,
                operationsMessage: null
            }
        }
        case SEARCHINGOPERATIONS: {
            return {
                ...state,
                loading: true,
                searched: []
            }
        }
        case SEARCHEDOPERATIONS: {
            return {
                ...state,
                loading: false,
                searched: action.operations
            }
        }
        case EDITINGOPERATION: {
            return {
                ...state,
                operation: action.operation,
                operationFormMessage: null
            }
        }
        case FINISHEDEDITINGOPERATION: {
            return {
                ...state,
                operation: null,
                loadingOperationForm: false,
                operationFormMessage: null
            }
        }
        case GETTINGITEMS: {
            return {
                ...state,
                loadingOperationForm: true,
                operationFormMessage: null
            }
        }
        case CANCELGETTINGITEMS: {
            return {
                ...state,
                loadingOperationForm: false,
                operationFormMessage: action.message
            }
        }
        case GOTITEMS: {
            return {
                ...state,
                loadingOperationForm: false,
                operationFormMessage: null
            }
        }
        case SAVINGOPERATION: {
            return {
                ...state,
                loadingOperationForm: true,
                saveOperation: true,
                operationFormMessage: null
            }
        }
        case CANCELSAVINGOPERATION: {
            return {
                ...state,
                loadingOperationForm: false,
                saveOperation: false,
                operationFormMessage: action.message
            }
        }
        case SAVEDOPERATION: {
            let operationInArray = state.operations.find(o => o.id === action.operation.id);

            if (operationInArray !== undefined) {
                operationInArray.date = action.operation.date;
                operationInArray.item = action.operation.item;
                operationInArray.sum = action.operation.sum;
            }
            else {
                state.operations.push(action.operation);
            }

            state.operations.sort((o1, o2) => {
                if (o1.date > o2.date)
                    return 1;

                if (o1.date < o2.date)
                    return -1;

                return 0;
            });

            const operations = state.operations
                .filter(
                    o => o.date >= state.filter.dateFrom &&
                    o.date <= state.filter.dateTo &&
                    (
                        state.filter.search === "" ||
                        o.item!.name.toLowerCase().indexOf(state.filter.search.toLowerCase()) >= 0
                    )
                );

            return {
                ...state,
                operations: operations,
                loadingOperationForm: false,
                saveOperation: false,
                operationFormMessage: null
            }
        }
        case DELETINGOPERATION: {
            return {
                ...state,
                loadingOperationForm: true,
                deleteOperation: true,
                operationFormMessage: null
            }
        }
        case CANCELDELETINGOPERATION: {
            return {
                ...state,
                loadingOperationForm: false,
                deleteOperation: false,
                operationFormMessage: action.message
            }
        }
        case DELETEDOPERATION: {
            const operations = state.operations.filter(o => o.id !== action.operationId);
            return {
                ...state,
                operations: operations,
                loadingOperationForm: false,
                deleteOperation: false,
                operationFormMessage: null
            }
        }
        default:
            return state;
    }
}
