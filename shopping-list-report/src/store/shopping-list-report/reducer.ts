import {Reducer} from "redux";
import {ShoppingItemReportActionTypes, ShoppingListReportActions, ShoppingListReportState} from "./types";

const initialState: ShoppingListReportState = {
    data: [],
    errors: undefined,
    loading: false,
};

const reducer: Reducer<ShoppingListReportState>  = (state = initialState, action: ShoppingListReportActions) => {
    switch (action.type) {
        case ShoppingItemReportActionTypes.FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ShoppingItemReportActionTypes.FETCH_ERROR:
            return {
                ...state,
                errors: action.error,
                loading: false,
                data: []
            }
        case ShoppingItemReportActionTypes.FETCH_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false
            }
        default: {
            return state
        }
    }
}

export {reducer as shoppingListReportReducer};
