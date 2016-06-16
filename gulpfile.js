'use strict';

const gulp         = require('gulp'),
      del          = require('del'),
      sass         = require('gulp-sass'),
      babel        = require('gulp-babel'),
      watch        = require('gulp-watch'),
      batch        = require('gulp-batch'),
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
gulp.task('build', ['clean'], function() {
  gulp.src('./src/**/*.js')
    .pipe(babel())
  .pipe(gulp.dest('./build'))
});


//===========================
// Clean Build directory
//===========================
gulp.task('clean', function() {
  del(['./build']);
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
gulp.task('watch', function () {
    watch('./src/**/*.js', batch(function (events, done) {
        gulp.start('build', done);
    }));
    watch('./src/sass/**/*.scss', batch(function (events, done) {
        gulp.start('workflow', done);
    }));
});

gulp.task('default', ['workflow', 'build', 'watch', 'nodemon']);
