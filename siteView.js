import { format } from "date-fns";

export function siteView(listComments, firstLoading=false, isLoading=false, autorized=false, login=false,isLoginMode=false) {
  const d_hide = "none";
  const d_show = '';
  let commentsHtml = '';
  if (firstLoading) {
    //Начальная загрузка комментариев
    commentsHtml = `
  <div>Пожалуйста подождите. Комментарии загружаются</div>`;
    return commentsHtml;
  }

  if (login) {
    //Форма авторизации и регистрации
    commentsHtml = `
  <div class=" login-form" >
    <h3 >Форма ${isLoginMode ? 'входа' : 'регистрации'}</h3>
    ${isLoginMode ? '' : `<input type="text" id="name-input" class="add-form-input" placeholder="Введите ваше имя" />`}
    <input type="text" id="login-input" class="add-form-input" placeholder="Введите ваш логин" />
    <input type="password" id="password-input" class="add-form-input" placeholder="Введите пароль" />
    <button class="add-form-button" id="login-button">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
    <button class="link" id="toggle-button">${!isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
  </div>`;
    return commentsHtml;
  }

  //Загрузка списка комментариев
  commentsHtml = `
  <ul class="comments" id="comments" >` +
    listComments.map((comment, id) => {
      return ` <li class="comment" data-id="${id}">
              <div class="comment-header">
                  <div>${comment.name}</div>
                  <div>${format((new Date(comment.date)),"yyyy-MM-dd hh:mm:ss")}</div>
              </div>
              <div class="comment-body">
                  <div class="comment-text" style="white-space: pre-line">
                  ${comment.text.replaceAll("BEGIN_QUOTE", "<div class='quote'>").replaceAll("END_QUOTE", "</div>")}
                  </div>
              </div>
              <div class="comment-footer">
                  <div class="likes">
                  <span class="likes-counter">${comment.likes}</span>
                  <button data-id="${id}" data-likes="Yes" class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
                  </div>
              </div>
              </li>`;
    }).join("") +
    `</ul>`;
    if (!autorized) {
      // Если пользователь не авторизован
      commentsHtml += `
      <div class="link3">Чтобы добавить комментарий,<button class="link2" id="autorization-button">авторизуйтесь</button></div>`
    } else if(isLoading ){
      // Если идет запись нового комментария 
      commentsHtml +=`
      <div> Комментарий добавляется</div>` 
    } else {
//Форма нового комментария для автороизованного пользователя
      commentsHtml +=`
        <div class=" add-form" >
          <input type="text" id="add-form-name" class="add-form-name" readonly/>
          <textarea type="textarea" id="add-form-text" class="add-form-text" placeholder="Введите ваш коментарий" rows="4">
          </textarea>
          <div class="add-form-row">
              <button class="add-form-button" id="add-form-button">Написать</button>
          </div>
        </div>
        <div class="add-form-row">
          <button class="add-form-button" id="delete-button">Удалить последний комментарий</button>
        </div>`
    };
  return commentsHtml;
}