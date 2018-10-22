export const INITIALIZE_HOUSES_START = "INITIALIZE_HOUSES_START";
export const INITIALIZE_HOUSES_END = "INITIALIZE_HOUSES_END";
export const INITIALIZE_HOUSES_ERROR = "INITIALIZE_HOUSES_ERROR";
export const ADD_HOUSE = "ADD_HOUSE";
export const CHANGE_FILTER = "CHANGE_FILTER";
export const CHANGE_HOUSE_STATUS = "CHANGE_HOUSE_STATUS";
export const CHANGE_HOUSE_COSTS = "CHANGE_HOUSE_COSTS";
export const CHANGE_PAGE = "CHANGE_PAGE";

export const initStart = () => ({type: INITIALIZE_HOUSES_START});
export const initEnd = payload => ({type: INITIALIZE_HOUSES_END, payload}); 
export const addHouse = payload => ({type: ADD_HOUSE, payload});
export const changeFilter = payload => ({type: CHANGE_FILTER, payload});
export const changeHouseStatus = (uid, value) => ({type: CHANGE_HOUSE_STATUS, payload: {uid, value}});
export const changeHouseCosts = (uid, costs) => ({type: CHANGE_HOUSE_COSTS, payload: {uid, costs}});