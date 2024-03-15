import gulp from 'gulp'
import pug from 'gulp-pug'
import dartSass from 'sass'
import babel from 'gulp-babel'
import gulpSass from 'gulp-sass'
import cssmin from 'gulp-cssmin'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import tinypng from 'gulp-tinypng'
import browserSync from 'browser-sync'
import sourcemaps from 'gulp-sourcemaps'
import bemValidator from 'gulp-html-bem-validator';

const sass = gulpSass(dartSass)

function pugTask() {
  return gulp.src('./src/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(bemValidator())
    .pipe(gulp.dest('./dist/'))
}

function scssTask() {
  return gulp.src([
  './assets/scss/*.scss',
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('app.min.css'))
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist/css/'))
}

function mincssTask() {
  return gulp.src([
    './assets/scss/*.scss',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'))
}

function jsTask() {
  return gulp.src([
    './assets/js/*.js',
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('app.min.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist/js/'))
}

function minjsTask() {
  return gulp.src([
    './assets/js/*.js',
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('app.min.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist/js/'))
}

function tinypngTask() {
  return gulp.src('./dist/img/**/*.{png,jpg,jpeg}')
  .pipe(tinypng('EJEFC_KcQukE79WvXKi9utNDDodA1Kxj'))
  .pipe(gulp.dest('./dist/img/'))
}

function serveTask(cb) {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  })
  cb()
}

function serveReload(cb) {
  browserSync.reload()
  cb()
}

function watchTask() {
  gulp.watch(['./assets/scss/*.scss', './assets/js/*.js'], gulp.series(scssTask, jsTask, serveReload))
}

exports.default = gulp.series(gulp.parallel(scssTask, jsTask, watchTask))

exports.build = gulp.series(gulp.parallel(mincssTask, minjsTask))

exports.tinypng = gulp.series(tinypngTask)
