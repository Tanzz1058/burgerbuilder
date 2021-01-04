import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    userId: null,
    token: null,
    loading: false,
    error: null,
    authRedirectPath: '/'
}

const authStart = (state) =>{
    return updateObject(state, {
        error: null,
        loading: true});
};

const authSuccess = (state, action) =>{
    return updateObject(state, {
        error: null,
        loading: false, 
        userId: action.userId, 
        token: action.idToken});
};

const authFail = (state, action) =>{
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

const setAuthRedirectPath = (state, action)  =>{
    return updateObject( state, {authRedirectPath: action.path})
}

const authLogOut = (state, action) =>{
    return updateObject(state, {
        token: null, 
        userId: null
    })
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.AUTH_START : return authStart(state);
        case actionTypes.AUTH_FAIL : return authFail(state, action);
        case actionTypes.AUTH_SUCCESS : return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT : return authLogOut(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH : return setAuthRedirectPath(state, action);
        default : return state;
    }
}

export default reducer;