/* Gulpfile.js */
let gulp = require('gulp')
let gutil =  require('gulp-util')
let sass = require('gulp-sass')
let webserver = require('gulp-webserver');
let path = require('path')

/* Styles task */
gulp.task('styles', () => {
  return gulp.src('src/sass/main.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('build/css/'));
})

gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build/'))
})

gulp.task('img', () => {
    return gulp.src('src/**/*.png')
      .pipe(gulp.dest('build/'))
  })

gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', ['styles'],cb => cb)
    gulp.watch('src/**/*.html', ['html'],cb => cb)
})
gulp.task('server', () => {
  gulp.src('build/')
    .pipe(webserver({
      livereload: true,
      open: true
    }))
})

gulp.task('watch-server', ['server','watch'])

gulp.task('build', [
  'html',
  'img',
  'styles'
], cb => cb)