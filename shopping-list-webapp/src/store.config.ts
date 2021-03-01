import {ApplicationState, createRootReducer} from './store';
import {applyMiddleware, createStore, Store} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

const logger = createLogger({
    // ...options
});

export default function configureStore(
    initialState: ApplicationState,
): Store<ApplicationState> {
    return createStore(
        createRootReducer(),
        initialState,
        applyMiddleware(thunk, logger),
    );
}