import { environment } from '../environments/environments';

export const ServerURLs = {
    bussion: environment.baseUrl + '/api/V3/',
    connector: window.location.protocol + '//' + window.location.hostname + ':**port**/api/V3/',
}

export const Endpoints = {
    dataops: ServerURLs.bussion + 'Applications/DataOps',
    scriptEndpoint: ServerURLs.bussion + 'Applications',
    getBussionScripts: '/GetBussionScriptFile',
    saveBussionScripts: '/SaveBussionScriptFile',
    token: '33722768367448188871',
    dataStoreid: '72727142666381427723',
    login: ServerURLs.bussion + 'Logon/Login',
    getUsers: ServerURLs.bussion + 'Users/GetUsers',
    getUserId: ServerURLs.bussion + 'Users/GetUserById',
    getRoles: ServerURLs.bussion + 'Roles/GetRoles',
    getUserRoles: ServerURLs.bussion + 'Roles/GetRolesOfUserByUserId',
    logout: ServerURLs.bussion + 'Logon/Logout',

};