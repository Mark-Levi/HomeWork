import { renderLoginComponent } from './login-component.js';
import { addComment, getComments,deleteComment } from './api.js';
import { getListComments, initLikeListener, initCommentListener } from './export_function.js';
import { siteView } from './siteView.js';

const appEl = document.getElementById("app");
let listComments = [];
let token = null;
let user = null;


const updateComments = (firstLoading = false) => {

  if (firstLoading) {
    renderComments(listComments, true);
  }
  // Чтение данных по API и обновление экрана
  getComments(token).then((responseData) => {
    const listComments = responseData.comments.map((comment) => getListComments(comment));
    renderComments(listComments);
  });
};

function postComments(TextAreaElement, InputElement) {

  const name = InputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const text = TextAreaElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");

  addComment(token, name, text).then((responseData) => {
    TextAreaElement.value = "";
    InputElement.value = "";
    updateComments();
  }).catch((error) => {
    if (error.message === 'Сервер не отвечает') {
      console.log('500');
      postComments(TextAreaElement, InputElement);
    }
    const oldInputElement = InputElement.value;
    const oldTextAreaElement = TextAreaElement.value;

    renderComments(listComments);

    InputElement.value = oldInputElement;
    TextAreaElement.value = oldTextAreaElement;
  })
}

const addButtonListener = () => {
  // Завешиваем обработчик кнопки "Написать" (добавление комментария)
  const buttonElement = document.getElementById("add-form-button");
  const InputElement = document.getElementById("add-form-name");
  const TextAreaElement = document.getElementById("add-form-text");
  buttonElement.addEventListener("click", () => {
    if (InputElement.value === "") {
      alert("Не введено имя");
      return;
    }
    if (TextAreaElement.value === "") {
      alert("Пустой комментарий");
      return;
    }
    // Меняем форму ввода на сообщение 'Комментарий добавляется'
    // isLoading = true;
    renderComments(listComments, false, true);
    postComments(TextAreaElement, InputElement);
  });
}
const authorizationButtonListener = () => {
  // Завешиваем обработчик кнопки "Авторизуйтесь" Переход к форме Логин/Регистрация
  const authorizationButtonElement = document.getElementById("autorization-button");
  authorizationButtonElement.addEventListener("click", () => {
    renderLoginComponent({
      appEl,
      setToken: (newToken) => {
        token = newToken;
      },
      updateComments,
      setUser: (newUser) => {
        user = newUser;
      },
    });

  });
}

const deleteButtonListener = (listComments) => {
  // Завешиваем обработчик кнопки "Удалить последний комментарий"
  const deleteButtonElement = document.getElementById("delete-button");
  deleteButtonElement.addEventListener("click", () => {
    if (!confirm("Вы действительно хотите удалить последний комментарий?")) {
      return;
    }
    const id=listComments[listComments.length-1].id;
    deleteComment(token, id).then((responseData) => {
      updateComments();
    }).catch((error) => {
      // if (error.message === 'Сервер не отвечает') {
    })
  });
}
const renderComments = (listComments, firstLoading = false, isLoading = false, isLogin = false, isDelete = false) => {

  const commentsHtml = siteView(listComments, firstLoading, isLoading, token ? true : false, isLogin)

  // const buttonElement = document.getElementById("add-form-button");
  appEl.innerHTML = commentsHtml;
  const a = !(isLoading || firstLoading || isLogin || token === null);
  if (!(isLoading || firstLoading || isLoading || isLogin || token === null)) {

    const InputElement = document.getElementById("add-form-name");
    const TextAreaElement = document.getElementById("add-form-text");
    // console.log(TextAreaElement.value);
    // console.log(TextAreaElement.value.length);

    TextAreaElement.value = "";
    InputElement.value = user;

    addButtonListener();
    initLikeListener(renderComments, listComments);
    initCommentListener(listComments);
    deleteButtonListener(listComments);

  }
  if (!(isLoading || firstLoading || isLoading || isLogin) && token === null) {
    authorizationButtonListener();
  }


};

updateComments(true);