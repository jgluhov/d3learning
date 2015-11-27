var gulp = require('gulp');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var koutoSwiss = require('kouto-swiss');
var minify = require('gulp-minify-css');

gulp.task('vendor:js', function () {
  gulp.src([
    './bower_components/angular/angular.min.js',
    './bower_components/angular-ui-router/release/angular-ui-router.min.js',
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/uikit/js/uikit.min.js',
    './bower_components/d3/d3.min.js',
    './src/js/d3.layout.cloud.js'
  ])
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('./www/js'))
});

gulp.task('d3-cloud', function() {
  gulp.src('./bower_components/d3-cloud/build/d3.layout.cloud.js')
    .pipe(gulp.dest('./src/js'))
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
  gulp.src('./src/js/d3learningApp.js')
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
  gulp.src('./src/styl/app.styl')
    .pipe(plumber())
    .pipe(stylus({use: koutoSwiss(), import: 'kouto-swiss'}))
    .pipe(gulp.dest('./www/css'))
    .pipe(sourcemaps.init())
    .pipe(minify())
    .pipe(rename('app.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./www/css'))
});

gulp.task('vendor:fonts', function() {
  gulp.src([
      './bower_components/uikit/fonts/*',
      './src/fonts/**/*'
    ])
    .pipe(gulp.dest('./www/fonts'))
});

gulp.task('serve', ['templates', 'scripts', 'styles','vendor:js', 'vendor:css', 'vendor:fonts'], function () {
  browserSync.init({
    server: {
      baseDir: "./www"
    }
  });
  gulp.watch(["src/js/**/*.js","!./src/js/d3.layout.cloud.js"], ['scripts']);
  gulp.watch("./src/js/d3.layout.cloud.js", ['vendor:js']);
  gulp.watch("src/jade/**/*.jade", ['templates']);
  gulp.watch('./src/styl/**/*.styl', ['styles']);
});

gulp.task('default', ['serve']);
