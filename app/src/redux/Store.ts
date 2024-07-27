import logger from "redux-logger";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";

import RootSaga from "./RootSaga";
import RootReducer from "./RootReducer";

/**
 * Middleware
 */
const sagaMiddleware = createSagaMiddleware();
const middleware: any = [logger, sagaMiddleware];

/**
 * Create Store
 */
export const Store = createStore(RootReducer, applyMiddleware(...middleware));

/**
 * Create Persister
 */
export const Persister = persistStore(Store);

/**
 * Run Sagas
 */
sagaMiddleware.run(RootSaga);
