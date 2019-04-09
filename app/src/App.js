// подключаем Riot.js
import riot from 'riot'

// подключаем Маршрутизатор
import route from '../node_modules/riot-route/dist/amd.route+tag.min'

// подключаем модель данных User
import User from './models/User'

// подключаем компонент UserList
import './views/UserList.tag'

// подключаем компонент App
import './views/App.tag'

// подключаем компонент Menu
import './views/Menu.tag'

// подключаем компонент Header
import './views/Header.tag'

// подключаем компонент Footer
import './views/Footer.tag'

// подключаем компонент UserForm
import './views/UserForm.tag'

// подключаем внешние стили
import './sass/styles.scss'

// создаём общую примесь user и передаём в конструктор модели данных User
// ссылку на библиотеку Riot.js, в виде аргумента riot
// вторым свойством в объекте примесей создаём ещё одну примесь,
// которая называется route и ссылается на подключенный выше маршрутизатор
riot.mixin({ user: new User(riot), route: route })

// монтируем компонент App
riot.mount('app')

// задаём hashbang в качестве базовой части url
route.base('#!/')

// задаём маршрут list в качестве маршрута по умолчанию
// с которого начинается открытие приложения
route('list')