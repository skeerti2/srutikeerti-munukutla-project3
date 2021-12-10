import {LOGGEDIN} from '../actions/constants'

const initialState = {
    currentUser: ''
}

export const UserReducer = (state=initialState, action) => {
    if(action.type === LOGGEDIN){
        return{
            ...state,
            currentUser : action.payload
        }
    }
    return state;
}