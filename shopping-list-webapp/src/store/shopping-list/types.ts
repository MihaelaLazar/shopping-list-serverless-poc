export class ShoppingItem {
    inBasket?: boolean = false;
    id: string = "";
    name?: string;
}


export interface ShoppingItemState {
    readonly loading: boolean;
    readonly data: ShoppingItem[];
    readonly errors?: string;
    readonly shoppingItemCreated?: boolean;
}

export enum ShoppingItemActionTypes {
    FETCH_REQUEST = '@@items/FETCH_REQUEST',
    FETCH_SUCCESS = '@@items/FETCH_SUCCESS',
    FETCH_ERROR = '@@items/FETCH_ERROR',
    ADD_TO_BASKET_REQUEST = '@@item/ADD_TO_BASKET_REQUEST',
    ADD_TO_BASKET_SUCCESS = '@@item/ADD_TO_BASKET_SUCCESS',
    ADD_TO_BASKET_ERROR = '@@item/ADD_TO_BASKET_ERROR',
    ADD_TO_LIST_REQUEST = '@@item/ADD_TO_LIST_REQUEST',
    ADD_TO_LIST_SUCCESS = '@@item/ADD_TO_LIST_SUCCESS',
    ADD_TO_LIST_ERROR = '@@item/ADD_TO_LIST_ERROR',
    REMOVE_ITEM_REQUEST = '@@item/REMOVE_ITEM_REQUEST',
    REMOVE_ITEM_SUCCESS = '@@item/REMOVE_ITEM_SUCCESS',
    REMOVE_ITEM_ERROR = '@@item/REMOVE_ITEM_ERROR',
    CLEAR_ITEMS_REQUEST = '@@item/CLEAR_ITEMS_REQUEST',
    CLEAR_ITEMS_SUCCESS = '@@item/CLEAR_ITEMS_SUCCESS',
    CLEAR_ITEMS_ERROR = '@@item/CLEAR_ITEMS_ERROR',
}
export interface GetShoppingItemsRequestAction {
    type: typeof ShoppingItemActionTypes.FETCH_REQUEST;
}

export interface GetShoppingItemsSuccessAction {
    type: typeof ShoppingItemActionTypes.FETCH_SUCCESS;
    data: ShoppingItem[];
}

export interface GetShoppingItemsErrorAction {
    type: typeof ShoppingItemActionTypes.FETCH_ERROR;
    error: string;
}

export interface AddToBasketRequestAction {
    type: typeof ShoppingItemActionTypes.ADD_TO_BASKET_REQUEST;
}

export interface AddToBasketSuccessAction {
    type: typeof ShoppingItemActionTypes.ADD_TO_BASKET_SUCCESS;
    item: ShoppingItem;
}

export interface AddToBasketErrorAction {
    type: typeof ShoppingItemActionTypes.ADD_TO_BASKET_ERROR;
    error: string;
}

export interface AddToListSuccessAction {
    type: typeof ShoppingItemActionTypes.ADD_TO_LIST_SUCCESS;
    item: ShoppingItem;
}

export interface AddToListRequestAction {
    type: typeof ShoppingItemActionTypes.ADD_TO_LIST_REQUEST;
}

export interface AddToListErrorAction {
    type: typeof ShoppingItemActionTypes.ADD_TO_LIST_ERROR;
    error: string;
}

export interface AddToListSuccessAction {
    type: typeof ShoppingItemActionTypes.ADD_TO_LIST_SUCCESS;
    item: ShoppingItem;
}

export interface ClearItemsRequestAction {
    type: typeof ShoppingItemActionTypes.CLEAR_ITEMS_REQUEST;
}

export interface ClearItemsSuccessAction {
    type: typeof ShoppingItemActionTypes.CLEAR_ITEMS_SUCCESS;
}

export interface ClearItemsErrorAction {
    type: typeof ShoppingItemActionTypes.CLEAR_ITEMS_ERROR;
    error: string
}

export interface RemoveItemRequestAction {
    type: typeof ShoppingItemActionTypes.REMOVE_ITEM_REQUEST;
    item: ShoppingItem;
}

export interface RemoveItemSuccessAction {
    type: typeof ShoppingItemActionTypes.REMOVE_ITEM_SUCCESS;
    item: ShoppingItem;
}

export interface RemoveItemErrorAction {
    type: typeof ShoppingItemActionTypes.REMOVE_ITEM_ERROR;
    error: string;
}

export type ShoppingListActions =
    | GetShoppingItemsRequestAction
    | GetShoppingItemsSuccessAction
    | GetShoppingItemsErrorAction
    | AddToBasketRequestAction
    | AddToBasketSuccessAction
    | AddToBasketErrorAction
    | AddToListSuccessAction
    | AddToListRequestAction
    | AddToListErrorAction
    | RemoveItemRequestAction
    | RemoveItemSuccessAction
    | RemoveItemErrorAction
    | ClearItemsRequestAction
    | ClearItemsSuccessAction
    | ClearItemsErrorAction;