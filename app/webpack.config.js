const path = require('path')

// подключаем плагин для копирования файлов
const CopyPlugin = require('copy-webpack-plugin')

// подключаем модули для обработки css в компонентах
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')

// подключаем плагин для извлечения css в отдельный файл
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// экспортируем функцию с двумя параметрами
module.exports = (env, options) => {

  // функция возвращает объект конфигурации Webpack
  return {
    entry: './src/App.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'build.js',
      publicPath: 'dist/'
    },
    module: {
      rules: [
        // добавляем новое правило для файлов компонентов (.tag)
        {
          test: /\.tag$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            },
            {
              loader: 'riot-tag-new-loader',
              // объект параметров riot-tag-new-loader
              options: {
                parsers: {
                  // создаём пользовательский парсер css и передаём ему модули
                  // для добавления префиксов к стилям наших компонентов
                  css: {
                    plain: function(tag, css) {
                      return postcss([ autoprefixer({ browsers: ['last 15 versions'] }) ]).process(css).css
                    }
                  }
                }
              }
            }
          ]
        },
        // добавляем новое правило для файлов JavaScript
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        // добавляем новое правило для внешних стилей (.scss)
        {
          test: /\.scss$/,
          use: [
            // для продакшена используется плагин MiniCssExtractPlugin,
            // а для разработки будет применяться загрузчик style-loader
            options.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      // регистрируем плагин copy-webpack-plugin и задаём ему необходимые параметры
      new CopyPlugin([
        {
          from: 'src/assets/**/*.{png,jpg}',
          to: 'img',
          flatten: true
        }
      ]),
      // регистрируем плагин mini-css-extract-plugin и задаём ему необходимые параметры
      new MiniCssExtractPlugin({
        filename: 'build.css'
      })
    ]
  }

}