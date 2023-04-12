const hostComments = "https://webdev-hw-api.vercel.app/api/v2/olya-jacobs/comments";
const hostLogin = "https://webdev-hw-api.vercel.app/api/user/login";
const hostRegisterUser = "https://webdev-hw-api.vercel.app/api/user";

export function addComment(token,name, text) {
  return fetch(hostComments, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      name: name,
      date: new Date(),
      text: text,
      likes: 0,
      isLiked: false,
      forceError: true
    })
  }).then((response) => {
    if (response.status === 200) {
      console.log('200');
      return response.json();
    }
    else if (response.status === 400) {
      alert('Короткое имя или комментарий');
      throw new Error('Короткое имя или комментарий');
    }
    else if (response.status === 500) {
      // alert('Сервер не отвечает');
      console.log('Сервер не отвечает');
      throw new Error('Сервер не отвечает');
    }
  })
}

export function getComments(token) {
  return fetch(hostComments, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 401) {
      alert('Ошибка при авторизации');
      throw new Error('Нет авторизации');
    }
    return response.json();
  })
}

export function deleteComment(token,id) {
  return fetch(hostComments+"/"+id, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 200) {
      // Успешное удаление записи
      return response.json();
    } else if (response.status === 401) {
      alert('Ошибка при авторизации');
      throw new Error('Нет авторизации');
    } else {
      alert(`Ошибка при удалении ID: ${id}`);
      throw new Error('Прочие ошибки удаления');
    }
  })
}
export function loginUser({ login, password, }) {
  return fetch(hostLogin, {
    method: "POST",
    body: JSON.stringify({
      login,
      password
    }),
    
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error('Неверный логин или пароль');
      }
      return response.json();
    })
}

export function registerUser({ login, password,name }) {
  const a=JSON.stringify({
    login,
    password,
    name});
  return fetch(hostRegisterUser, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name
    }),
    
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error('Такой пользователь уже существует');
      }
      return response.json();
    })
}