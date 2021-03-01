import {
    AddToBasketSuccessAction,
    RemoveItemSuccessAction,
    ShoppingItem,
    ShoppingItemActionTypes,
    ShoppingItemState,
    ShoppingListActions
} from "./types";
import {Reducer} from "redux";

const initialState: ShoppingItemState = {
    data: [],
    errors: undefined,
    loading: false,
};

const updateObjectInArray = (array: ShoppingItem[], action: AddToBasketSuccessAction) => {
    return array.map((item, index) => {
        if (item.id !== action.item.id) {
            return item;
        }

        return {
            ...item,
            inBasket: true
        };
    });
};

const removeItem = (array: ShoppingItem[], action: RemoveItemSuccessAction) => {
    return array.filter((item, index) => item.id !== action.item.id);
};

const reducer: Reducer<ShoppingItemState>  = (state = initialState, action: ShoppingListActions) => {
    switch (action.type) {
        case ShoppingItemActionTypes.FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ShoppingItemActionTypes.FETCH_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
                errors: ""
            }
        case ShoppingItemActionTypes.FETCH_ERROR:
            return {
                ...state,
                data: [],
                loading: false,
                errors: action.error
            }
        case ShoppingItemActionTypes.ADD_TO_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ShoppingItemActionTypes.ADD_TO_LIST_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.error
            }
        case ShoppingItemActionTypes.ADD_TO_LIST_SUCCESS:
            return {
                ...state,
                data: [
                    ...state.data,
                    {
                        id: action.item.id,
                        inBasket: false,
                        name: action.item.name
                    }
                ]
            };
        case ShoppingItemActionTypes.ADD_TO_BASKET_SUCCESS:
            return {
                ...state,
                data: updateObjectInArray(state.data, action)
            };
        case ShoppingItemActionTypes.REMOVE_ITEM_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ShoppingItemActionTypes.REMOVE_ITEM_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.error
            }
        case ShoppingItemActionTypes.REMOVE_ITEM_SUCCESS:
            return {
                ...state,
                data: removeItem(state.data, action),
                loading: false
            };
        case ShoppingItemActionTypes.CLEAR_ITEMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ShoppingItemActionTypes.CLEAR_ITEMS_SUCCESS: {
            return {
                data: [],
                loading: false
            };
        }
        case ShoppingItemActionTypes.CLEAR_ITEMS_ERROR: {
            return {
                ...state,
                loading: false,
                errors: action.error
            }
        }
        default: {
            return state
        }
    }
}

export {reducer as shoppingListReducer};
