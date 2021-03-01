import {ActionCreator, AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";
import {
    AddToBasketErrorAction,
    AddToBasketRequestAction,
    AddToBasketSuccessAction,
    AddToListErrorAction,
    AddToListRequestAction,
    AddToListSuccessAction,
    ClearItemsErrorAction,
    ClearItemsRequestAction,
    ClearItemsSuccessAction,
    GetShoppingItemsErrorAction,
    GetShoppingItemsRequestAction,
    GetShoppingItemsSuccessAction,
    RemoveItemErrorAction,
    RemoveItemRequestAction,
    RemoveItemSuccessAction,
    ShoppingItem,
    ShoppingItemActionTypes
} from "./types";
import axios from 'axios';

const getShoppingItemsRequest = (): GetShoppingItemsRequestAction => ({
    type: ShoppingItemActionTypes.FETCH_REQUEST
});

const findShoppingItemsSuccess = (data: ShoppingItem[]): GetShoppingItemsSuccessAction => ({
    type: ShoppingItemActionTypes.FETCH_SUCCESS,
    data: data
});

const findShoppingItemsError = (error: string): GetShoppingItemsErrorAction => ({
    type: ShoppingItemActionTypes.FETCH_ERROR,
    error: error
});

const addToBasketSuccess = (data: ShoppingItem): AddToBasketSuccessAction => ({
    type: ShoppingItemActionTypes.ADD_TO_BASKET_SUCCESS,
    item: data,
});

const addToBasketRequest = (): AddToBasketRequestAction => ({
   type: ShoppingItemActionTypes.ADD_TO_BASKET_REQUEST
});

const addToBasketError = (error: string): AddToBasketErrorAction => ({
    type: ShoppingItemActionTypes.ADD_TO_BASKET_ERROR,
    error: error
});

const removeItemSuccess = (data: ShoppingItem): RemoveItemSuccessAction => ({
    type: ShoppingItemActionTypes.REMOVE_ITEM_SUCCESS,
    item: data
});

const addToListRequest = (): AddToListRequestAction => ({
    type: ShoppingItemActionTypes.ADD_TO_LIST_REQUEST,
});

const addToListError = (error: string): AddToListErrorAction => ({
    type: ShoppingItemActionTypes.ADD_TO_LIST_ERROR,
    error: error
});

const addToListSuccess = (data: ShoppingItem): AddToListSuccessAction => ({
    type: ShoppingItemActionTypes.ADD_TO_LIST_SUCCESS,
    item: data
});

const clearItemsRequest = (): ClearItemsRequestAction => ({
    type: ShoppingItemActionTypes.CLEAR_ITEMS_REQUEST
});

const clearItemsSuccess = (): ClearItemsSuccessAction => ({
    type: ShoppingItemActionTypes.CLEAR_ITEMS_SUCCESS
});

const clearItemsError = (message: string): ClearItemsErrorAction => ({
   type: ShoppingItemActionTypes.CLEAR_ITEMS_ERROR,
   error: message
});

const removeItemRequest = (shoppingItem: ShoppingItem): RemoveItemRequestAction => ({
    type: ShoppingItemActionTypes.REMOVE_ITEM_REQUEST,
    item: shoppingItem
});

const removeItemError = (message: string): RemoveItemErrorAction => ({
    type: ShoppingItemActionTypes.REMOVE_ITEM_ERROR,
    error: message
});

export const getShoppingItems: ActionCreator<ThunkAction<Promise<void>,
    {},
    {},
    AnyAction>> = () => {
    return async (dispatch, getState, extraArgument): Promise<void> => {
        dispatch(getShoppingItemsRequest());
        axios
            .get("https://shopping-list-gateway-id-1lc1lfyj.ew.gateway.dev/shopping-list",
                {
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                }).then((res: any) => {
                    dispatch(findShoppingItemsSuccess(res.data));
                })
            .catch((err: any) => {
                console.log(JSON.stringify(err.response));
                dispatch(findShoppingItemsError(err.response.data));
            });
    }
};

export const addToBasket: ActionCreator<ThunkAction<Promise<void>,
    {},
    {},
    AnyAction>> = (data: ShoppingItem) => {
    return async (dispatch, getState, extraArgument): Promise<void> => {
        dispatch(addToBasketRequest());
        axios
            .post("https://shopping-list-gateway-id-1lc1lfyj.ew.gateway.dev/add-shopping-item",
                data,
                {
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                }).then((res: any) => {
            dispatch(addToBasketSuccess(data));
        })
            .catch((err: any) => {
                console.log(JSON.stringify(err.response));
                dispatch(addToBasketError(err.response));
            });
    };
};

export const removeItem: ActionCreator<ThunkAction<Promise<void>,
    {},
    {},
    AnyAction>> = (data: ShoppingItem) => {
    return async (dispatch, getState, extraArgument): Promise<void> => {
        dispatch(removeItemRequest(data));
        axios.post("https://shopping-list-gateway-id-1lc1lfyj.ew.gateway.dev/delete-shopping-item", data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res: any) => {
                dispatch(removeItemSuccess(data));
            }).catch((err: any) => {
            console.log(JSON.stringify(err.response));
            dispatch(removeItemError(err.response));
        });
    };
};

export const addToList: ActionCreator<ThunkAction<Promise<void>, {}, {}, AnyAction>> = (data: ShoppingItem) => {
    return async (dispatch, getState, extraArgument): Promise<void> => {

        dispatch(addToListRequest());
        axios
            .post("https://shopping-list-gateway-id-1lc1lfyj.ew.gateway.dev/add-shopping-item",
                data,
                {
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                }).then((res: any) => {
            dispatch(addToListSuccess(data));
        })
            .catch((err: any) => {
                console.log(JSON.stringify(err.response));
                dispatch(addToListError(err.response));
            });
    }
}

export const clearItems: ActionCreator<ThunkAction<Promise<void>, {}, {}, AnyAction>> = () => {
    return async (dispatch, getState, extraArgument): Promise<void> => {
        dispatch(clearItemsRequest());
        axios.post("https://shopping-list-gateway-id-1lc1lfyj.ew.gateway.dev/delete-all-items", {},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res: any) => {
            dispatch(clearItemsSuccess());
        }).catch((err: any) => {
            console.log(JSON.stringify(err.response));
            dispatch(clearItemsError(err.response));
        });
    };
}