import {
    createStore,
    combineReducers,
    applyMiddleware
} from "redux";

import houseReducer from "./reducers/houseReducer";

import {logger} from "redux-logger";

const middleware = applyMiddleware(logger);

const reducer = combineReducers({
    houses: houseReducer
});

const store = createStore(reducer, middleware);

export default store;