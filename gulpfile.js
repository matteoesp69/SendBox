const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// File path

const files = {
  sassPath: 'app/scss/**/*.scss',
  jsPath: 'app/js/**/!(custom)*.js'
}

// Compile css into scss
function styleTask() {
  return gulp.src(files.sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
}

// Js Task 
function jsTask() {
  return gulp.src([files.jsPath,
    // Import all bootstrap 
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
    'node_modules/popper.js/dist/umd/popper.js',
    'app/js/custom.js'
  ])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(browserSync.stream());
}

// Watch files
function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    }
  });

  gulp.watch('app/scss/**/*.scss', styleTask)
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('app/js/**/*.js', jsTask)
}

exports.styleTask = styleTask;
exports.jsTask = jsTask;
exports.watch = watch;