import * as generalConstants from '../constants/general';

export function isAuthenticated() {
  const tokenKey = localStorage.getItem(generalConstants.TOKEN_KEY);
  return tokenKey !== null;
  // return true;
}
export const getToken = () => localStorage.getItem(generalConstants.TOKEN_KEY);
export const login = loginData => {
  localStorage.setItem(generalConstants.ID, loginData.loggedUser.id);
  localStorage.setItem(generalConstants.NAME, loginData.loggedUser.name);
  localStorage.setItem(
    generalConstants.COMPANY_ID,
    parseInt(loginData.loggedUser.company_id)
  );
  localStorage.setItem(
    generalConstants.COMPANY_NAME,
    loginData.loggedUser.company_name
  );
  localStorage.setItem(generalConstants.USER_TYPE, loginData.loggedUser.type);
  localStorage.setItem(generalConstants.TOKEN_KEY, loginData.token);
  // setting user info at screen immediately
  const userInfo =
    `<p>Usuario: ${localStorage.getItem(generalConstants.NAME)}${'*'.repeat(
      3 - loginData.loggedUser.type
    )} </p>` +
    `<p>Empresa: ${localStorage.getItem(generalConstants.COMPANY_NAME)}</p>`;
  const userDiv = document.getElementById('userIdDiv');
  userDiv.innerHTML = userInfo;
  const itemLogin = document.getElementById('itemLogin');
  itemLogin.innerHTML = itemLogin.innerHTML
    .replace('Entrar', 'Sair')
    .replace('login', 'logout')
    .replace('Login', 'Logout');
};
export const getLoggedUserId = () => localStorage.getItem(generalConstants.ID);
export const getLoggedUserName = () =>
  localStorage.getItem(generalConstants.NAME);
export const getLoggedUserCompanyId = () =>
  localStorage.getItem(generalConstants.COMPANY_ID);
export const getLoggedUserCompanyName = () =>
  localStorage.getItem(generalConstants.COMPANY_NAME);
export const getLoggedUserType = () =>
  parseInt(localStorage.getItem(generalConstants.USER_TYPE));
export const logout = () => {
  localStorage.removeItem(generalConstants.TOKEN_KEY);
  localStorage.removeItem(generalConstants.ID);
  localStorage.removeItem(generalConstants.NAME);
  localStorage.removeItem(generalConstants.COMPANY_ID);
  localStorage.removeItem(generalConstants.COMPANY_NAME);
  // setting user info at screen immediately
  const userDiv = document.getElementById('userIdDiv');
  userDiv.innerHTML = '';
  const itemLogin = document.getElementById('itemLogin');
  itemLogin.innerHTML = itemLogin.innerHTML
    .replace('Sair', 'Entrar')
    .replace('logout', 'login')
    .replace('Logout', 'Login');
};
