const gulp = require('gulp');
const data = require('gulp-data');
const fs = require('fs');
const log = require('fancy-log');
const ejs = require('gulp-ejs');
var cssnano = require('gulp-cssnano');
let uglify = require('gulp-uglify-es').default;
var pipeline = require('readable-stream').pipeline;
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));

gulp.task('default', function (cb) {
  console.log('it worked');
  cb();
});

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
    .pipe(cssnano())
    .pipe(
      rename(function (path) {
        path.basename = 'styles';
      }),
    )
    .pipe(gulp.dest('./css'));
});

gulp.task("uglifyjs", function () {
  return gulp.src("script.js")
    .pipe(rename("script.js"))
    .pipe(uglify(/* options */))
    .pipe(gulp.dest("dist/"));
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
