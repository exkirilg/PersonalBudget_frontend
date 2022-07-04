import { Store, createStore, combineReducers } from 'redux';
import { IdentityState, IdentityReducer } from './IdentityState';
import { OperationsState, OperationsReducer } from './OperationsState';

export function configureStore(): Store<AppState> {
    const store = createStore(rootReducer);
    return store;
}

export interface AppState {
    readonly identity: IdentityState,
    readonly operations: OperationsState
}

const rootReducer = combineReducers<AppState>({
    identity: IdentityReducer,
    operations: OperationsReducer
});
