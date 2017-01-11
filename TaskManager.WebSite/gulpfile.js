
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

// #endregion

gulp.task('default', function (callback) {
    runSequence('clean:full', 'copy:assets', 'compile:ts', 'bundle:js', 'minify:js',
        'delete-empty-directories', 'copy:libs', callback);
});

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

    gulp.src(['node_modules/rxjs/**/*'])
      .pipe(gulp.dest('dist/node_modules/rxjs'));

    gulp.src(['systemjs.config.js'
    ]).pipe(gulp.dest('dist/'));

    // copy vendor
    gulp.src([
      'node_modules/jquery/**/*'
    ]).pipe(gulp.dest('dist/node_modules/jquery'));

    gulp.src([
      'node_modules/es6-shim/**/*'
    ]).pipe(gulp.dest('dist/node_modules/es6-shim'));

    gulp.src([
      'node_modules/es6-promise/**/*'
    ]).pipe(gulp.dest('dist/node_modules/es6-promise'));

    gulp.src([
      'node_modules/zone.js/**/*'
    ]).pipe(gulp.dest('dist/node_modules/zone.js'));

    // copy source maps
    gulp.src([
      'node_modules/es6-shim/**/*'
    ]).pipe(gulp.dest('dist/node_modules/es6-shim'));

    gulp.src([
      'node_modules/reflect-metadata/**/*'
    ]).pipe(gulp.dest('dist/node_modules/reflect-metadata'));

    gulp.src([
      'node_modules/systemjs/**/*'
    ]).pipe(gulp.dest('dist/node_modules/systemjs'));

    // bootstrap
    gulp.src([
      'node_modules/bootstrap/**/*'
    ]).pipe(gulp.dest('dist/node_modules/bootstrap'));

    // ng
    return gulp.src(['node_modules/@angular/**/*'])
      .pipe(gulp.dest('dist/node_modules/@angular'));
});

