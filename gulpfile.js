const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

// File path

const files = {
  sassPath: 'src/scss/**/*.scss',
  jsPath: 'src/js/**/*.js'
}

// Compile css into scss
function styleTask() {
  return gulp.src(files.sassPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

// Js Task 
function jsTask() {
  return gulp.src([files.jsPath,
    // Import all bootstrap 
    // 'node_modules/jquery/dist/jquery.js',
    //'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
    //'node_modules/popper.js/dist/umd/popper.js'

    // Import just the scrit you need
    'node_modules/jquery/dist/jquery.slim.js',
    'node_modules/bootstrap/js/dist/util.js',
    'node_modules/bootstrap/js/dist/dropdown.js'
  ])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
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
  gulp.watch('src/js/**/*.js', jsTask)
}

exports.style = styleTask;
exports.jsTask = jsTask;
exports.watch = watch;