const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// File path

const files = {
  sassPath: 'src/scss/**/*.scss',
  jsPath: './src/js/**/*.js'
}

// Compile css into scss
function styleTask() {
  return gulp.src(files.sassPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

// Watch files
function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    }
  });

  gulp.watch('src/scss/**/*.scss', styleTask)
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = styleTask;
exports.watch = watch;