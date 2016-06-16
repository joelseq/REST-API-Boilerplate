'use strict';

const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      babel        = require('gulp-babel'),
      cssnano      = require('gulp-cssnano'),
      sourcemaps   = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer');

gulp.task('workflow', function() {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))

  .pipe(gulp.dest('./public/css'))
});

gulp.task('build', function() {
  gulp.src('src/**/*.js')
    .pipe(babel())
  .pipe(gulp.dest('build'))
});

gulp.task('default', function() {
  gulp.watch('./src/**/*.scss', ['workflow']);
  gulp.watch('./src/**/*.js', ['build']);
});
