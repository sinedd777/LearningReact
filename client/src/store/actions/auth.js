import {addError,removeError} from "./error";
import {SET_CURRENT_USER } from '../actionTypes';

import api from '../../services/api';

export const setCurrentUser = user =>({
   type: SET_CURRENT_USER,
    user
});

export const setToken = token =>{
    api.setToken(token)
};

export const logout = () =>{
    return dispatch=> {
        console.log("works");
        localStorage.clear();
        api.setToken(null);
        dispatch(setCurrentUser({}));
        dispatch(removeError());
    }
};


export const authUser = (path,data) =>{
  return async dispatch=>{
      try {
        const {token, ...user} = await api.call('post','auth/'+path,data);
        localStorage.setItem('jwtToken',token);
        api.setToken(token);
        dispatch(setCurrentUser(user));
        dispatch(removeError());

      }catch (e) {
          console.log(e.response.data.err);
          const error = e.response.data.err;
          dispatch(addError(error));
      }
  }
};