import { loginUser, registerUser } from "./api.js";
import { siteView } from './siteView.js';


export function renderLoginComponent({ appEl, setToken, updateComments,setUser}) {
let isLoginMode = true;
const listComments = [];
const renderForm = () => {

  const appHtml = siteView(listComments, false,false,false,true,isLoginMode);
  appEl.innerHTML = appHtml;

  document.getElementById('login-button').addEventListener('click', () => {
    const login = document.getElementById('login-input').value;
    const password = document.getElementById('password-input').value;
    if (isLoginMode) {
  
      if (!login) {
        alert('Введите логин');
        return;
      }
      if (!password) {
        alert('Введите пароль');
        return;
      }
      loginUser({
        login: login,
        password: password,
      }).then((user) => {
        console.log(user);
        setToken(`Bearer ${user.user.token}`);
        setUser(user.user.name);
        updateComments();
      }).catch(error =>{
        alert(error.message);
      }); 
    } else {
      const name = document.getElementById('name-input').value;
      if (!name) {
        alert('Введите имя');
        return;
      }
      if (!login) {
        alert('Введите логин');
        return;
      }
      if (!password) {
        alert('Введите пароль');
        return;
      }
      registerUser({
        login: login,
        password: password,
        name: name
      }).then((user) => {
        console.log(user);
        setToken(`Bearer ${user.user.token}`);
        setUser(user.user.name);
        updateComments();
      }).catch(error =>{
        alert(error.message);
      });
    }
    
  })

  document.getElementById('toggle-button').addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    renderForm();
  })
};
renderForm();
}