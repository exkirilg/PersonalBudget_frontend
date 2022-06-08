import { Store, createStore, combineReducers } from 'redux';

import { BudgetOperationsState, BudgetOperationsReducer } from './BudgetOperationsState';

export function configureStore(): Store<AppState> {
    const store = createStore(rootReducer, undefined);
    return store;
}

export interface AppState {
    readonly budgetOperations: BudgetOperationsState
}

const rootReducer = combineReducers<AppState>({
    budgetOperations: BudgetOperationsReducer
});
