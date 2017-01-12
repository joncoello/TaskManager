// #region requires

const del = require('del');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');
const sysBuilder = require('systemjs-builder');
const tslint = require('gulp-tslint');
const tsc = require('gulp-typescript');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const deleteEmpty = require('delete-empty');
const gzip = require('gulp-gzip');
const tscConfig = require('./tsconfig.json');
const concat = require('gulp-concat');

// #endregion

// #region deployment

// many deployment script
gulp.task('default', function (callback) {
    runSequence('clean:full', 'copy:assets', 'compile:ts', 'bundle:js', 'minify:js',
        'delete-empty-directories', 'copy:libs', callback);
});

// empty distribution directory
gulp.task('clean:full', function () {
    return del('dist/*');
});

// Copy static assets
gulp.task('copy:assets', function () {
    return gulp.src(
      [
        'index.html'
      ])
      .pipe(gulp.dest('dist'))
});

// Compile TypeScript to JS
gulp.task('compile:ts', function () {
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
gulp.task('bundle:js', function () {
    var builder = new sysBuilder('', './systemjs.config.js');
    return builder.buildStatic('app', 'dist/app/main.js')
      .then(function () {
          return del(['dist/**/*.js', 'dist/**/*.js.map', '!dist/app/main.js']);
      })
      .catch(function (err) {
          console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
      });
});

// Minify JS bundle
gulp.task('minify:js', function () {
    return gulp
      .src('dist/app/main.js')
      .pipe(uglify())
      //.pipe(gzip())
      .pipe(gulp.dest('dist/app'));
});

// delete empty directories
gulp.task('delete-empty-directories', function () {
    deleteEmpty.sync('dist/');
});

// Copy dependencies
gulp.task('copy:libs', function () {

    gulp.src([
      'node_modules/zone.js/dist/zone.js'
    ]).pipe(gulp.dest('dist/node_modules/zone.js/dist/'));

    gulp.src([
      'node_modules/reflect-metadata/reflect.js'
    ]).pipe(gulp.dest('dist/node_modules/reflect-metadata/'));

    gulp.src([
      'node_modules/systemjs/dist/system.src.js'
    ]).pipe(gulp.dest('dist/node_modules/systemjs/dist/'));

    gulp.src(['systemjs.config.js'
    ]).pipe(gulp.dest('dist/'));

    return gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.css'
    ]).pipe(gulp.dest('dist/node_modules/bootstrap/dist/css/'));

});

// #endregion

gulp.task('vendor', function (callback) {
    runSequence('vendor:clean', 'vendor:copy', callback);
});

// empty distribution directory
gulp.task('vendor:clean', function () {
    return del('lib/*');
});

// Copy static assets
gulp.task('vendor:copy', function () {
    return gulp.src(
      [
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'systemjs.config.js',
        'node_modules/bootstrap/dist/css/bootstrap.css'
      ])
      .pipe(gulp.dest('lib'))
});

gulp.task('vendor:bundle', function () {
    gulp.src('lib/*.js')
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('lib'));

    return del(['lib/*.js', '!lib/vendor.min.js']);
});