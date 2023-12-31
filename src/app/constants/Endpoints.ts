import { environment } from '../environments/environments';

export const ServerURLs = {
    bussion: environment.baseUrl + '/api/V3/',
    connector: window.location.protocol + '//' + window.location.hostname + ':**port**/api/V3/',
}

export const Endpoints = {
  dataops: ServerURLs.bussion + 'Applications/DataOps',
  scriptEndpoint: ServerURLs.bussion + 'Applications',
  register: ServerURLs.bussion + 'Users/SelfRegisterUser',
  login: ServerURLs.bussion + "Logon/Login",
  token: '33722768367448188871',
  answersDataStoreid: '67525733536673626715',
  questionsDataStoreid: '23474615133847814541',
  userScoreDataStoreid: '36124677357828656653',
  usersDataStoreid: '71346323414335581818',
  examsDataStoreid: '71228732617281387825',
  examCategoryDataStoreid: '53551637416518348344',
  usersCourseDataStoreId:'46385276425818427885',
  getUsers: ServerURLs.bussion + 'Users/GetUsers',
  logout: ServerURLs.bussion + 'Logon/Logout',
};
