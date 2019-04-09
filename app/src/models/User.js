export default class User {

  constructor(riot) {
    this.list = []
    this.current = {}
    // делаем объект модели данных наблюдаемым
    riot.observable(this)
  }

  // получаем список пользователей с сервера
  getUsers() {
    fetch('https://rem-rest-api.herokuapp.com/api/users?limit=100', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(result => {
        // присваиваем результат ответа сервера свойству list модели данных
        this.list = result.data
        // запускаем событие updated, после успешного получения данных от сервера
        this.trigger('updated')
      })
  }

  // создание нового пользователя
  createUser() {
    fetch('https://rem-rest-api.herokuapp.com/api/users/', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.current)
    })
    .then(response => this.trigger('home'))
  }

  // удаление текущего пользователя
  deleteUser() {
    fetch('https://rem-rest-api.herokuapp.com/api/users/' + this.current.id, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(response => this.trigger('home'))
  }

  // обновление текущего пользователя
  updateUser() {
    fetch('https://rem-rest-api.herokuapp.com/api/users/' + this.current.id, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(this.current)
    })
    .then(response => this.trigger('home'))
  }

  // получение конкретного пользователя
  getUser(id) {
    fetch('https://rem-rest-api.herokuapp.com/api/users/' + id, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(result => {
        this.current = result
        this.trigger('updated')
      })
  }
  
}