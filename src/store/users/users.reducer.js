import { USERS_ACTION_TYPES } from "./users.types";

const INITIAL_STATE = {
    userList: [],
}

export const usersReducer = (state=INITIAL_STATE, action) => {
    const {type,payload} = action;
    switch(type){
        case USERS_ACTION_TYPES.SET_USERS:
            return{
                ...state,
                userList: payload
            }
        default:
            return state;    
    }
}