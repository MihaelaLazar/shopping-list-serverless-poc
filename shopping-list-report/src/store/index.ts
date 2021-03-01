import {combineReducers} from 'redux';
import {ShoppingListReportState} from "./shopping-list-report/types";
import {shoppingListReportReducer} from "./shopping-list-report/reducer";

export interface ApplicationState {
    shoppingListReport: ShoppingListReportState;
}

export const createRootReducer = () =>
    combineReducers({
        shoppingListReport: shoppingListReportReducer,
    });