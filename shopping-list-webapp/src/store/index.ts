import {combineReducers} from 'redux';
import {ShoppingItemState} from "./shopping-list/types";
import {shoppingListReducer} from './shopping-list/reducer';


export interface ApplicationState {
    shoppingList: ShoppingItemState;
}

export const createRootReducer = () =>
    combineReducers({
        shoppingList: shoppingListReducer,
    });