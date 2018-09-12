const gulp = require('gulp')
const uglify = require('gulp-uglify')
const minifyCss = require('gulp-minify-css')
const minifyHtml = require('gulp-minify-html')
const eslint = require('gulp-eslint')
const concat = require('gulp-concat')
const scss = require('gulp-sass')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

// JS 文件 babel转译 合并 压缩
gulp.task('minify-js', function () {
  gulp.src('src/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

// CSS 文件 合并 压缩
gulp.task('minify-css', function () {
  gulp.src('src/css/*.css')
    .pipe(concat('index.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'))
})

// HTML 文件压缩
gulp.task('minify-html', function () {
  gulp.src('src/index.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('dist'))
})

// JS 文件合并
gulp.task('concat-js', function () {
  gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
})

// CSS 文件合并
gulp.task('concat-css', function () {
  gulp.src('src/css/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css'))
})

// SCSS编译
gulp.task('compile-scss', function () {
  gulp.src('src/css/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('dist/css'))
})

// Eslint 代码检查
gulp.task('eslint', function () {
  gulp.src('src/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
})

// babel ES6 转 ES5
gulp.task('babel', function () {
  gulp.src('src/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'))
})

// 开发环境
gulp.task('dev', function () {
  browserSync.init({
    server: {
      baseDir: './src'
    },
    notify: false
  })
  gulp.watch('src/index.html').on('change', reload)
  gulp.watch('src/css/*.css').on('change', reload)
  gulp.watch('src/js/*.js', ['eslint'])
})

// 生产环境
gulp.task('build', ['minify-js', 'minify-css', 'minify-html'])
