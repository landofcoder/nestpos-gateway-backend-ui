import {takeEvery, call, put, select} from "redux-saga/effects";
import * as types from '../constants/index';
import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_LOCAL_STORAGE_KEY,
    EMAIL_FAILURE,
    EMAIL_SUCCESS,
} from '../constants/function-constants';
import {
    loginService,
    signUpService,
    forgotPasswordService,
    getForgotItemService,
    resetPasswordService,
    getAllAppByUserService,
    createAppService,
    updateAppService,
    getAppDetailService,
    changePasswordService,
    updateProfileService,
    getAppsForReportService
} from './service';

const appReducer = state => state.getIn(['mainReducer', 'app']);
const createAppReducer = state => state.getIn(['mainReducer', 'createApp', 'form']);
const editAppReducer = state => state.getIn(['mainReducer', 'editApp', 'form']);

function* loginActionSg(payload) {
    // Start loading
    yield put({type: types.UPDATE_LOGIN_BTN_LOADING, payload: true});

    const data = yield call(loginService, payload);
    let loginResult = true;
    let resJson = null;
    if (data) {
        resJson = JSON.parse(data);
        if (resJson.status === false) {
            loginResult = false;
        } else {
            // Login success
            const rememberPassword = payload.payload.rememberLogin;
            // Write password hash to local
            if (rememberPassword) {
                const data = resJson.data;
                localStorage.setItem(LOGIN_LOCAL_STORAGE_KEY, JSON.stringify({data}));
            }

            yield put({type: types.UPDATE_APP_LOGGED, payload: true});
        }
    } else {
        loginResult = false;
    }

    if (!loginResult) {
        // Login error
        yield put({type: types.UPDATE_LOGIN_STATUS, payload: LOGIN_FAILURE});
    } else {
        yield put({type: types.UPDATE_LOGIN_STATUS, payload: LOGIN_SUCCESS});
    }

    // Stop loading
    yield put({type: types.UPDATE_LOGIN_BTN_LOADING, payload: false});
}

function* checkingLoginSg() {
    // Check in reducer
    const appResult = yield select(appReducer);
    if (appResult.get('logged')) {
        const data = appResult.get('data');
        yield put({type: types.UPDATE_APP_LOGGED, payload: {status: true, data}});
        // Stop loading main
        yield put({type: types.UPDATE_CHECKING_LOGIN, payload: false});
    } else {
        // Check in cookie
        const loggedStr = localStorage.getItem(LOGIN_LOCAL_STORAGE_KEY);
        const loggedJson = JSON.parse(loggedStr);
        if (loggedJson && loggedJson.data.password) {
            // Logged
            yield put({type: types.UPDATE_APP_LOGGED, payload: {status: true, data: loggedJson.data}});
            // Stop loading main
            yield put({type: types.UPDATE_CHECKING_LOGIN, payload: false});
        } else {
            // Redirect to login form
            yield put({type: types.UPDATE_REDIRECT_TO_LOGIN, payload: true});
        }
    }
}

function* logoutSg() {
    // Remove local data
    localStorage.removeItem(LOGIN_LOCAL_STORAGE_KEY);
    // Redirect to login form
    yield put({type: types.UPDATE_APP_LOGGED, payload: {status: false}});
    yield put({type: types.UPDATE_REDIRECT_TO_LOGIN, payload: true});
}

function* forgotPasswordSg(payload) {
    // Start loading
    yield put({type: types.UPDATE_FORGOT_PASSWORD_BTN_LOADING, payload: true});

    const forgotPasswordResult = yield call(forgotPasswordService, payload);
    if (forgotPasswordResult === true) {
        yield put({type: types.UPDATE_FORGOT_PASSWORD_SEND_INSTRUCTION, payload: true});
    } else {
        yield put({type: types.UPDATE_FORGOT_PASSWORD_SEND_INSTRUCTION, payload: false});
    }

    // Stop loading
    yield put({type: types.UPDATE_FORGOT_PASSWORD_BTN_LOADING, payload: false});
}

function* checkForgotResetTokenSg(payload) {
    const forgotResult = yield call(getForgotItemService, payload);

    // Update is checking to false
    yield put({type: types.UPDATE_IS_CHECKING_RESET_PASSWORD, payload: false});
    if (forgotResult !== false) {
        // Valid token
        yield put({type: types.UPDATE_VALID_TOKEN, payload: {status: true, obj: forgotResult}});
    } else {
        // Invalid token
        yield put({type: types.UPDATE_VALID_TOKEN, payload: {status: false}});
    }
}

function* onResetPasswordSubmitSg(payload) {
    // Start loading
    yield put({type: types.UPDATE_BTN_SUBMIT_RESET, payload: true});

    // Call api update
    const response = yield call(resetPasswordService, payload);
    if (response) {
        // Update message
        yield put({type: types.UPDATE_RESET_PASSWORD_MESSAGE_RESULT, payload: 'Password changed!'});
    } else {
        yield put({type: types.UPDATE_RESET_PASSWORD_MESSAGE_RESULT, payload: 'Error, please try again!'});
    }

    // Stop loading
    yield put({type: types.UPDATE_BTN_SUBMIT_RESET, payload: false});
}

