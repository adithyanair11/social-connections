import { USERS_ACTION_TYPES } from "./users.types";
import {createAction} from "../../utils/reducer.utils";

const addUserToList = (users,user) => {
    users.push(user);
    return [...new Set(users)];
}

const removeUserFromList = (users,user) => {
    return users.filter(current => current.name !== user.name);
}

const addConnectionToUser = (users,user,name) => {
    for(let current of users){
        if(current.name === user.name){
            user.friends.push(name);
        }
    }
    return users;
}

export const addUser = (users,user) => {
    const newUserList = addUserToList(users,user);
    return createAction(USERS_ACTION_TYPES.SET_USERS, newUserList)
}

export const removeUser = (users,user) => {
    const newUserList = removeUserFromList(users,user);
    return createAction(USERS_ACTION_TYPES.SET_USERS, newUserList)
}

export const addConnection = (users,user,name) => {
    const newUserList = addConnectionToUser(users,user,name);
    return createAction(USERS_ACTION_TYPES.SET_USERS, newUserList)
}