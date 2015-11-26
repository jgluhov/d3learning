var gulp = require('gulp');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var koutoSwiss = require('kouto-swiss');
var stylus = require('gulp-stylus');

gulp.task('vendor:js', function () {
  gulp.src([
    './bower_components/angular/angular.min.js',
    './bower_components/angular-ui-router/release/angular-ui-router.min.js',
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/uikit/js/uikit.min.js',
    './bower_components/d3/d3.min.js',
    './bower_components/d3-cloud/build/d3.layout.cloud.js'
  ])
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('./www/js'))
});

gulp.task('vendor:css', function () {
  gulp.src([
    './bower_components/uikit/css/uikit.gradient.min.css'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/css'));
});

gulp.task('templates', function () {
  gulp.src('./src/jade/**/*.jade')
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./www'))
    .pipe(browserSync.stream())
});

gulp.task('scripts', function () {
  gulp.src('./src/js/*.js')
    .pipe(plumber())
    .pipe(browserify({insertGlobals: true}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./www/js'))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./www/js'))
    .pipe(browserSync.stream())
});

gulp.task('styles', function () {
  gulp.src('./src/stylus/app.styl')
    .pipe(plumber())
    .pipe(stylus({use: koutoSwiss(), import: 'kouto-swiss'}))
    .pipe(gulp.dest('./www/css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['templates', 'scripts', 'styles','vendor:js', 'vendor:css'], function () {
  browserSync.init({
    server: {
      baseDir: "./www"
    }
  });
  gulp.watch("src/js/**/*.js", ['scripts']);
  gulp.watch("src/jade/**/*.jade", ['templates']);
  gulp.watch("src/stylus/**/*.styl", ['styles']);
});

gulp.task('default', ['serve']);
