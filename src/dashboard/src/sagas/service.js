import axios from 'axios';
import {apiPath} from '../config/local';


const graphql = `${apiPath}/graphql/graphql`;

export async function loginService(payload) {
    const email = payload.payload.email;
    const password = payload.payload.password;
    try {
        const response = await axios({
            url: graphql,
            method: 'post',
            data: {
                query: `{
                signIn(email: "${email}", password: "${password}")
            }`
            }
        });
        return await response.data.data.signIn;
    } catch (e) {
        console.log(e);
    }
    return null;
}

export async function getAllAppByUserService(payload) {
    try {
        const response = await axios({
            url: graphql,
            method: 'post',
            data: {
                query: `{
                getAllApp(userId: "${payload}"){_id, product_image_base_url, token, destination_url, name, platform}
            }`
            }
        });
        return await response.data.data.getAllApp;
    } catch (e) {
        console.log(e);
    }
    return null;
}

export async function getAppDetailService(payload) {
    try {
        const response = await axios({
            url: graphql,
            method: 'post',
            data: {
                query: `{
                getApp(token: "${payload.payload}"){_id, product_image_base_url, token, destination_url, name, platform}
            }`
            }
        });
        return await response.data.data.getApp;
    } catch (e) {
        console.log(e);
    }
    return null;
}

export async function getAppsForReportService(payload) {
    try {
        const response = await axios({
            url: graphql,
            method: 'post',
            data: {
                query: `{reportAllApp}`
            }
        });
        return await response.data.data.reportAllApp;
    } catch (e) {
        console.log(e);
    }
    return null;
}


export async function createAppService(payload) {
   const createApp = payload.createApp;
    const appData = payload.appData;
    const name = createApp.get('name');
    const siteUrl = createApp.get('siteUrl');
    const imageBaseUrl = createApp.get('imageBaseUrl');
    const userId = appData.getIn(['data', '_id']);
    try {
        const response = await axios.post(graphql, {  query: `
            mutation {
                createApp(userId: "${userId}", name: "${name}", siteUrl: "${siteUrl}", imageUrl: "${imageBaseUrl}")
            }
        `})
        return response.data.data.createApp;
    } catch (e) {
        console.log(e);
    }
    return null;
}

export async function updateAppService(payload) {
    const editApp = payload.editApp;
    const name = editApp.get('name');
    const siteUrl = editApp.get('siteUrl');
    const imageBaseUrl = editApp.get('imageBaseUrl');
    const appId = editApp.get('id');
    try {
        const response = await axios.post(graphql, {  query: `
            mutation {
                updateApp(appId: "${appId}", name: "${name}", siteUrl: "${siteUrl}", imageUrl: "${imageBaseUrl}")
            }
        `})
        return response.data.data.updateApp;
    } catch (e) {
        console.log(e);
    }
    return null;
}

export async function forgotPasswordService(payload) {
    const email = payload.payload;
    try {
        const response = await axios.get(`${apiPath}/coreapi/forgot-password/${email}`);
        const data = await response.data;
        return data;
    } catch (e) {
        console.log(e);
    }
    return null;
}

export async function getForgotItemService(payload) {
    const token = payload.payload;
    try {
        const response = await axios.get(`${apiPath}/coreapi/get-forgot-item/${token}`);
        return await response.data;
    } catch (e) {
        console.log(e);
    }
    return null;
}

export async function resetPasswordService(payload) {
    const token = payload.payload.token;
    const password = payload.payload.password;
    try {
        // Send a POST request
        const response = await axios({
            method: 'post',
            url: `${apiPath}/coreapi/reset-password-request`,
            data: {
                token,
                password
            }
        });
        return await response.data;
    } catch (e) {
        console.log(e);
    }
    return null;
}
export async function changePasswordService(payload,email) {
    const password = payload.payload.password;
    try {
        // Send a POST request
        const response = await axios({
            method: 'post',
            url: `${apiPath}/coreapi/change-password`,
            data: {
                email,
                password
            }
        });
        return await response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function updateProfileService(payload,email) {
    const firstName = payload.payload.firstName;
    const lastName = payload.payload.lastName;
    try {
        // Send a POST request
        const response = await axios({
            method: 'post',
            url: `${apiPath}/coreapi/save-profile`,
            data: {
                firstName,
                lastName,
                email
            }
        });
        return await response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function signUpService(payload) {
    const firstName = payload.payload.firstName;
    const lastName = payload.payload.lastName;
    const email = payload.payload.email;
    const password = payload.payload.password;
    return await axios.post(`${apiPath}/graphql/graphql`, {
        query: `
            mutation {
                signUp(firstName: "${firstName}", lastName: "${lastName}", email: "${email}", password: "${password}")
            }
        `,
    })
        .then(function (response) {
            return response.status === 200 ? response.data : [];
        })
        .catch(err => console.log(err))
}
