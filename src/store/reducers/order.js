import * as actionTypes from '../actions/actionTypes.js';
import { updateObject } from '../../shared/utility';

const initialState = {
    order: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased: false})
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, {loading: true});
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...state.order,
                id: action.orderId
            };
            return updateObject(action.orderData, {
                loading: false,
                purchased: true,
                order: state.order.concat(newOrder)});
        case actionTypes.PURCHASE_BURGER_FAIL:
             return updateObject(state,{loading: false});
        case actionTypes.FETCH_ORDERS_START:
                return updateObject(state,{loading: true});
        case actionTypes.FETCH_ORDERS_SUCCESS:
                return updateObject(state,{
                    loading: false,
                    order: action.orders});   
        case actionTypes.FETCH_ORDERS_FAIL:
                return updateObject(state,{loading: false})                 
        default:
            return state;
    }
}
export default reducer;