import {
    INITIALIZE_HOUSES_START,
    INITIALIZE_HOUSES_END,
    INITIALIZE_HOUSES_ERROR,
    ADD_HOUSE,
    CHANGE_FILTER,
    CHANGE_HOUSE_STATUS,
    CHANGE_HOUSE_COSTS,
    CHANGE_PAGE
} from "./../actions/houseActions";
import { computeTotalPrice } from "./../../helpers/price";
import store from "store";

export default function houseReducer (state = {
    fetching: false,
    data: [],
    error: null,
    filterByStatusValues: [{
        text: "Any",
        value: "any"
    }, {
        text: "In progress",
        value: "progress"
    }, {
        text: "Started",
        value: "started"
    }, {
        text: "Finished",
        value: "finished"
    }],
    filterByStatus: null,
    filteredData: [],
    page: 1,
    dataPerPage:2

}, {type, payload}) {
    switch (type) {
        case INITIALIZE_HOUSES_START:
            return {
                ...state,
                fetching: true,
                filterByStatus: state.filterByStatusValues[0]
            };
        case INITIALIZE_HOUSES_END: 
            return {
                ...state,
                fetching: false,
                data: payload,
                filteredData: payload
            };
        case INITIALIZE_HOUSES_ERROR:
            return {
                ...state,
                fetching: false,
                error: payload
            };
        case ADD_HOUSE: {
            return {
                ...state,
                data: [
                    ...state.data,
                    payload
                ]
            };
        }
        case CHANGE_FILTER: {
            return {
                ...state,
                filterByStatus: state.filterByStatusValues.filter(i => i.value === payload)[0],
                filteredData: state.data.filter(i => payload !== "any"? (i.status === payload): true)
            };
        }
        case CHANGE_HOUSE_STATUS: {
            const newState = {
                ...state,
                data: state.data.map(i => {
                    if (i.uid === payload.uid)
                        i.status = payload.value;
                    return i;
                })
            }

            store.set("houses", newState.data);

            return newState;
        }
        case CHANGE_HOUSE_COSTS: {
            return {
                ...state,
                data: state.data.map(i => {
                    if (i.uid === payload.uid)
                        i.costs = payload.costs;
                    i.totalPrice = computeTotalPrice(i.costs, "price");
                    store.set("houses", store.get("houses").map(h => {
                        if (h.uid === i.uid)
                            h = i;
                        return h;
                    }));
                    return i;
                })
            }
        }
        case CHANGE_PAGE:
            return {
                ...state,
                page: payload
            }
        default:
            return state;
    }
} 