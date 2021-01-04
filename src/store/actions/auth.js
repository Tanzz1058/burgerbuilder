import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (err) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}

export const authLogOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
} 

export const checkAuthTimeOut = (time) =>{
    return dispatch =>{
        setTimeout(() => {
            dispatch(authLogOut());
        },
        time*1000)
    }
}

export const setAuthRedirectPath = (path) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const auth = (email, password, isSignUp) =>{
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXE9a6ql3WgcFTdKWehfa6O6BPVjUD0yg'
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXE9a6ql3WgcFTdKWehfa6O6BPVjUD0yg'
        }
        axios.post(url, authData)
        .then(res =>{
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn*1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', res.data.idToken);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeOut(res.data.expiresIn));
        })
        .catch(err=>{
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const checkAuthStatus = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(authLogOut());
        }
        else{
            const expirationDate = localStorage.getItem('expirationDate');
            if(expirationDate <= new Date()){
                dispatch(authLogOut());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut((new Date(expirationDate).getTime() - new Date().getTime())/1000))
            }
        }
    }
}