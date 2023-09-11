import { environment } from '../environments/environments';

export const ServerURLs = {
    bussion: environment.baseUrl + '/api/V3/',
    connector: window.location.protocol + '//' + window.location.hostname + ':**port**/api/V3/',
}

export const Endpoints = {
    dataops: ServerURLs.bussion + 'Applications/DataOps',
    scriptEndpoint: ServerURLs.bussion + 'Applications',
    token: '33722768367448188871',
    answersDataStoreid: '67525733536673626715',
    questionsDataStoreid: '23474615133847814541',
    usersDataStoreid: '71346323414335581818',
    examsDataStoreid: '1122',
    getUsers: ServerURLs.bussion + 'Users/GetUsers',
    logout: ServerURLs.bussion + 'Logon/Logout',
};