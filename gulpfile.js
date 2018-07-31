/* Gulpfile.js */
let gulp = require('gulp')
let gutil =  require('gulp-util')
let sass = require('gulp-sass')
let webserver = require('gulp-webserver');
let gulpStylelint = require('gulp-stylelint');
let path = require('path');
var pump = require('pump');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');


/* Styles task */
gulp.task('styles',['lint-css','webfonts'], () => {
  return gulp.src('src/sass/main.scss')
    .pipe(sass({
      includePaths: [
        path.join(__dirname, '/node_modules/bootstrap/scss'),
        path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/scss')
      ],
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('build/css/'));
})

gulp.task('webfonts', () => {
  return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
  .pipe(gulp.dest('build/webfonts'));
})

gulp.task('html', () => {
  return gulp.src('src/**/*.{html,ico}')
    .pipe(gulp.dest('build/'))
})

gulp.task('js', (cb) => {
    return gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))

})

gulp.task('img', () => {
    return gulp.src('src/**/*.{gif,jpg,png,svg}')
      .pipe(gulp.dest('build/'))
  })

gulp.task('watch', () => {
    gulp.watch('src/sass/**/*.scss', ['styles'],cb => cb)
    gulp.watch('src/**/*.html', ['html'],cb => cb)
    gulp.watch('src/js/**/*.js', ['js'],cb => cb)

})
gulp.task('server', () => {
  gulp.src('build/')
    .pipe(webserver({
      livereload: true,
      open: true
    }))
})

gulp.task('mock-api', () => {
  return gulp.src('src/api/**/*.*')
    .pipe(gulp.dest('build/api'))
})

gulp.task('lint-js',['js'],() => {
  return gulp.src('src/js/**/*.js')
      .pipe(eslint({
        rules: {
          "comma-dangle": 2,
          "semi": ["error", "always"],
          "quotes": ["error", "single"]
        }
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});


gulp.task('lint-css', () => {

    gulp.src('src/sass/**/*.scss')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

gulp.task('build', [
  'html',
  'lint-js',
  'img',
  'styles',
  'mock-api'
], cb => cb);

gulp.task('watch-server', ['build','server','watch']);