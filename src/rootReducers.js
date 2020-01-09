import { combineReducers } from 'redux';
import { formHandlingData, userCredentialData } from './container/reducer'


export const rootReducers = combineReducers({
    formHandlingData, 
    userCredentialData
});