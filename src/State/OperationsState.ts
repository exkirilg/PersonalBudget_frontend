import { Operation } from '../Interfaces/Operation';

export interface OperationsState {
    readonly loading: boolean,
    readonly operations: Operation[],
    readonly viewing: Operation | null,
    readonly searched: Operation[]
}

const initialOperationsState: OperationsState = {
    loading: false,
    operations: [],
    viewing: null,
    searched: []
}

export const GETTINGOPERATIONS = 'GettingOperations';
export const GOTOPERATIONS = 'GotOperations';
export const GETTINGOPERATION = 'GettingOperation';
export const GOTOPERATION = 'GotOperation';
export const SEARCHINGOPERATIONS = 'SearchingOperations';
export const SEARCHEDOPERATIONS = 'SearchedOperations';

export const gettingOperationsAction = () => (
    { type: GETTINGOPERATIONS } as const
);
export const gotOperationsAction = (operations: Operation[]) => (
    { type: GOTOPERATIONS, operations: operations } as const
);
export const gettingOperationAction = () => (
    { type: GETTINGOPERATION } as const
);
export const gotOperationAction = (operation: Operation | null) => (
    { type: GOTOPERATION, operation: operation } as const
);
export const searchingOperationsAction = () => (
    { type: SEARCHINGOPERATIONS } as const
);
export const searchedOperationsAction = (operations: Operation[]) => (
    { type: SEARCHEDOPERATIONS, operations } as const
);

type OperationsActions =
    | ReturnType<typeof gettingOperationsAction>
    | ReturnType<typeof gotOperationsAction>
    | ReturnType<typeof gettingOperationAction>
    | ReturnType<typeof gotOperationAction>
    | ReturnType<typeof searchingOperationsAction>
    | ReturnType<typeof searchedOperationsAction>;

export const OperationsReducer = (state = initialOperationsState, action: OperationsActions) => {
    switch (action.type) {
        case GETTINGOPERATIONS: {
            return {
                ...state,
                loading: true
            }
        }
        case GOTOPERATIONS: {
            return {
                ...state,
                loading: false,
                operations: action.operations
            }
        }
        case GETTINGOPERATION: {
            return {
                ...state,
                loading: true,
                viewing: null
            }
        }
        case GOTOPERATION: {
            return {
                ...state,
                loading: false,
                viewing: action.operation
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
        default:
            return state;
    }
}
