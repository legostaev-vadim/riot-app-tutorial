const gulp = require('gulp')
const concat = require('gulp-concat')
const markdown = require('gulp-markdown')
const del = require('del')

function html() {
  return gulp.src('md/**/*.md')
    .pipe(concat('tutorial.md'))
    .pipe(markdown())
    .pipe(gulp.dest('dist'))
}

function md() {
  return gulp.src('md/**/*.md')
    .pipe(concat('tutorial.md'))
    .pipe(gulp.dest('dist'))
}

function clean() {
  return del('dist')
}

gulp.task('default', gulp.series(clean, html, md))
