import {createSelector} from 'reselect';

const selectUsersReducer = (state) => state.users;

export const selectUsers = createSelector([selectUsersReducer],(users) => users.userList);