import { createActions, createReducer } from 'reduxsauce';
import { Notification } from "@common";

/* Types and actions */
export const { Types, Creators } = createActions({
    addProfile: ['value'],
    getProfile: ['value'],
    editProfile: ['id', 'newValue']
});


/* Valaue init */
const INITIAL_STATE = [];


/* Functions Reducers */
const addProfile = (state = INITIAL_STATE, action) => [
    ...state,
    action.value
];



const getProfile = (state = INITIAL_STATE, action) => state


const editProfile = (state = INITIAL_STATE, action) => {
    return state.map(profile => {
        if (profile.id === action.id) {
            return { ...profile, ...action.newValue };
        }
        return profile;
    });
};

export default createReducer(INITIAL_STATE, {
    [Types.ADD_PROFILE]: addProfile,
    [Types.GET_PROFILE]: getProfile,
    [Types.EDIT_PROFILE]: editProfile 
});