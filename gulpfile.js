
const gulp = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

// function defaultTask(cb) {
//     // place code for your default task here
//     console.log("it worked")
//     cb();
//   }

  gulp.task('default', function (cb) {
      console.log("it worked")
      cb();
  })

//   gulp.task('message', function() {
//       return console.log('Gulp is running')
//   });

  gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'));
  });
   
//   gulp.task('sass:watch', function () {
//     gulp.watch('./sass/**/*.scss', ['sass']);
//   });

gulp.task('watch', function() {
    gulp.watch('./sass/**/*.scss', gulp.series('sass'));
    // gulp.watch('app/js/*.js', gulp.series('scripts'));
    // gulp.watch('app/img/*', gulp.series('images'));
  });
  
//   exports.watch = watch;
//   exports.sass = sass
//   exports.default = defaultTask