'use strict';

const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      babel        = require('gulp-babel'),
      cssnano      = require('gulp-cssnano'),
      nodemon      = require('gulp-nodemon'),
      sourcemaps   = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer');

//======================
// Compiling SCSS to CSS
//======================
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


//===========================
// Transpiling ES6 to ES5
//===========================
gulp.task('build', function() {
  gulp.src('src/**/*.js')
    .pipe(babel())
  .pipe(gulp.dest('build'))
});


//===========================
// Run Nodemon
//===========================
gulp.task('nodemon', function() {
  return nodemon({
    script: 'bin/www',
    ignore: ['public']
  });
});

//======================================
// Watch files and call appropriate task
//======================================
gulp.task('watch', function() {
  gulp.watch('./src/**/*.scss', ['workflow']);
  gulp.watch('./src/**/*.js', ['build']);
});

gulp.task('default', ['workflow', 'build', 'watch', 'nodemon']);
