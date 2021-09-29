import {fromJS} from 'immutable';
import * as types from '../constants/index';
import {DEFAULT, EMAIL_DEFAULT} from "../constants/function-constants";

const defaultState = fromJS({
    app: {
        loggedChecking: true,
        logged: false,
        redirectToLogin: false,
        data: {
            firstName: '',
            lastName: '',
            email: '',
            role: ''
        }
    },
    login: {
        status: DEFAULT, // DEFAULT, LOGIN_SUCCESS, LOGIN_FAILURE, LOGGED
        btnLoading: false
    },
    signUp: {
        status: EMAIL_DEFAULT,
        btnSignUpLoading: false

    },
    forgotPassword: {
        email: '',
        btnLoading: false,
        sentInstruction: false
    },
    resetPassword: {
        forgotItem: {},
        isCheckingToken: true,
        validToken: false,
        btnLoadingSubmitReset: false,
        messageChangePassword: ''
    },
    listApp: {
        isLoading: false,
        data: []
    },
    listAppForReporting: {
        isLoading: false,
        data: []
    },
    createApp: {
        isLoading: false,
        addResult: 0, // 0 = default, 1 = success => redirect to list app, 2 = failure => show error
        form: {
            name: '',
            siteUrl: '',
            imageBaseUrl: '',
            token: ''
        }
    },
    editApp: {
        isFetchingAppDetail: false,
        isLoadingEditAppSubmit: false,
        addResult: 0, // 0 = default, 1 = success => redirect to list app, 2 = failure => show error
        form: {
            id: 0,
            name: '',
            siteUrl: '',
            imageBaseUrl: '',
            token: ''
        }
    },
    changePassword: {
        status: 0 // 0 = default, 1 = success , 2 = failure
    },
    updateProfile: {
        status: 0 // 0 = default, 1 = success , 2 = failure
    }
});

const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.UPDATE_LOGIN_STATUS:
            return state.setIn(['login', 'status'], action.payload);
        case types.UPDATE_EMAIL_STATUS:
            return state.setIn(['signUp', 'status'], action.payload);
        case types.UPDATE_LOGIN_BTN_LOADING:
            return state.setIn(['login', 'btnLoading'], action.payload);
        case types.UPDATE_SIGN_UP_BTN_LOADING:
            return state.setIn(['signUp', 'btnSignUpLoading'], action.payload);
        case types.UPDATE_APP_LOGGED:
            const status = action.payload.status;
            const data = action.payload.data;
            return state.setIn(['app', 'logged'], status).setIn(['app', 'data'], fromJS(data));
        case types.UPDATE_CHECKING_LOGIN:
            return state.setIn(['app', 'loggedChecking'], action.payload);
        case types.UPDATE_REDIRECT_TO_LOGIN:
            return state.setIn(['app', 'redirectToLogin'], action.payload);
        case types.UPDATE_FORGOT_PASSWORD_BTN_LOADING:
            return state.setIn(['forgotPassword', 'btnLoading'], action.payload);
        case types.UPDATE_FORGOT_PASSWORD_SEND_INSTRUCTION:
            if (action.payload) {
                // Set empty email address after sent
                return state.setIn(['forgotPassword', 'sentInstruction'], action.payload).setIn(['forgotPassword', 'email'], '');
            }
            return state.setIn(['forgotPassword', 'sentInstruction'], action.payload);
        case types.ON_FORGOT_PASSWORD_EMAIL_CHANGE:
            return state.setIn(['forgotPassword', 'email'], action.payload);
        case types.UPDATE_IS_CHECKING_RESET_PASSWORD:
            return state.setIn(['resetPassword', 'isCheckingToken'], action.payload);
        case types.UPDATE_VALID_TOKEN:
            if (action.payload.status) {
                return state.setIn(['resetPassword', 'validToken'], action.payload.status)
                    .setIn(['resetPassword', 'forgotItem'], action.payload.obj);
            }
            return state.setIn(['resetPassword', 'validToken'], action.payload.status);
        case types.UPDATE_BTN_SUBMIT_RESET:
            return state.setIn(['resetPassword', 'btnLoadingSubmitReset'], action.payload);
        case types.UPDATE_RESET_PASSWORD_MESSAGE_RESULT:
            return state.setIn(['resetPassword', 'messageChangePassword'], action.payload);
        case types.RECEIVED_LIST_APP_DATA:
            return state.setIn(['listApp', 'data'], action.payload);
        case types.UPDATE_GET_LIST_APP_LOADING:
            return state.setIn(['listApp', 'isLoading'], action.payload);
        case types.NEW_APP_FIELDS_CHANGE:
            if (action.payload.editMode === 1) {
                return state.setIn(['editApp', 'form', action.payload.field], action.payload.value);
            }
            return state.setIn(['createApp', 'form', action.payload.field], action.payload.value);
        case types.RESET_NEW_APP_FORM:
            const form = {
                name: '',
                siteUrl: '',
                imageBaseUrl: '',
                token: ''
            }
            return state.setIn(['createApp', 'form'], fromJS(form));
        case types.CREATE_NEW_BTN_LOADING:
            return state.setIn(['createApp', 'isLoading'], action.payload);
        case types.UPDATE_CREATE_NEW_APP_RESULT:
            return state.setIn(['createApp', 'addResult'], action.payload);
        case types.RESET_EDIT_APP_FORM: {
            const form = {
                name: '',
                siteUrl: '',
                imageBaseUrl: '',
                token: ''
            }
            return state.setIn(['editApp', 'form'], fromJS(form));
        }
        case types.UPDATE_GET_APP_DETAIL_LOADING:
            return state.setIn(['editApp', 'isFetchingAppDetail'], action.payload);
        case types.RECEIVED_APP_DETAIL:
            const editItem = action.payload;
            const edit = {
                id: editItem._id,
                name: editItem.name,
                siteUrl: editItem.destination_url,
                imageBaseUrl: editItem.product_image_base_url,
                token: editItem.token
            }
            return state.setIn(['editApp', 'form'], fromJS(edit));
        case types.CHANGE_PASSWORD:
            return state.setIn(['changePassword', 'status'], action.payload);
        case types.UPDATE_CHANGE_PASSWORD_MESSAGE_RESULT:
            return state.setIn(['changePassword', 'status'], action.payload);
        case types.UPDATE_PROFILE_MESSAGE_RESULT:
            return state.setIn(['updateProfile', 'status'], action.payload);
        case types.UPDATE_APP_BTN_LOADING:
            return state.setIn(['editApp', 'isLoadingEditAppSubmit'], action.payload);
        case types.UPDATE_LOADING_APP_FOR_REPORT:
            return state.setIn(['listAppForReporting', 'isLoading'], action.payload);
        case types.RECEIVED_LIST_APP_REPORT:
            return state.setIn(['listAppForReporting', 'data'], fromJS(action.payload));
        default:
            return state;
    }
};

export default mainReducer;
