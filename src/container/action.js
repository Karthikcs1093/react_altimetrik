import * as types from './actionConstant';

export const formHandler = (name, value) => {
    return {
        type: types.FORM_HANDLER,
        name,
        value
    }
}

export const clearFormData = () => {
    return {
        type: types.FORM_HANDLER_CLEAR,
    }
}

export const storeLoginSucessData = (data) => {
    return {
        type: types.LOGIN_SUCCESS,
        data
    }
}

export const storeLoginErrorData = (err) => {
    return {
        type: types.LOGIN_ERROR,
        err: err.data
    }
}

export const storeRegisterSucessData = (data) => {
    return {
        type: types.REGISTER_SUCCESS,
        data
    }
}