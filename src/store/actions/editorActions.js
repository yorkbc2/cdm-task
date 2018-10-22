export const TOGGLE_EDITOR = "TOGGLE_EDITOR";



export const toggleEditor = ({id, type}) => ({type: TOGGLE_EDITOR, payload: {id, type}});