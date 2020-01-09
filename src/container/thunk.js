import { service } from '../utility/services';
import { clearFormData, storeLoginSucessData, storeRegisterSucessData, storeLoginErrorData } from './action';
import { createHashHistory } from 'history';

export const registerUser = (data) => {
    let requestUrl = 'http://localhost:2000/api/register';
    const reqBody = data;
    const dataset = {
        method: "POST",
        url: requestUrl,
        body: reqBody
    };

    return (dispatch) => {
        try {
            service.callApi(dataset, true)
            .then(obj => {
                dispatch(clearFormData());
                dispatch(storeRegisterSucessData(obj));
            });
         } catch (error) {
        }
    };
}

export const loginUser = (data) => {
    let requestUrl = 'http://localhost:2000/api/login';
    const reqBody = data;
    const dataset = {
        method: "POST",
        url: requestUrl,
        body: reqBody
    };

    return (dispatch) => {
        try {
            service.callApi(dataset, true)
            .then(obj => {
                dispatch(clearFormData());
                dispatch(storeLoginSucessData(obj));
                if(obj && obj.reponse && obj.reponse.status == 200) {
                    let history = createHashHistory({
                        hashType: 'noslash'
                    });
                    history.push('/dashboard');
                } else {
                    dispatch(storeLoginErrorData(obj));
                }
            });
         } catch (error) {
            console.log("Error Part")
        }
    };
}