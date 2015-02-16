/**
 * Gulp tasks
 *
 */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Compile CSS
gulp.task('sass', function() {
  return gulp.src('src/sass/app.scss')
    .pipe(sass({
      style: 'expanded',
      sourceComments: 'normal'
    }))
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
});

// Optimize Images
gulp.task('images', function () {
  return gulp.src('src/img/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/img'))
    .pipe(connect.reload())
});

// JS Tasks
gulp.task('js', function() {
  return gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Compile Jade Templates
gulp.task('jade', function(){
  return gulp.src('src/templates/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
});

// Copy Assets
gulp.task('copy', function() {
  return gulp.src([
    'src/fonts/**/*',
    'src/*'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'))
});

// Watch tasks
gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/img/**/*', ['images']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/*', ['copy']);
  gulp.watch('src/templates/**/*.jade', ['jade']);
});

// Serve and reload
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('default', ['images', 'js', 'sass', 'jade', 'watch', 'connect']);