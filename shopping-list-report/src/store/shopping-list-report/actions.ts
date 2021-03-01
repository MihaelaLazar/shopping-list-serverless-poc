import {ActionCreator, AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";
import axios from "axios";
import {
    GetShoppingItemsReportErrorAction,
    GetShoppingItemsReportRequestAction,
    GetShoppingItemsReportSuccessAction,
    ShoppingItemReportActionTypes,
    ShoppingListReport
} from "./types";

const getShoppingItemsReportRequest = (): GetShoppingItemsReportRequestAction => ({
    type: ShoppingItemReportActionTypes.FETCH_REQUEST
});

const getShoppingItemsReportSuccess = (data: ShoppingListReport[]): GetShoppingItemsReportSuccessAction => ({
    type: ShoppingItemReportActionTypes.FETCH_SUCCESS,
    data: data
});

const getShoppingItemsReportError = (error: string): GetShoppingItemsReportErrorAction => ({
    type: ShoppingItemReportActionTypes.FETCH_ERROR,
    error: error
});

export const getShoppingItemsReport: ActionCreator<ThunkAction<Promise<void>,
    {},
    {},
    AnyAction>> = () => {
    return async (dispatch, getState, extraArgument): Promise<void> => {
        dispatch(getShoppingItemsReportRequest());
        axios
            .get("https://shopping-list-gateway-id-1lc1lfyj.ew.gateway.dev/read-reports",
                {
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                }).then((res: any) => {
            dispatch(getShoppingItemsReportSuccess(res.data));
        })
            .catch((err: any) => {
                console.log(JSON.stringify(err.response));
                dispatch(getShoppingItemsReportError(err.response.data));
            });
    }
};