function* onChangePasswordSubmitSg(payload) {
    const appResult = yield select(appReducer);
    const email = appResult.getIn(['data', 'email']);
    const response = yield call(changePasswordService, payload, email);
    if (response) {
        yield put({type: types.UPDATE_CHANGE_PASSWORD_MESSAGE_RESULT, payload: 1});
    } else {
        yield put({type: types.UPDATE_CHANGE_PASSWORD_MESSAGE_RESULT, payload: 2});
    }
}

function* updateProfileSubmitSg(payload) {
    const appResult = yield select(appReducer);
    const email = appResult.getIn(['data', 'email']);
    const response = yield call(updateProfileService, payload, email);
    if (response) {
        yield put({type: types.UPDATE_PROFILE_MESSAGE_RESULT, payload: 1});
    } else {
        yield put({type: types.UPDATE_PROFILE_MESSAGE_RESULT, payload: 2});
    }
}

function* getListAppsSg() {
    // Start loading
    yield put({type: types.UPDATE_GET_LIST_APP_LOADING, payload: true});

    const appResult = yield select(appReducer);
    const userId = appResult.getIn(['data', '_id']);
    const listApp = yield call(getAllAppByUserService, userId);
    yield put({type: types.RECEIVED_LIST_APP_DATA, payload: listApp});

    // Stop loading
    yield put({type: types.UPDATE_GET_LIST_APP_LOADING, payload: false});
}

function* createNewAppSg() {
    // Start loading
    yield put({type: types.CREATE_NEW_BTN_LOADING, payload: true});

    const createApp = yield select(createAppReducer);
    const appData = yield select(appReducer);
    const payload = {createApp, appData};
    const result = yield call(createAppService, payload);
    if (result) {
        yield put({type: types.UPDATE_CREATE_NEW_APP_RESULT, payload: 1});
    } else {
        yield put({type: types.UPDATE_CREATE_NEW_APP_RESULT, payload: 2});
    }

    // Stop loading
    yield put({type: types.CREATE_NEW_BTN_LOADING, payload: false});
}

function* getDetailAppForEditSg(payload) {
    // Reset form first before get detail app to editing
    yield put({type: types.RESET_EDIT_APP_FORM});

    // Start loading fetch detail
    yield put({type: types.UPDATE_GET_APP_DETAIL_LOADING, payload: true});

    // Fetching detail
    const result = yield call(getAppDetailService, payload);

    // Received app detail
    yield put({type: types.RECEIVED_APP_DETAIL, payload: result});

    //  Stop loading fetch detail
    yield put({type: types.UPDATE_GET_APP_DETAIL_LOADING, payload: false});
}

function* updateAppSg() {
    // Start loading
    yield put({type: types.UPDATE_APP_BTN_LOADING, payload: true});

    const editApp = yield select(editAppReducer);
    const payload = {editApp};
    const result = yield call(updateAppService, payload);

    if (result) {
        // Stop loading
        yield put({type: types.UPDATE_APP_BTN_LOADING, payload: false});
    } else {
        console.error('update error');
    }
}

function* signUpSg(payload) {
    // Start loading
    yield put({type: types.UPDATE_SIGN_UP_BTN_LOADING, payload: true});

    const result = yield call(signUpService, payload);
    // const data = result.data;
    const data = {
        success: "200"
    };

    if (data.error === "201") {
        // Login error
        yield put({type: types.UPDATE_EMAIL_STATUS, payload: EMAIL_FAILURE});
    } else {
        yield put({type: types.UPDATE_EMAIL_STATUS, payload: EMAIL_SUCCESS});
        const login = {
            email: payload.payload.email,
            password: payload.payload.password,
            rememberLogin: 1
        }
        yield loginActionSg({payload: login});
    }

    // Stop loading
    yield put({type: types.UPDATE_SIGN_UP_BTN_LOADING, payload: false});
}

function* getAppsForReportSg() {
    // Start loading
    yield put({type: types.UPDATE_LOADING_APP_FOR_REPORT, payload: true});

    // Call api to get all apps for report
    const listApp = yield call(getAppsForReportService);
    const listAppJson = JSON.parse(listApp);

    yield put({ type: types.RECEIVED_LIST_APP_REPORT, payload: listAppJson });

    // Stop loading
    yield put({type: types.UPDATE_LOADING_APP_FOR_REPORT, payload: false});
}

function* mainSaga() {
    yield takeEvery(types.CHANGE_PASSWORD, onChangePasswordSubmitSg);
    yield takeEvery(types.LOGIN, loginActionSg);
    yield takeEvery(types.CREATE_ACCOUNT, signUpSg);
    yield takeEvery(types.CHECKING_LOGIN, checkingLoginSg);
    yield takeEvery(types.LOGOUT, logoutSg);
    yield takeEvery(types.FORGOT_PASSWORD_SUBMIT, forgotPasswordSg);
    yield takeEvery(types.CHECK_FORGOT_RESET_TOKEN, checkForgotResetTokenSg);
    yield takeEvery(types.ON_RESET_PASSWORD_SUBMIT, onResetPasswordSubmitSg);
    yield takeEvery(types.GET_LIST_APPS, getListAppsSg);
    yield takeEvery(types.CREATE_NEW_APP, createNewAppSg);
    yield takeEvery(types.GET_DETAIL_APP_FOR_EDIT, getDetailAppForEditSg);
    yield takeEvery(types.UPDATE_APP, updateAppSg);
    yield takeEvery(types.UPDATE_PROFILE, updateProfileSubmitSg);
    yield takeEvery(types.GET_APPS_FOR_REPORT, getAppsForReportSg);
}

export default mainSaga;
