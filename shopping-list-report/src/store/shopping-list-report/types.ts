
export interface ShoppingListReport {
    id: any,
    itemsCreated: number,
    itemsDeleted: number,
    itemsUpdated: number
}

export interface ShoppingListReportState {
    readonly loading: boolean;
    readonly data: ShoppingListReport[];
    readonly errors?: string;
}

export enum ShoppingItemReportActionTypes {
    FETCH_REQUEST = '@@report/FETCH_REQUEST',
    FETCH_SUCCESS = '@@report/FETCH_SUCCESS',
    FETCH_ERROR = '@@report/FETCH_ERROR',
}
export interface GetShoppingItemsReportRequestAction {
    type: typeof ShoppingItemReportActionTypes.FETCH_REQUEST;
}

export interface GetShoppingItemsReportSuccessAction {
    type: typeof ShoppingItemReportActionTypes.FETCH_SUCCESS;
    data: ShoppingListReport[];
}

export interface GetShoppingItemsReportErrorAction {
    type: typeof ShoppingItemReportActionTypes.FETCH_ERROR;
    error: string;
}

export type ShoppingListReportActions =
    | GetShoppingItemsReportRequestAction
    | GetShoppingItemsReportSuccessAction
    | GetShoppingItemsReportErrorAction