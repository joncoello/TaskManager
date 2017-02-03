/// <binding BeforeBuild='vendor' />
// #region requires

const del = require('del');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const order = require('gulp-order');
const sourcemaps = require('gulp-sourcemaps');
const sysBuilder = require('systemjs-builder');
const tslint = require('gulp-tslint');
const tsc = require('gulp-typescript');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const deleteEmpty = require('delete-empty');
const gzip = require('gulp-gzip');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

const tscConfig = require('./tsconfig.json');

// #endregion

// #region deployment

// many deployment script
gulp.task('deployment', function (callback) {
    runSequence(
        'deployment:10:clean',
        'deployment:20:copy:assets',
        'deployment:30:compile:ts',
        'deployment:40:bundle:js',
        'deployment:50:delete-empty-directories',
        'deployment:60:minify:js',
        'deployment:70:compress:js', callback);
});

// empty distribution directory
gulp.task('deployment:10:clean', function () {
    return del('dist/*');
});

// Copy static assets
gulp.task('deployment:20:copy:assets', function () {
    gulp.src(['lib/*.*'])
      .pipe(gulp.dest('dist/lib'))
    gulp.src(['img/*.*'])
      .pipe(gulp.dest('dist/img'))
    gulp.src(['fonts/*.*'])
      .pipe(gulp.dest('dist/fonts'))
    return gulp.src(
      [
        'index.html',
        'web.config',
        'shim.min.js',
        'jquery.min.js',
        'favicon.ico'
      ])
      .pipe(gulp.dest('dist'))
});

// Compile TypeScript to JS
gulp.task('deployment:30:compile:ts', function () {
    return gulp
      .src(["app/**/*.ts", "typings/**/*.d.ts"])
      .pipe(plumber({
          errorHandler: function (err) {
              console.error('>>> [tsc] Typescript compilation failed'.bold.green);
              this.emit('end');
          }
      }))
      .pipe(sourcemaps.init())
      .pipe(tsc(tscConfig.compilerOptions))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/app'));
});

// Generate systemjs-based builds
gulp.task('deployment:40:bundle:js', function () {
    var builder = new sysBuilder('', './systemjs.config.js');
    return builder.buildStatic('app', 'dist/app/main.js')
      .then(function () {
          return del(['dist/app/**/*.js', 'dist/app/**/*.js.map', '!dist/app/main.js']);
      })
      .catch(function (err) {
          console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
      });
});

// delete empty directories
gulp.task('deployment:50:delete-empty-directories', function () {
    deleteEmpty.sync('dist/');
});

// Minify JS bundle
gulp.task('deployment:60:minify:js', function () {
    return gulp
      .src('dist/app/main.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/app'));
});

gulp.task('deployment:70:compress:js', function () {
    return gulp
      .src('dist/app/main.js')
      .pipe(gzip({ append: false }))
      .pipe(gulp.dest('dist/app'));
});

// #endregion

// #region vendor

gulp.task('vendor', function (callback) {
    runSequence(
        'vendor:10:clean',
        'vendor:20:copy',
        ['vendor:30:js:bundle', 'vendor:30:css:bundle'],
        'vendor:40:deletesource',
        'vendor:50:copypollyfill',
        callback);
});

// empty distribution directory
gulp.task('vendor:10:clean', function () {
    return del('lib/*');
});

// Copy vendor files to lib
gulp.task('vendor:20:copy', function () {
    gulp.src(
      [
          'node_modules/bootstrap/dist/fonts/*.*'
      ])
      .pipe(gulp.dest('fonts'))

    return gulp.src(
      [
          'node_modules/zone.js/dist/zone.js',
          'node_modules/reflect-metadata/reflect.js',
          'node_modules/systemjs/dist/system.src.js',
          'systemjs.config.js',
          'node_modules/bootstrap/dist/css/bootstrap.min.css',
          'node_modules/bootstrap/dist/js/bootstrap.min.js',
          'node_modules/chart.js/dist/chart.js',
          'site.css'
      ])
      .pipe(gulp.dest('lib'))
});

// bundle and minify js
gulp.task('vendor:30:js:bundle', function () {
    return gulp.src('lib/*.js')
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('lib'));
});

// bundle and minify css
gulp.task('vendor:30:css:bundle', function () {
    return gulp.src('lib/*.css')
      .pipe(concat('vendor.min.css'))
      .pipe(minify())
      .pipe(gulp.dest('lib'));
});

gulp.task('vendor:40:deletesource', function () {
    del(['lib/*.css', '!lib/vendor.min.css']);
    return del(['lib/*.js', '!lib/vendor.min.js']);
});

// Copy vendor files to lib
gulp.task('vendor:50:copypollyfill', function () {
    return gulp.src(
      [
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/core-js/client/shim.min.js',
          'node_modules/chart.js/dist/chart.js'
      ])
      .pipe(gulp.dest(''))
});

// #endregion