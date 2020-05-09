const gulp = require('gulp');
var data = require('gulp-data');
var fs = require('fs');
const log = require('fancy-log');
const ejs = require('gulp-ejs');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

sass.compiler = require('node-sass');

gulp.task('default', function (cb) {
  console.log('it worked');
  cb();
});
// function defaultTask(cb) {
//     // place code for your default task here
//     console.log("it worked")
//     cb();
//   }

gulp.task('ejs', function () {
  return gulp
    .src('./src/views/*.ejs')
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync('./src/data/projects.json'));
      }),
    )
    .pipe(
      ejs(
        data,
        { name: 'john' },
        {
          msg: 'Hello Gulp!',
        },
      ).on('error', log),
    )
    .pipe(
      rename(function (path) {
        path.extname = '.html';
      }),
    )
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
  return gulp
    .src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      rename(function (path) {
        path.basename = 'styles';
      }),
    )
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
  gulp.watch(
    './src/sass/**/*.scss',
    { ignoreInitial: false },
    gulp.series('sass'),
  );
  gulp.watch(
    ['./src/views/**/*.ejs', './src/data/**/*.json'],
    { ignoreInitial: false },
    gulp.series('ejs'),
  );
});
