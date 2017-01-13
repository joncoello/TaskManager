/// <binding BeforeBuild='vendor' />
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
const concat = require('gulp-concat');
const minify = require('gulp-minify');

const tscConfig = require('./tsconfig.json');

// #endregion

// #region deployment

// many deployment script
gulp.task('default', function (callback) {
    runSequence('clean:full', 'copy:assets', 'compile:ts', 'bundle:js', 'minify:js',
        'delete-empty-directories', callback);
});

// empty distribution directory
gulp.task('clean:full', function () {
    return del('dist/*');
});

// Copy static assets
gulp.task('copy:assets', function () {
    gulp.src(['lib/*.*'])
      .pipe(gulp.dest('dist/lib'))
    return gulp.src(
      [
        'index.html',
        'web.config'
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
          return del(['dist/app/**/*.js', 'dist/app/**/*.js.map', '!dist/app/main.js']);
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
      .pipe(gzip({ append: false }))
      .pipe(gulp.dest('dist/app'));
});

// delete empty directories
gulp.task('delete-empty-directories', function () {
    deleteEmpty.sync('dist/');
});

// #endregion

// #region vendor

gulp.task('vendor', function (callback) {
    runSequence('vendor:clean', 'vendor:copy', 'vendor:js:bundle', 'vendor:css:bundle', 'vendor:deletesource', callback);
});

// empty distribution directory
gulp.task('vendor:clean', function () {
    return del('lib/*');
});

// Copy vendor files to lib
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

// bundle and minify js
gulp.task('vendor:js:bundle', function () {
    return gulp.src('lib/*.js')
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('lib'));
});

// bundle and minify css
gulp.task('vendor:css:bundle', function () {
    return gulp.src('lib/*.css')
      .pipe(concat('vendor.min.css'))
      .pipe(minify())
      .pipe(gulp.dest('lib'));
});

gulp.task('vendor:deletesource', function () {
    del(['lib/*.css', '!lib/vendor.min.css']);
    return del(['lib/*.js', '!lib/vendor.min.js']);
});

// #endregion