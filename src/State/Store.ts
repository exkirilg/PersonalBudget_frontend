import { Store, createStore, combineReducers } from 'redux';
import { OperationsState, OperationsReducer } from './OperationsState';

export function configureStore(): Store<AppState> {
    const store = createStore(rootReducer);
    return store;
}

export interface AppState {
    readonly operations: OperationsState
}

const rootReducer = combineReducers<AppState>({
    operations: OperationsReducer
});
