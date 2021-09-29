import * as types from '../constants/index';

export function login(payload) {
    return {
        type: types.LOGIN,
        payload
    }
}

export function logout() {
    return {
        type: types.LOGOUT
    }
}

export function forgotPasswordSubmit(payload) {
    return {
        type: types.FORGOT_PASSWORD_SUBMIT,
        payload
    }
}

export function createAccount(payload) {
    return {
        type: types.CREATE_ACCOUNT,
        payload
    }
}

export function onChangePasswordSubmit(payload) {
    return {
        type: types.CHANGE_PASSWORD,
        payload
    }
}

export function onUpdateProfile(payload) {
    return {
        type: types.UPDATE_PROFILE,
        payload
    }
}

export function checkingLogin() {
    return {
        type: types.CHECKING_LOGIN
    }
}

export function onForgotPasswordEmailChange(payload) {
    return {
        type: types.ON_FORGOT_PASSWORD_EMAIL_CHANGE,
        payload
    }
}

export function checkForgotResetToken(payload) {
    return {
        type: types.CHECK_FORGOT_RESET_TOKEN,
        payload
    }
}

export function getListApps() {
    return {
        type: types.GET_LIST_APPS
    }
}

export function newAppFieldsChange(payload) {
    return {
        type: types.NEW_APP_FIELDS_CHANGE,
        payload
    }
}

export function resetNewAppForm() {
    return {
        type: types.RESET_NEW_APP_FORM
    }
}

export function onResetPasswordSubmit(payload) {
    return {
        type: types.ON_RESET_PASSWORD_SUBMIT,
        payload
    }
}

export function createNewApp() {
    return {
        type: types.CREATE_NEW_APP
    }
}


export function updateCreateNewAppResult(payload) {
    return {
        type: types.UPDATE_CREATE_NEW_APP_RESULT,
        payload
    }
}

export function updateApp() {
    return {
        type: types.UPDATE_APP
    }
}

export function getDetailAppForEdit(payload) {
    return {
        type: types.GET_DETAIL_APP_FOR_EDIT,
        payload
    }
}

export function getAppsForReport() {
    return {
        type: types.GET_APPS_FOR_REPORT
    }
}