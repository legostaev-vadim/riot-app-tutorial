<r-list>

  <div class="list">

    <!-- добавляем ссылки на пользователей -->
    <a href="#!/edit/{ id }" class="list__item" each={ list } key={ id }>{ firstName } { lastName }</a>

  </div>

  <!--  добавляем стили  -->
  <style type="plain">
    .list {
      list-style: none;
      margin: 0 0 10px;
      padding: 0;
    }
    .list__item {
      background: #fafafa;
      border: 1px solid #ddd;
      color: #333;
      display: block;
      margin: 0 0 1px;
      padding: 8px 15px;
      text-decoration: none;
    }
    .list__item:hover {
      text-decoration: underline;
    }
  </style>

  <!--  добавляем логику  -->
  <script>
  
    // запускаем метод getUsers, нашей модели данных
    this.user.getUsers()

    // запускаем событие обновления компонента (this.update)
    // при получении события updated от модели данных
    this.user.one('updated', this.update)

    // присваиваем свойству list нашего компонента значение
    // полученное моделью данных при запуске её метода getUsers()
    this.on('update', () => this.list = this.user.list)

  </script>

</r-list>