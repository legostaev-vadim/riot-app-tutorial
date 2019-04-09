<app>

  <!--  подключаем компонент Header  -->
  <header data-is="r-header" />

  <!--  подключаем маршрутизатор в тег main  -->
  <main data-is="router">
    <route path="list"><r-list /></route>
    <route path="edit/*"><r-form /></route>
  </main>

  <!--  подключаем компонент Footer  -->
  <footer data-is="r-footer" />

  <!-- добавляем стили -->
  <style type="plain">
    :scope {
      display: flex;
      flex-direction: column;
      font: normal 16px Verdana;
    }
    /* стили для элемента маршрутизатора */
    main {
      margin-bottom: 20px;
      padding: 0 15px;
    }
  </style>

</app>