import * as types from './actionConstant';

let initialstate = {
    "name": '',
    "pwd": '',
    "regName": '',
    "phone": '',
    "email": '',
    "regPassword": ''
}

let userInitialData = {
    loginData: '',
    registerData: ''
}

export const formHandlingData = (prevState = initialstate, action) => {
    const formName = action.name
    switch (action.type) {
        case types.FORM_HANDLER:
            return {
                ...prevState,
                [formName]: action.value
            }
        case types.FORM_HANDLER_CLEAR:
            return {
                initialstate
            }
        default:
            return prevState;
    }
}

export const userCredentialData = (prevState = userInitialData, action) => {
    switch(action.type) {
        case types.LOGIN_SUCCESS:
            return {
               ...prevState,
               loginData: action.data
            }
        case types.CLEAR_USER_DATA:
            return {
                prevState
            }
        case types.LOGIN_ERROR:
            return {
                ...prevState,
                loginData: action.err
            }
            case types.REGISTER_SUCCESS:
                return {
                   ...prevState,
                   registerData: action.data
                }
        default:
            return prevState
    }
}
