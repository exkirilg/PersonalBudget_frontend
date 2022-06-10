import { BudgetOperation } from '../Interfaces/BudgetOperation';

export interface BudgetOperationsState {
    readonly loading: boolean,
    readonly operations: BudgetOperation[],
    readonly viewing: BudgetOperation | null,
    readonly searched: BudgetOperation[]
}

const initialBudgetOperationsState: BudgetOperationsState = {
    loading: false,
    operations: [],
    viewing: null,
    searched: []
}

export const GETTINGBUDGETOPERATIONS = 'GettingBudgetOperations';
export const GOTBUDGETOPERATIONS = 'GotBudgetOperations';
export const GETTINGBUDGETOPERATION = 'GettingBudgetOperation';
export const GOTBUDGETOPERATION = 'GotBudgetOperation';
export const SEARCHINGBUDGETOPERATIONS = 'SearchingBudgetOperations';
export const SEARCHEDBUDGETOPERATIONS = 'SearchedBudgetOperations';

export const gettingBudgetOperationsAction = () => (
    { type: GETTINGBUDGETOPERATIONS } as const
);
export const gotBudgetOperationsAction = (operations: BudgetOperation[]) => (
    { type: GOTBUDGETOPERATIONS, operations: operations } as const
);
export const gettingBudgetOperationAction = () => (
    { type: GETTINGBUDGETOPERATION } as const
);
export const gotBudgetOperationAction = (operation: BudgetOperation | null) => (
    { type: GOTBUDGETOPERATION, operation: operation } as const
);
export const searchingBudgetOperationsAction = () => (
    { type: SEARCHINGBUDGETOPERATIONS } as const
);
export const searchedBudgetOperationsAction = (operations: BudgetOperation[]) => (
    { type: SEARCHEDBUDGETOPERATIONS, operations } as const
);

type BudgetOperationsActions =
    | ReturnType<typeof gettingBudgetOperationsAction>
    | ReturnType<typeof gotBudgetOperationsAction>
    | ReturnType<typeof gettingBudgetOperationAction>
    | ReturnType<typeof gotBudgetOperationAction>
    | ReturnType<typeof searchingBudgetOperationsAction>
    | ReturnType<typeof searchedBudgetOperationsAction>;

export const BudgetOperationsReducer = (state = initialBudgetOperationsState, action: BudgetOperationsActions) => {
    switch (action.type) {
        case GETTINGBUDGETOPERATIONS: {
            return {
                ...state,
                loading: true
            }
        }
        case GOTBUDGETOPERATIONS: {
            return {
                ...state,
                loading: false,
                operations: action.operations
            }
        }
        case GETTINGBUDGETOPERATION: {
            return {
                ...state,
                loading: true,
                viewing: null
            }
        }
        case GOTBUDGETOPERATION: {
            return {
                ...state,
                loading: false,
                viewing: action.operation
            }
        }
        case SEARCHINGBUDGETOPERATIONS: {
            return {
                ...state,
                loading: true,
                searched: []
            }
        }
        case SEARCHEDBUDGETOPERATIONS: {
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
